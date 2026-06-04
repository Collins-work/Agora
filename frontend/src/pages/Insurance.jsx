import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Card, SectionTitle, Button, Badge } from '../components/ui'
import { currentTrader } from '../data/mockData'
import { Shield, CheckCircle, ArrowRight, AlertTriangle, Package, ChevronLeft } from 'lucide-react'

const Page = styled.div`padding:1.75rem 2rem;max-width:1000px;`
const BackBtn = styled.button`
  display:flex;align-items:center;gap:4px;
  color:${p => p.theme.colors.earth[500]};
  font-size:13px;margin-bottom:0.75rem;
  transition:${p => p.theme.transition};
  &:hover{color:${p => p.theme.colors.earth[800]};transform:translateX(-2px);}
`

const HeroBanner = styled.div`
  background:${p => p.theme.colors.earth[800]};
  border-radius:${p => p.theme.radius.lg};
  padding:1.75rem 2rem;
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:1.5rem;color:${p => p.theme.colors.earth[50]};
`
const Grid = styled.div`display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem;`
const InsCard = styled(Card)`
  padding:0;overflow:hidden;
  border:${p => p.featured ? `2px solid ${p.theme.colors.gold[500]}` : `0.5px solid ${p.theme.colors.earth[200]}`};
`
const FeatTag = styled.div`
  background:${p => p.theme.colors.gold[500]};color:${p => p.theme.colors.earth[900]};
  font-size:10px;font-weight:600;padding:5px 12px;text-align:center;letter-spacing:0.05em;
`
const InsHeader = styled.div`padding:1.25rem;border-bottom:0.5px solid ${p => p.theme.colors.earth[100]};`
const InsIcon = styled.div`
  width:40px;height:40px;border-radius:${p => p.theme.radius.md};
  background:${p => p.theme.colors.gold[200]};color:${p => p.theme.colors.earth[800]};
  display:flex;align-items:center;justify-content:center;margin-bottom:10px;
  svg{width:18px;height:18px;}
`
const InsName = styled.p`font-size:15px;font-weight:500;color:${p => p.theme.colors.earth[800]};margin-bottom:2px;`
const InsProvider = styled.p`font-size:12px;color:${p => p.theme.colors.earth[500]};`
const InsBody = styled.div`padding:1.25rem;`
const InsPrice = styled.p`font-size:22px;font-weight:700;color:${p => p.theme.colors.earth[800]};font-family:${p => p.theme.fonts.display};`
const InsPeriod = styled.p`font-size:12px;color:${p => p.theme.colors.earth[500]};margin-bottom:1rem;`
const CoverList = styled.div`display:flex;flex-direction:column;gap:6px;margin-bottom:1rem;`
const CoverItem = styled.div`display:flex;align-items:center;gap:6px;font-size:12px;color:${p => p.theme.colors.earth[600]};`

const plans = [
  { id: 1, name: 'Basic Cover', provider: 'AXA Mansard', icon: <Shield />, price: '₦1,500', period: '/month', coverage: 'Up to ₦150,000', items: ['Fire & flood damage', 'Theft & burglary', 'Stock loss'], featured: false, status: 'ready' },
  { id: 2, name: 'Trade Cover', provider: 'AXA Mansard', icon: <Package />, price: '₦2,500', period: '/month', coverage: 'Up to ₦500,000', items: ['Fire & flood damage', 'Theft & burglary', 'Stock loss', 'Business interruption'], featured: true, status: 'ready' },
  { id: 3, name: 'Premium Cover', provider: 'Leadway Assurance', icon: <Shield />, price: '₦5,000', period: '/month', coverage: 'Up to ₦2,000,000', items: ['All Basic & Trade benefits', 'Goods in transit', 'Public liability', 'Key person insurance'], featured: false, status: 'ready' },
]

export default function Insurance() {
  const navigate = useNavigate()
  const theme = useTheme()
  const [insured, setInsured] = useState({})

  const handleGetCovered = (id) => {
    setInsured(prev => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setInsured(prev => ({ ...prev, [id]: 'success' }))
    }, 1500)
  }
  return (
    <Page>
        <BackBtn onClick={() => navigate('/dashboard')}><ChevronLeft size={14} /> Back to dashboard</BackBtn>
        <SectionTitle mb="1.25rem">Insurance</SectionTitle>

        <HeroBanner>
          <div>
            <p style={{ fontSize: '20px', fontWeight: '600', fontFamily: 'var(--font-display)', marginBottom: '6px' }}>
              Protect your stock and business ✓
            </p>
            <p style={{ fontSize: '13px', color: theme.colors.earth[300], marginBottom: '1rem', lineHeight: '1.6' }}>
              Your credit score of {currentTrader.creditScore} qualifies you for all three insurance plans.<br />
              Premiums start at just ₦1,500/month — paid automatically from KoraPay collections.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[['3 plans available', 'Ready now'], ['₦150K – ₦2M', 'Coverage range'], ['Instant', 'Activation']].map(([v, l]) => (
                <div key={l}>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: theme.colors.earth[800] }}>{v}</p>
                  <p style={{ fontSize: '11px', color: theme.colors.earth[500] }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.25rem', minWidth: '200px', border: '0.5px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: '11px', color: theme.colors.earth[500], marginBottom: '4px' }}>Why you need it</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Market fires happen', 'Theft & flooding risk', 'Protect your investment'].map(r => (
                <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: theme.colors.earth[200] }}>
                  <AlertTriangle size={12} color="#1976D2" /> {r}
                </div>
              ))}
            </div>
          </div>
        </HeroBanner>

        <Grid>
          {plans.map(plan => (
            <InsCard key={plan.id} featured={plan.featured} delay={`${plan.id * 0.08}s`}>
              {plan.featured && <FeatTag>MOST POPULAR</FeatTag>}
              <InsHeader>
                <InsIcon>{plan.icon}</InsIcon>
                <InsName>{plan.name}</InsName>
                <InsProvider>{plan.provider}</InsProvider>
              </InsHeader>
              <InsBody>
                <InsPrice>{plan.price}</InsPrice>
                <InsPeriod>{plan.period} · Covers {plan.coverage}</InsPeriod>
                <CoverList>
                  {plan.items.map(item => (
                    <CoverItem key={item}><CheckCircle size={12} color="#0F5F43" /> {item}</CoverItem>
                  ))}
                </CoverList>
                <Button 
                  variant={insured[plan.id] === 'success' ? 'outline' : plan.featured ? 'gold' : 'outline'} 
                  fullWidth 
                  onClick={() => !insured[plan.id] && handleGetCovered(plan.id)}
                  disabled={insured[plan.id] === true}
                >
                  {insured[plan.id] === 'success' ? <><CheckCircle size={14} /> Plan active</> 
                    : insured[plan.id] === true ? 'Activating...' 
                    : <>Get covered <ArrowRight size={13} /></>}
                </Button>
              </InsBody>
            </InsCard>
          ))}
        </Grid>

        <Card delay="0.3s">
          <SectionTitle>How insurance works with Agora</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
            {[
              { n: '1', title: 'Choose a plan', desc: 'Pick the cover that fits your stock value.' },
              { n: '2', title: 'Instant activation', desc: 'Your Agora ID activates the policy — no paperwork.' },
              { n: '3', title: 'Auto-payment', desc: 'Premium is deducted automatically from your KoraPay balance monthly.' },
              { n: '4', title: 'File a claim', desc: 'Report damage via the app. Claims are reviewed within 5 business days.' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#E6F8FF', color: theme.colors.earth[800], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600' }}>{s.n}</div>
                <p style={{ fontSize: '13px', fontWeight: '500', color: theme.colors.earth[800] }}>{s.title}</p>
                <p style={{ fontSize: '12px', color: theme.colors.earth[500], lineHeight: '1.5' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </Page>
    )
}
