const express = require('express')
const cors = require('cors')
const axios = require('axios')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const nodemailer = require('nodemailer')
const twilio = require('twilio')
const { initDb, query } = require('./db')

const app = express()
const PORT = process.env.PORT || 4000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'
const USE_MOCK_OTP = process.env.MOCK_OTP === 'true'

app.use(cors({ origin: FRONTEND_URL }))
app.use(express.json())

// ── KoraPay base config ────────────────────────────────────────────────────
const KORAPAY_SECRET = process.env.KORAPAY_SECRET_KEY || 'sk_test_your_key_here'
const KORAPAY_URL = 'https://api.korapay.com/merchant/api/v1'

const korapay = axios.create({
  baseURL: KORAPAY_URL,
  headers: {
    Authorization: `Bearer ${KORAPAY_SECRET}`,
    'Content-Type': 'application/json',
  },
})

// ── OTP store (in-memory demo) ─────────────────────────────────────────────
const otpStore = new Map()

const SALT_ROUNDS = 10

const findUserByEmail = async (email) => {
  const result = await query('SELECT id, email, phone, first_name, last_name FROM users WHERE email = $1', [email])
  return result.rows[0]
}

const createUser = async ({ email, phone, firstName, lastName, password }) => {
  const passwordHash = password ? await bcrypt.hash(password, SALT_ROUNDS) : null
  const result = await query(
    `INSERT INTO users (email, phone, first_name, last_name, password_hash)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, email, phone, first_name, last_name, created_at`,
    [email, phone, firstName, lastName, passwordHash]
  )
  return result.rows[0]
}

const getOrCreateUser = async ({ email, phone, firstName, lastName }) => {
  if (!email && !phone) return null
  if (email) {
    const existing = await findUserByEmail(email)
    if (existing) return existing
  }
  return createUser({ email, phone, firstName, lastName })
}

initDb().catch((err) => {
  console.error('❌ Postgres initialization failed:', err.message)
})

// Email transporter (if SMTP config provided)
let mailer = null
if (USE_MOCK_OTP) {
  console.log('ℹ️ MOCK OTP enabled — email OTP will be mocked')
} else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  mailer = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
  console.log('✅ SMTP mailer configured')
} else {
  console.log('ℹ️ SMTP not configured — email OTP will be mocked (set SMTP_HOST/SMTP_USER/SMTP_PASS or MOCK_OTP=true)')
}

// Twilio client (if configured)
let twilioClient = null
if (USE_MOCK_OTP) {
  console.log('ℹ️ MOCK OTP enabled — SMS OTP will be mocked')
} else if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  console.log('✅ Twilio configured for SMS')
} else {
  console.log('ℹ️ Twilio not configured — SMS OTP will be mocked (set TWILIO_ACCOUNT_SID/TWILIO_AUTH_TOKEN or MOCK_OTP=true)')
}

// ── Health check ───────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Agora API', timestamp: new Date() })
})

// ── User registration / login ──────────────────────────────────────────────
app.post('/api/register', async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' })
  }

  try {
    const existing = await findUserByEmail(email)
    if (existing) {
      return res.status(409).json({ success: false, message: 'User already exists' })
    }

    const user = await createUser({ email, password, firstName, lastName, phone })
    res.json({ success: true, user })
  } catch (err) {
    console.error('Register error:', err.message)
    res.status(500).json({ success: false, message: 'Unable to register user' })
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' })
  }

  try {
    const user = await query('SELECT id, email, phone, first_name, last_name, password_hash FROM users WHERE email = $1', [email])
    if (!user.rowCount) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const dbUser = user.rows[0]
    const valid = await bcrypt.compare(password, dbUser.password_hash || '')
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    res.json({
      success: true,
      user: {
        id: dbUser.id,
        email: dbUser.email,
        phone: dbUser.phone,
        firstName: dbUser.first_name,
        lastName: dbUser.last_name,
      },
    })
  } catch (err) {
    console.error('Login error:', err.message)
    res.status(500).json({ success: false, message: 'Unable to login' })
  }
})

// ── BVN Verification (via KoraPay identity) ────────────────────────────────
app.post('/api/verify-bvn', async (req, res) => {
  const { bvn, firstName, lastName, dob } = req.body
  if (!bvn || bvn.length !== 11) {
    return res.status(400).json({ success: false, message: 'BVN must be 11 digits' })
  }
  try {
    // KoraPay BVN verification endpoint
    const response = await korapay.post('/identity/bvn', { bvn, firstName, lastName, dob })
    res.json({ success: true, data: response.data })
  } catch (err) {
    // In demo mode, simulate a successful verification
    console.warn('KoraPay BVN call failed, using mock:', err.message)
    res.json({
      success: true,
      mock: true,
      data: {
        verified: true,
        firstName,
        lastName,
        bvn: bvn.replace(/\d(?=\d{4})/g, '•'),
        message: 'BVN verified successfully (demo mode)',
      },
    })
  }
})

// ── Create trader onboarding & generate payment link ──────────────────────
app.post('/api/onboard', async (req, res) => {
  const { firstName, lastName, phone, email, bvn, market, tradeType } = req.body
  if (!firstName || !phone || !bvn) {
    return res.status(400).json({ success: false, message: 'First name, phone, and BVN are required' })
  }

  const businessId = `AG-LG-${Math.floor(10000 + Math.random() * 90000)}`
  const slug = `${firstName}-${lastName}`.toLowerCase().replace(/[^a-z-]/g, '')

  try {
    const user = await getOrCreateUser({ email, phone, firstName, lastName })
    const bvnHash = bvn ? await bcrypt.hash(bvn, SALT_ROUNDS) : null

    // Create a KoraPay payment link for the trader
    const linkRes = await korapay.post('/transactions/initialize/link', {
      amount: null, // open amount — customer enters
      currency: 'NGN',
      description: `Pay ${firstName} ${lastName} · Agora trader`,
      reference: `ag_${businessId.toLowerCase().replace(/-/g, '_')}`,
      merchant_bears_cost: false,
      notification_url: `${process.env.WEBHOOK_URL || 'https://webhook.site/agora'}/webhook/payment`,
    })

    const paymentLink = linkRes.data?.data?.link || `https://pay.korapay.com/agora/${slug}`

    await query(
      `INSERT INTO traders (user_id, business_id, first_name, last_name, phone, email, bvn_hash, market, trade_type, payment_link, credit_score)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [user?.id || null, businessId, firstName, lastName, phone, email, bvnHash, market, tradeType, paymentLink, 500]
    )

    res.json({
      success: true,
      trader: { businessId, firstName, lastName, phone, email, market, tradeType, paymentLink, creditScore: 500 },
    })
  } catch (err) {
    console.warn('Onboard failed, using mock fallback:', err.message)

    const paymentLink = `https://pay.korapay.com/agora/${slug}`
    res.json({
      success: true,
      mock: true,
      trader: {
        businessId,
        firstName,
        lastName,
        phone,
        email,
        market,
        tradeType,
        paymentLink,
        creditScore: 500,
      },
    })
  }
})

// ── Get payment link for a trader ──────────────────────────────────────────
app.post('/api/payment-link', async (req, res) => {
  const { traderId, traderName, amount, description } = req.body
  try {
    const linkRes = await korapay.post('/transactions/initialize/link', {
      amount: amount || null,
      currency: 'NGN',
      description: description || `Pay ${traderName} via Agora`,
      reference: `ag_${traderId}_${Date.now()}`,
      merchant_bears_cost: false,
    })
    res.json({ success: true, link: linkRes.data?.data?.link })
  } catch (err) {
    console.warn('KoraPay link failed, using mock:', err.message)
    const slug = traderName.toLowerCase().replace(/\s+/g, '-')
    res.json({
      success: true,
      mock: true,
      link: `https://pay.korapay.com/agora/${slug}${amount ? `?amount=${amount}` : ''}`,
    })
  }
})

// ── Get transactions for a trader (mocked — real would pull from KoraPay) ──
app.get('/api/transactions/:traderId', async (req, res) => {
  const { traderId } = req.params
  try {
    // In production: fetch from KoraPay transactions API
    // GET /transactions?reference=ag_{traderId}*
    const txns = [
      { id: 1, name: 'Ngozi Eze', type: 'credit', amount: 18500, date: '2026-05-30T10:42:00Z', method: 'KoraPay', status: 'success' },
      { id: 2, name: 'Chidi Onyeka', type: 'credit', amount: 42000, date: '2026-05-30T08:15:00Z', method: 'KoraPay', status: 'success' },
      { id: 3, name: 'Alhaji Supplies', type: 'debit', amount: 75000, date: '2026-05-29T15:30:00Z', method: 'Transfer', status: 'success' },
      { id: 4, name: 'Fatima Bello', type: 'credit', amount: 9800, date: '2026-05-29T13:10:00Z', method: 'KoraPay', status: 'success' },
      { id: 5, name: 'Emeka Traders', type: 'credit', amount: 31200, date: '2026-05-28T11:00:00Z', method: 'KoraPay', status: 'success' },
    ]
    res.json({ success: true, traderId, total: txns.length, transactions: txns })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ── Credit score calculation ───────────────────────────────────────────────
app.get('/api/credit-score/:traderId', (req, res) => {
  const { traderId } = req.params
  // Real logic would pull from KoraPay transaction history and run scoring model
  const factors = [
    { name: 'Payment volume', score: 87, weight: 0.35 },
    { name: 'Transaction consistency', score: 74, weight: 0.25 },
    { name: 'Customer repeat rate', score: 61, weight: 0.20 },
    { name: 'BVN verified', score: 100, weight: 0.15 },
    { name: 'Months active', score: 55, weight: 0.05 },
  ]
  const total = Math.round(factors.reduce((s, f) => s + f.score * f.weight, 0) * 8.5)
  res.json({ success: true, traderId, creditScore: total, maxScore: 850, factors, status: 'Good Standing' })
})

// ── KoraPay webhook receiver ───────────────────────────────────────────────
app.post('/webhook/payment', (req, res) => {
  const event = req.body
  console.log('KoraPay webhook received:', JSON.stringify(event, null, 2))
  // In production: update trader transaction history, recalculate credit score
  if (event?.event === 'charge.success') {
    const { reference, amount, customer } = event.data || {}
    console.log(`✓ Payment confirmed: ₦${amount} from ${customer?.name} · ref: ${reference}`)
  }
  res.json({ received: true })
})

// ── OTP: send verification code (via KoraPay or any SMS provider) ──────────
app.post('/api/send-otp', async (req, res) => {
  const { phone, email, method } = req.body
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = Date.now() + (1000 * 60 * 10) // 10 minutes

  // Save OTP keyed by destination (phone or email)
  if (method === 'email' && email) otpStore.set(`email:${email}`, { code: otp, expiresAt })
  else if (phone) otpStore.set(`phone:${phone}`, { code: otp, expiresAt })

  // Send email if requested and mailer configured
  if (method === 'email' && email) {
    if (!USE_MOCK_OTP && mailer) {
      try {
        await mailer.sendMail({
          from: process.env.SMTP_FROM || 'no-reply@agora.local',
          to: email,
          subject: 'Your Agora verification code',
          html: `<p>Hi,</p>
            <p>Your Agora verification code is <strong style="font-size:18px">${otp}</strong>.</p>
            <p>This code will expire in 10 minutes. If you didn't request this, please ignore this email.</p>
            <p>— Agora</p>`,
        })
        return res.json({ success: true, message: `OTP sent to ${email}` })
      } catch (err) {
        console.error('Failed to send email OTP', err.message)
        if (!USE_MOCK_OTP) {
          return res.status(500).json({ success: false, message: 'Failed to send email OTP' })
        }
      }
    }
    // Fallback: mock send
    console.log(`(mock) Email OTP for ${email}: ${otp}`)
    return res.json({ success: true, message: `OTP (mock) logged for ${email}`, mockOtp: otp })
  }

  // Send SMS if phone provided
  if (phone) {
    if (!USE_MOCK_OTP && twilioClient && process.env.TWILIO_FROM) {
      try {
        await twilioClient.messages.create({
          body: `Your Agora verification code is ${otp}. It expires in 10 minutes. — Agora`,
          from: process.env.TWILIO_FROM,
          to: phone,
        })
        return res.json({ success: true, message: `OTP sent to ${phone}` })
      } catch (err) {
        console.error('Failed to send SMS via Twilio', err.message)
        if (!USE_MOCK_OTP) {
          return res.status(500).json({ success: false, message: 'Failed to send SMS OTP' })
        }
      }
    }
    // Fallback: mock send
    console.log(`(mock) SMS OTP for ${phone}: ${otp}`)
    return res.json({ success: true, message: `OTP (mock) logged for ${phone}`, mockOtp: otp })
  }

  res.status(400).json({ success: false, message: 'No destination provided for OTP' })
})

app.post('/api/verify-otp', (req, res) => {
  const { otp, phone, email } = req.body
  let key = null
  if (email) key = `email:${email}`
  else if (phone) key = `phone:${phone}`
  else return res.status(400).json({ success: false, message: 'phone or email required' })

  const record = otpStore.get(key)
  if (!record) {
    if (USE_MOCK_OTP) {
      return res.json({ success: true, verified: true, message: 'Mock OTP accepted' })
    }
    return res.json({ success: false, verified: false, message: 'No OTP found or expired' })
  }
  if (Date.now() > record.expiresAt) { otpStore.delete(key); return res.json({ success: false, verified: false, message: 'OTP expired' }) }
  const ok = record.code === String(otp)
  if (ok) otpStore.delete(key)
  res.json({ success: ok, verified: ok })
})

// ── Start server ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅ Agora API running on http://localhost:${PORT}`)
  console.log(`   KoraPay mode: ${KORAPAY_SECRET.startsWith('sk_live') ? 'LIVE' : 'TEST/DEMO'}`)
  console.log(`   Endpoints:`)
  console.log(`     POST /api/verify-bvn`)
  console.log(`     POST /api/onboard`)
  console.log(`     POST /api/payment-link`)
  console.log(`     GET  /api/transactions/:traderId`)
  console.log(`     GET  /api/credit-score/:traderId`)
  console.log(`     POST /webhook/payment\n`)
})
