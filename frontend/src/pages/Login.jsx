import { useState } from 'react'
import styled from 'styled-components'
import { useNavigate, NavLink } from 'react-router-dom'
import { ArrowRight, Shield, UserCheck, KeyRound, Home, Mail } from 'lucide-react'
import { Button, Input, Label, FormGroup } from '../components/ui'
import { demo, findAccountByIdentifier, saveAccount, setActiveAccount } from '../data/auth'

const Page = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-family: ${p => p.theme.fonts.body};
`

const Left = styled.div`
  background: ${p => p.theme.colors.earth[700]};
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: -60px;
    right: -60px;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    border: 40px solid ${p => p.theme.colors.gold[500]}18;
  }
`

const Logo = styled(NavLink)`
  font-family: ${p => p.theme.fonts.display};
  font-size: 22px;
  font-weight: 700;
  color: ${p => p.theme.colors.earth[50]};
  text-decoration: none;
  span { color: ${p => p.theme.colors.earth[50]}; }
`

const Intro = styled.div``
const Title = styled.h1`
  font-family: ${p => p.theme.fonts.display};
  font-size: 40px;
  line-height: 1.1;
  color: ${p => p.theme.colors.earth[50]};
  margin: 1.5rem 0 1rem;
  span { color: ${p => p.theme.colors.earth[50]}; }
`
const Sub = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: ${p => p.theme.colors.earth[300]};
  max-width: 440px;
`

const BulletList = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 2rem;
`
const Bullet = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: ${p => p.theme.colors.earth[300]};
  svg { color: ${p => p.theme.colors.earth[50]}; flex-shrink: 0; }
`

const DemoCard = styled.div`
  background: rgba(255,255,255,0.06);
  border: 0.5px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  padding: 1rem 1.1rem;
  margin-top: 2rem;
`

const DemoLabel = styled.p`
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.earth[50]};
  margin-bottom: 0.75rem;
`

const DemoLine = styled.p`
  font-size: 13px;
  color: ${p => p.theme.colors.earth[200]};
  line-height: 1.7;
`

const Right = styled.div`
  background: ${p => p.theme.colors.earth[50]};
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FormCard = styled.div`
  width: 100%;
  max-width: 520px;
  background: ${p => p.theme.colors.white};
  border: 0.5px solid ${p => p.theme.colors.earth[200]};
  border-radius: 24px;
  padding: 2rem;
  box-shadow: ${p => p.theme.shadow.md};
`

const Kicker = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.earth[600]};
  margin-bottom: 1rem;
`

const Heading = styled.h2`
  font-family: ${p => p.theme.fonts.display};
  font-size: 32px;
  line-height: 1.1;
  color: ${p => p.theme.colors.earth[800]};
  margin-bottom: 0.75rem;
`

const Copy = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: ${p => p.theme.colors.earth[500]};
  margin-bottom: 1.5rem;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
`

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

const ErrorText = styled.p`
  font-size: 13px;
  color: ${p => p.theme.colors.earth[800]};
  margin-top: 0.9rem;
`

export default function Login() {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const account = findAccountByIdentifier(identifier, pin)
      if (!account) {
        setError('Invalid Business ID, email, phone number, or PIN.')
        return
      }
      setActiveAccount(account.id)
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const useDemo = () => {
    saveAccount(demo)
    setActiveAccount(demo.id)
    setIdentifier(demo.email)
    setPin(demo.pin)
    setError('')
    navigate('/dashboard')
  }

  return (
    <Page>
      <Left>
        <div>
          <Logo to="/">Ago<span>ra</span></Logo>
          <Intro>
            <Title>Sign in to your <span>Agora</span> account.</Title>
            <Sub>
              Use your Business ID, email, or phone number with your PIN to access your already created account.
            </Sub>
            <BulletList>
              <Bullet><Shield size={15} /> Access your verified identity dashboard</Bullet>
              <Bullet><UserCheck size={15} /> Continue from the account you already created</Bullet>
              <Bullet><KeyRound size={15} /> Keep your login private and simple</Bullet>
            </BulletList>
          </Intro>
        </div>
        <DemoCard>
          <DemoLabel>Demo account</DemoLabel>
          <DemoLine>{demo.name}</DemoLine>
          <DemoLine>{demo.id}</DemoLine>
          <DemoLine>{demo.email}</DemoLine>
          <DemoLine>PIN {demo.pin}</DemoLine>
        </DemoCard>
      </Left>

      <Right>
        <FormCard>
          <Kicker><Mail size={13} /> Account login</Kicker>
          <Heading>Welcome back.</Heading>
          <Copy>Enter the details used when the account was created. If you onboarded with Agora, use the PIN you set there.</Copy>
          <form onSubmit={submit}>
            <FormGroup>
              <Label>Business ID, email, or phone number</Label>
              <Input value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="AG-LG-00419 or amara@email.com" />
            </FormGroup>
            <FormGroup>
              <Label>PIN</Label>
              <Input value={pin} onChange={e => setPin(e.target.value)} type="password" placeholder="Enter your PIN" />
            </FormGroup>
            <Actions>
              <Button variant="gold" type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'} <ArrowRight size={15} />
              </Button>
              <Button variant="outline" type="button" onClick={useDemo}>Use demo account</Button>
              <Button variant="ghost" type="button" onClick={() => navigate('/onboarding')}>Create account</Button>
            </Actions>
            {error && <ErrorText>{error}</ErrorText>}
          </form>
        </FormCard>
      </Right>
    </Page>
  )
}
