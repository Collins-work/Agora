const axios = require('axios')
require('dotenv').config()

const KORAPAY_SECRET = process.env.KORAPAY_SECRET_KEY || process.env.KORAPAY_SECRET || ''
const KORAPAY_URL = 'https://api.korapay.com/merchant/api/v1'

if (!KORAPAY_SECRET || KORAPAY_SECRET.includes('your_key')) {
  console.error('\n❌ No valid KORAPAY secret found. Set KORAPAY_SECRET_KEY in .env or environment.\n')
  process.exit(1)
}

const korapay = axios.create({
  baseURL: KORAPAY_URL,
  headers: { Authorization: `Bearer ${KORAPAY_SECRET}`, 'Content-Type': 'application/json' },
  timeout: 10000,
})

async function testBVN() {
  console.log('→ Testing BVN verification endpoint (/identity/bvn)')
  try {
    const payload = { bvn: '22222222222', firstName: 'Test', lastName: 'User', dob: '1990-01-01' }
    const res = await korapay.post('/identity/bvn', payload)
    console.log('  Status:', res.status)
    console.log('  Response sample:', JSON.stringify(res.data).slice(0, 400))
  } catch (err) {
    if (err.response) {
      console.error('  Error response:', err.response.status, err.response.data)
    } else {
      console.error('  Request failed:', err.message)
    }
  }
}

async function testPaymentLink() {
  console.log('\n→ Testing payment link initializer (/transactions/initialize/link)')
  try {
    const payload = {
      amount: 100,
      currency: 'NGN',
      description: 'Smoke test payment',
      reference: `smoke_${Date.now()}`,
      merchant_bears_cost: false,
    }
    const res = await korapay.post('/transactions/initialize/link', payload)
    console.log('  Status:', res.status)
    console.log('  Response sample:', JSON.stringify(res.data).slice(0, 400))
  } catch (err) {
    if (err.response) {
      console.error('  Error response:', err.response.status, err.response.data)
    } else {
      console.error('  Request failed:', err.message)
    }
  }
}

async function run() {
  console.log('\nKoraPay smoke test starting...')
  await testBVN()
  await testPaymentLink()
  console.log('\nDone.')
}

run().catch((e) => console.error('Unexpected error:', e))
