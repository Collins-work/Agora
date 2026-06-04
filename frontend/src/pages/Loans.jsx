import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Card, SectionTitle, Button, Badge } from '../components/ui'
import { currentTrader } from '../data/mockData'
import { Building2, CheckCircle, ArrowRight, TrendingUp, Clock, ChevronLeft } from 'lucide-react'

const Page = styled.div`padding:1.75rem 2rem;max-width:1000px;`
const BackBtn = styled.button`
  display:flex;align-items:center;gap:4px;
  color:${p => p.theme.colors.earth[500]};
  font-size:13px;margin-bottom:0.75rem;
  transition:${p => p.theme.transition};
  &:hover{color:${p => p.theme.colors.earth[800]};transform:translateX(-2px);}
`

const HeroBanner = styled.div`
  background: linear-gradient(135deg, ${p => p.theme.colors.earth[700]} 0%, ${p => p.theme.colors.earth[800]} 100%);
  border-radius:${p => p.theme.radius.lg};
  padding:1.75rem 2rem;
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:1.5rem;
  color:${p => p.theme.colors.earth[50]};
`
const BannerLeft = styled.div``
const BannerTitle = styled.p`font-size:20px;font-weight:600;margin-bottom:6px;font-family:${p => p.theme.fonts.display};`
const BannerSub = styled.p`font-size:13px;color:${p => p.theme.colors.earth[300]};margin-bottom:1rem;`
const MaxLoan = styled.div`
  display:inline-block;background:${p => p.theme.colors.gold[500]};
  color:${p => p.theme.colors.earth[900]};border-radius:${p => p.theme.radius.md};
  padding:0.6rem 1.25rem;font-size:22px;font-weight:700;
  font-family:${p => p.theme.fonts.display};
`

const Grid = styled.div`display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem;`

const LoanCard = styled(Card)`
  padding:0;overflow:hidden;
  border:${p => p.featured ? `2px solid ${p.theme.colors.gold[500]}` : `0.5px solid ${p.theme.colors.earth[200]}`};
  position:relative;
`
const FeaturedTag = styled.div`
  position:absolute;top:0;right:0;
  background:${p => p.theme.colors.gold[500]};
  color:${p => p.theme.colors.earth[900]};
  font-size:10px;font-weight:600;padding:4px 10px;
  border-bottom-left-radius:8px;letter-spacing:0.05em;
`
const LoanHeader = styled.div`
  padding:1.25rem;border-bottom:0.5px solid ${p => p.theme.colors.earth[100]};
`
const LoanIcon = styled.div`
  width:40px;height:40px;border-radius:${p => p.theme.radius.md};
  background:${p => p.theme.colors.gold[200]};color:${p => p.theme.colors.earth[800]};
  display:flex;align-items:center;justify-content:center;margin-bottom:10px;
  svg{width:18px;height:18px;}
`
const LoanName = styled.p`font-size:15px;font-weight:500;color:${p => p.theme.colors.earth[800]};margin-bottom:2px;`
const LoanProvider = styled.p`font-size:12px;color:${p => p.theme.colors.earth[500]};`
const LoanBody = styled.div`padding:1.25rem;`
const LoanAmount = styled.p`
  font-size:26px;font-weight:700;color:${p => p.theme.colors.earth[800]};
  font-family:${p => p.theme.fonts.display};margin-bottom:4px;
`
const LoanRate = styled.p`font-size:12px;color:${p => p.theme.colors.earth[500]};margin-bottom:1rem;`
const LoanDetails = styled.div`display:flex;flex-direction:column;gap:6px;margin-bottom:1rem;`
const LoanDetail = styled.div`display:flex;align-items:center;gap:6px;font-size:12px;color:${p => p.theme.colors.earth[600]};`

const StepsCard = styled(Card)`margin-top:1rem;`
const StepRow = styled.div`display:flex;gap:1rem;padding:1rem 0;border-bottom:0.5px solid ${p => p.theme.colors.earth[100]};&:last-child{border:none;}`
const StepNum = styled.div`
  width:28px;height:28px;border-radius:50%;background:${p => p.theme.colors.gold[500]};
  color:${p => p.theme.colors.earth[900]};display:flex;align-items:center;justify-content:center;
  font-size:12px;font-weight:600;flex-shrink:0;margin-top:2px;
`
const StepText = styled.div``
const StepTitle = styled.p`font-size:14px;font-weight:500;color:${p => p.theme.colors.earth[800]};margin-bottom:3px;`
const StepDesc = styled.p`font-size:13px;color:${p => p.theme.colors.earth[500]};line-height:1.5;`

const loans = [
  { id: 1, name: 'Micro Loan', provider: 'Kuda Business', icon: <Building2 />, amount: '₦250,000', rate: '3.5% per month', tenure: '6 months', purpose: 'Working capital', minScore: 600, status: 'ready', featured: true },
  { id: 2, name: 'SME Loan', provider: 'Access Bank', icon: <TrendingUp />, amount: '₦1,000,000', rate: '2.8% per month', tenure: '12 months', purpose: 'Business expansion', minScore: 750, status: 'soon', featured: false },
  { id: 3, name: 'Trade Finance', provider: 'GTBank', icon: <Clock />, amount: '₦5,000,000', rate: '2.1% per month', tenure: '24 months', purpose: 'Import/Export', minScore: 800, status: 'locked', featured: false },
]

export default function Loans() {
  const navigate = useNavigate()
  const theme = useTheme()
  const t = currentTrader
  const [applied, setApplied] = useState({})

  const handleApply = (id) => {
    setApplied(prev => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setApplied(prev => ({ ...prev, [id]: 'success' }))
    }, 1500)
  }
  return (
    <Page>
        <BackBtn onClick={() => navigate('/dashboard')}><ChevronLeft size={14} /> Back to dashboard</BackBtn>
        <SectionTitle mb="1.25rem">Loans</SectionTitle>

        <HeroBanner>
          <BannerLeft>
            <BannerTitle>You qualify for a micro-loan 🎉</BannerTitle>
            <BannerSub>Based on your credit score of {t.creditScore} and 5 months of consistent KoraPay transactions</BannerSub>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div>
                <p style={{ fontSize: '11px', color: theme.colors.earth[400], marginBottom: '2px' }}>Maximum loan amount</p>
                <MaxLoan>₦250,000</MaxLoan>
              </div>
              <div style={{ fontSize: '13px', color: theme.colors.earth[200], lineHeight: '1.6' }}>
                <p>3.5% monthly interest</p>
                <p>6-month repayment</p>
              </div>
            </div>
          </BannerLeft>
          <Button variant="gold" size="lg">
            Apply now <ArrowRight size={15} />
          </Button>
        </HeroBanner>

        <Grid>
          {loans.map(loan => (
            <LoanCard key={loan.id} featured={loan.featured} delay={`${loan.id * 0.08}s`}>
              {loan.featured && <FeaturedTag>BEST MATCH</FeaturedTag>}
              <LoanHeader>
                <LoanIcon>{loan.icon}</LoanIcon>
                <LoanName>{loan.name}</LoanName>
                <LoanProvider>{loan.provider}</LoanProvider>
              </LoanHeader>
              <LoanBody>
                <LoanAmount>{loan.amount}</LoanAmount>
                <LoanRate>{loan.rate} · {loan.tenure}</LoanRate>
                <LoanDetails>
                  {[
                    ['Purpose', loan.purpose],
                    ['Min. score needed', loan.minScore],
                    ['Your score', t.creditScore],
                  ].map(([l, v]) => (
                    <LoanDetail key={l}>
                      <CheckCircle size={12} color={loan.status === 'ready' ? '#0F5F43' : '#6B7280'} />
                      <span style={{ color: theme.colors.earth[500] }}>{l}:</span> <strong>{v}</strong>
                    </LoanDetail>
                  ))}
                </LoanDetails>
                {loan.status === 'ready' ? (
                  <Button 
                    variant={applied[loan.id] === 'success' ? 'outline' : loan.featured ? 'gold' : 'outline'} 
                    fullWidth 
                    onClick={() => !applied[loan.id] && handleApply(loan.id)}
                    disabled={applied[loan.id] === true}
                  >
                    {applied[loan.id] === 'success' ? <><CheckCircle size={14} /> Application sent</> 
                      : applied[loan.id] === true ? 'Processing...' 
                      : <>{loan.featured ? 'Apply now' : 'Start application'} <ArrowRight size={13} /></>}
                  </Button>
                ) : loan.status === 'soon' ? (
                  <Button variant="outline" fullWidth disabled>Score {loan.minScore} needed</Button>
                ) : (
                  <Button variant="ghost" fullWidth disabled>Score {loan.minScore}+ required</Button>
                )}
              </LoanBody>
            </LoanCard>
          ))}
        </Grid>

        <StepsCard delay="0.3s">
          <SectionTitle>How to apply</SectionTitle>
          {[
            { n: '1', title: 'Click "Apply now"', desc: 'Select the loan product that matches your needs. Your Agora ID and credit profile are shared automatically — no forms to fill.' },
            { n: '2', title: 'Lender reviews your profile', desc: 'The lender uses your KoraPay transaction history and credit score to make a decision. This usually takes 24–48 hours.' },
            { n: '3', title: 'Funds in your account', desc: 'Once approved, funds are disbursed directly to your linked bank account via KoraPay. Repayment is automatic from future transactions.' },
          ].map(s => (
            <StepRow key={s.n}>
              <StepNum>{s.n}</StepNum>
              <StepText>
                <StepTitle>{s.title}</StepTitle>
                <StepDesc>{s.desc}</StepDesc>
              </StepText>
            </StepRow>
          ))}
        </StepsCard>
      </Page>
    )
}
