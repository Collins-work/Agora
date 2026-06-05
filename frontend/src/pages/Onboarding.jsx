import { useState } from 'react'
import styled, { keyframes, useTheme } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Select, Label, FormGroup } from '../components/ui'
import { markets, tradeTypes } from '../data/mockData'
import { createAccountFromOnboarding } from '../data/auth'
import { CheckCircle, ArrowRight, ArrowLeft, Shield, Smartphone } from 'lucide-react'
import { useEffect } from 'react'

const fadeUp = keyframes`from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}`

const Page = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-family: ${p => p.theme.fonts.body};
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const Left = styled.div`
  background: ${p => p.theme.colors.earth[700]};
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  @media (max-width: 900px) {
    padding: 2rem 1.5rem;
  }
  &::before {
    content:'';
    position:absolute;
    top:-60px;right:-60px;
    width:240px;height:240px;
    border-radius:50%;
    border:40px solid ${p => p.theme.colors.gold[500]}18;
  }
`
const LeftLogo = styled.div`
  font-family: ${p => p.theme.fonts.display};
  font-size: 22px;
  font-weight: 700;
  color: ${p => p.theme.colors.earth[50]};
  span { color: ${p => p.theme.colors.earth[50]}; }
  cursor: pointer;
`
const LeftContent = styled.div``
const LeftTitle = styled.h2`
  font-family: ${p => p.theme.fonts.display};
  font-size: 36px;
  font-weight: 700;
  color: ${p => p.theme.colors.earth[50]};
  line-height: 1.2;
  margin-bottom: 1rem;
  span { color: ${p => p.theme.colors.earth[50]}; }
`
const LeftSub = styled.p`
  font-size: 15px;
  color: ${p => p.theme.colors.earth[300]};
  line-height: 1.7;
  margin-bottom: 2rem;
`
const LeftBenefits = styled.div`display:flex;flex-direction:column;gap:10px;`
const Benefit = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: ${p => p.theme.colors.earth[300]};
  svg { color: ${p => p.theme.colors.earth[50]}; flex-shrink: 0; }
`
const PoweredBy = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${p => p.theme.colors.earth[400]};
  svg { color: ${p => p.theme.colors.earth[50]}; }
`

const Right = styled.div`
  background: ${p => p.theme.colors.earth[50]};
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 900px) {
    padding: 2rem 1.5rem;
  }
`
const StepIndicator = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 2rem;
`
const StepDot = styled.div`
  height: 4px;
  flex: 1;
  border-radius: 2px;
  background: ${p => p.active ? p.theme.colors.gold[500] : p.theme.colors.earth[200]};
  transition: ${p => p.theme.transition};
`
const FormTitle = styled.h3`
  font-family: ${p => p.theme.fonts.display};
  font-size: 26px;
  font-weight: 600;
  color: ${p => p.theme.colors.earth[800]};
  margin-bottom: 6px;
`
const FormSub = styled.p`
  font-size: 14px;
  color: ${p => p.theme.colors.earth[500]};
  margin-bottom: 1.75rem;
`
const FormWrap = styled.div`animation: ${fadeUp} 0.35s ease both;`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

const OtpWrap = styled.div`display:flex;gap:10px;justify-content:center;margin:1rem 0;`
const OtpInput = styled.input`
  width: 52px;
  height: 60px;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  border: 1.5px solid ${p => p.focused ? p.theme.colors.gold[500] : p.theme.colors.earth[200]};
  border-radius: ${p => p.theme.radius.md};
  background: white;
  color: ${p => p.theme.colors.earth[800]};
  font-family: ${p => p.theme.fonts.mono};
  outline: none;
  transition: ${p => p.theme.transition};
  &:focus { border-color: ${p => p.theme.colors.gold[500]}; box-shadow: 0 0 0 3px ${p => p.theme.colors.gold[200]}40; }
`
const SuccessWrap = styled.div`
  text-align: center;
  animation: ${fadeUp} 0.4s ease both;
  padding: 1rem 0;
`
const SuccessIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${p => p.theme.colors.green[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
  svg { color: ${p => p.theme.colors.earth[800]}; }
`
const BvnHint = styled.p`
  font-size: 12px;
  color: ${p => p.theme.colors.earth[400]};
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 6px;
  svg { flex-shrink: 0; }
`

const TOTAL_STEPS = 4

export default function Onboarding() {
  const navigate = useNavigate()
  const theme = useTheme()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', bvn: '',
    market: '', tradeType: '', yearsTrading: '',
    email: '', pin: '',
  })
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState('sms')
  const [otpSending, setOtpSending] = useState(false)
  const [otpError, setOtpError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const next = async () => {
    if (step < TOTAL_STEPS) return setStep(s => s + 1)

    // Final step: verify OTP then create account locally
    const code = otp.join('')
    const payload = { otp: code }
    if (deliveryMethod === 'sms') payload.phone = form.phone
    else if (deliveryMethod === 'email') payload.email = form.email

    setLoading(true)
    setOtpError('')
    try {
      const res = await fetch(`${API_URL}/api/verify-otp`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      setLoading(false)
      if (!data?.verified) return setOtpError(data?.message || 'Invalid code — please try again')

      // create account locally and set active session
      try {
        const account = createAccountFromOnboarding(form)
        setStep(5)
        navigate('/dashboard')
      } catch (err) {
        setOtpError('Account creation failed — please try again')
      }
    } catch (err) {
      setLoading(false)
      setOtpError('Verification failed — try again')
    }
  }
  const back = () => { if (step > 1) setStep(s => s - 1) }

  const handleOtp = (i, val) => {
    const newOtp = [...otp]
    newOtp[i] = val.slice(-1)
    setOtp(newOtp)
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus()
  }

  const sendOtp = async (method = 'sms') => {
    setOtpSending(true)
    setOtpError('')
    try {
      const body = { method }
      if (method === 'sms') body.phone = form.phone
      else body.email = form.email
      const res = await fetch(`${API_URL}/api/send-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!data?.success) return setOtpError(data?.message || 'Failed to send OTP')
      if (data?.mockOtp) {
        setOtp([...(data.mockOtp || '')].slice(0, 6))
      }
    } catch (err) {
      setOtpError('Failed to send OTP')
    } finally { setOtpSending(false) }
  }

  useEffect(() => {
    // When user reaches the OTP step, send an SMS OTP automatically if phone exists
    if (step === 4) {
      setOtpError('')
      if (deliveryMethod === 'sms' && form.phone) sendOtp('sms')
      else if (deliveryMethod === 'email' && form.email) sendOtp('email')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return (
    <Page>
      <Left>
        <LeftLogo onClick={() => navigate('/')}>Ago<span>ra</span></LeftLogo>
        <LeftContent>
          <LeftTitle>Your business,<br /><span>officially recognised.</span></LeftTitle>
          <LeftSub>Join over 10,000 traders who now have a verified financial identity — and access to credit, insurance, and government contracts.</LeftSub>
          <LeftBenefits>
            {['Free digital Business ID with QR code', 'Personal KoraPay payment link instantly', 'Credit score starts building from day one', 'Qualify for loans, insurance & govt tenders'].map(b => (
              <Benefit key={b}><CheckCircle size={16} /> {b}</Benefit>
            ))}
          </LeftBenefits>
        </LeftContent>
        <PoweredBy><Shield size={14} /> Identity verified via KoraPay · CBN licensed</PoweredBy>
      </Left>

      <Right>
        {step < 5 && (
          <StepIndicator>
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <StepDot key={i} active={i < step} />
            ))}
          </StepIndicator>
        )}

        {step === 1 && (
          <FormWrap key="step1">
            <FormTitle>Personal details</FormTitle>
            <FormSub>Step 1 of 4 · Tell us who you are</FormSub>
            <Row>
              <FormGroup><Label>First name</Label><Input placeholder="Amara" value={form.firstName} onChange={e => set('firstName', e.target.value)} /></FormGroup>
              <FormGroup><Label>Last name</Label><Input placeholder="Okonkwo" value={form.lastName} onChange={e => set('lastName', e.target.value)} /></FormGroup>
            </Row>
            <FormGroup>
              <Label>Phone number</Label>
              <Input placeholder="080xxxxxxxx" value={form.phone} onChange={e => set('phone', e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label>Email address (optional)</Label>
              <Input placeholder="amara@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
            </FormGroup>
            <Button variant="gold" fullWidth onClick={next}>Continue <ArrowRight size={15} /></Button>
          </FormWrap>
        )}

        {step === 2 && (
          <FormWrap key="step2">
            <FormTitle>BVN verification</FormTitle>
            <FormSub>Step 2 of 4 · Link your identity securely via KoraPay</FormSub>
            <FormGroup>
              <Label>Bank Verification Number (BVN)</Label>
              <Input placeholder="12345678901" maxLength={11} value={form.bvn} onChange={e => set('bvn', e.target.value)} />
              <BvnHint><Shield size={12} /> Your BVN is encrypted and never stored in full. Powered by KoraPay.</BvnHint>
            </FormGroup>
            <div style={{ background: theme.colors.earth[50], border: `0.5px solid ${theme.colors.earth[100]}`, borderRadius: '10px', padding: '1rem', marginBottom: '1rem' }}>
              <p style={{ fontSize: '13px', fontWeight: '500', marginBottom: '4px', color: theme.colors.earth[800] }}>Why we need your BVN</p>
              <p style={{ fontSize: '12px', color: theme.colors.earth[500], lineHeight: '1.6' }}>Your BVN lets us verify who you are without needing a bank account or company registration. This is what makes your Agora ID trusted by banks and government agencies.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="outline" onClick={back}><ArrowLeft size={15} /></Button>
              <Button variant="gold" fullWidth onClick={next}>Verify & continue <ArrowRight size={15} /></Button>
            </div>
          </FormWrap>
        )}

        {step === 3 && (
          <FormWrap key="step3">
            <FormTitle>Your business</FormTitle>
            <FormSub>Step 3 of 4 · Tell us about your trade</FormSub>
            <FormGroup>
              <Label>Market / location</Label>
              <Select value={form.market} onChange={e => set('market', e.target.value)}>
                <option value="">Select your market</option>
                {markets.map(m => <option key={m}>{m}</option>)}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Type of trade</Label>
              <Select value={form.tradeType} onChange={e => set('tradeType', e.target.value)}>
                <option value="">What do you sell?</option>
                {tradeTypes.map(t => <option key={t}>{t}</option>)}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Years trading</Label>
              <Select value={form.yearsTrading} onChange={e => set('yearsTrading', e.target.value)}>
                <option value="">How long have you been trading?</option>
                <option>Less than 1 year</option>
                <option>1–2 years</option>
                <option>3–5 years</option>
                <option>5–10 years</option>
                <option>Over 10 years</option>
              </Select>
            </FormGroup>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="outline" onClick={back}><ArrowLeft size={15} /></Button>
              <Button variant="gold" fullWidth onClick={next}>Continue <ArrowRight size={15} /></Button>
            </div>
          </FormWrap>
        )}

        {step === 4 && (
          <FormWrap key="step4">
            <FormTitle>Verify your phone</FormTitle>
            <FormSub>Step 4 of 4 · Enter the 6-digit OTP sent to {deliveryMethod === 'sms' ? (form.phone || '080xxxxxxxx') : form.email}</FormSub>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: deliveryMethod === 'sms' ? theme.colors.earth[100] : theme.colors.earth[50], borderRadius: '10px', padding: '10px 14px', marginBottom: '1.25rem' }}>
              {deliveryMethod === 'sms' ? <Smartphone size={15} color={theme.colors.earth[800]} /> : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8.5C3 7.11929 4.11929 6 5.5 6H18.5C19.8807 6 21 7.11929 21 8.5V15.5C21 16.8807 19.8807 18 18.5 18H5.5C4.11929 18 3 16.8807 3 15.5V8.5Z" stroke={theme.colors.earth[800]} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              <span style={{ fontSize: '13px', color: deliveryMethod === 'sms' ? theme.colors.earth[800] : theme.colors.earth[800] }}>
                {deliveryMethod === 'sms' ? 'OTP sent via SMS to your number' : `OTP sent to ${form.email}`}
              </span>
            </div>
            {form.email && deliveryMethod !== 'email' && (
              <div style={{ marginBottom: '0.9rem' }}>
                <button
                  type="button"
                  onClick={async () => { setDeliveryMethod('email'); await sendOtp('email') }}
                  style={{ background: 'none', border: 'none', color: theme.colors.earth[800], cursor: 'pointer', fontWeight: 600 }}>
                  Get code from email
                </button>
              </div>
            )}
            <OtpWrap>
              {otp.map((v, i) => (
                <OtpInput
                  key={i}
                  id={`otp-${i}`}
                  value={v}
                  onChange={e => handleOtp(i, e.target.value)}
                  maxLength={1}
                />
              ))}
            </OtpWrap>
            <p style={{ textAlign: 'center', fontSize: '12px', color: theme.colors.earth[500], marginBottom: '1.25rem' }}>
              Didn't receive it? <span style={{ color: theme.colors.earth[800], cursor: 'pointer', fontWeight: '500' }} onClick={() => sendOtp(deliveryMethod)}>{otpSending ? 'Sending…' : 'Resend OTP'}</span>
            </p>
            {otpError && <p style={{ textAlign: 'center', color: theme.colors.earth[800], marginBottom: '1rem' }}>{otpError}</p>}
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="outline" onClick={back}><ArrowLeft size={15} /></Button>
              <Button variant="gold" fullWidth onClick={next} disabled={loading}>
                {loading ? 'Creating your ID...' : 'Create my Agora ID'}
              </Button>
            </div>
          </FormWrap>
        )}

        {step === 5 && (
          <SuccessWrap>
            <SuccessIcon><CheckCircle size={36} /></SuccessIcon>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: '700', color: theme.colors.earth[800], marginBottom: '8px' }}>
              Welcome to Agora!
            </h2>
            <p style={{ fontSize: '14px', color: theme.colors.earth[500], marginBottom: '6px' }}>Your Business ID is ready</p>
            <div style={{ background: theme.colors.earth[800], borderRadius: '12px', padding: '1.25rem', color: theme.colors.earth[50], margin: '1.25rem 0', textAlign: 'left' }}>
              <p style={{ fontSize: '11px', color: theme.colors.earth[50], fontWeight: '600', letterSpacing: '0.08em', marginBottom: '8px' }}>AGORA · VERIFIED ID</p>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>{form.firstName} {form.lastName}</p>
              <p style={{ fontSize: '12px', color: theme.colors.earth[50], marginBottom: '10px' }}>{form.tradeType} · {form.market}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div><p style={{ fontSize: '10px', color: theme.colors.earth[50] }}>Business ID</p><p style={{ fontSize: '13px', fontWeight: '500' }}>AG-LG-00419</p></div>
                <div><p style={{ fontSize: '10px', color: theme.colors.earth[50] }}>Credit score</p><p style={{ fontSize: '13px', fontWeight: '500', color: theme.colors.earth[50] }}>500 / 850</p></div>
              </div>
            </div>
            <Button variant="gold" fullWidth onClick={() => navigate('/dashboard')}>
              Go to my dashboard <ArrowRight size={15} />
            </Button>
          </SuccessWrap>
        )}
      </Right>
    </Page>
  )
}
