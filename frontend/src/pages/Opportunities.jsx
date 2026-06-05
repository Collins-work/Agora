import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Card, SectionTitle, Badge, Button } from '../components/ui'
import { opportunities, currentTrader } from '../data/mockData'
import { TrendingUp, Shield, FileText, Building2, ArrowRight, Lock, CheckCircle, Clock, ChevronLeft } from 'lucide-react'

const Page = styled.div`
  padding:1.75rem 2rem;
  max-width:1000px;
  margin: 0 auto;
  width: 100%;
  @media (max-width: 900px) {
    padding:1.5rem 1rem;
  }
`
const BackBtn = styled.button`
  display:flex;align-items:center;gap:4px;
  color:${p => p.theme.colors.earth[500]};
  font-size:13px;margin-bottom:0.75rem;
  transition:${p => p.theme.transition};
  &:hover{color:${p => p.theme.colors.earth[800]};transform:translateX(-2px);}
`

const ScoreBanner = styled.div`
  background:${p => p.theme.colors.earth[800]};
  border-radius:${p => p.theme.radius.lg};
  padding:1.5rem;
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:1.5rem;color:${p => p.theme.colors.earth[50]};
  gap:1rem;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
`
const BannerLeft = styled.div``
const BannerTitle = styled.p`font-size:16px;font-weight:500;margin-bottom:4px;`
const BannerSub = styled.p`font-size:13px;color:${p => p.theme.colors.earth[300]};`
const ScoreChip = styled.div`
  background:${p => p.theme.colors.gold[500]};
  color:${p => p.theme.colors.earth[900]};
  border-radius:${p => p.theme.radius.lg};
  padding:0.75rem 1.25rem;text-align:center;
`
const ScoreNum = styled.p`font-size:32px;font-weight:700;font-family:${p => p.theme.fonts.display};line-height:1;`
const ScoreLbl = styled.p`font-size:11px;margin-top:4px;`

const ScoreBar = styled.div`
  flex:1;margin:0 1.5rem;
`
const BarLabel = styled.div`display:flex;justify-content:space-between;margin-bottom:6px;`
const BarLabelTxt = styled.p`font-size:12px;color:${p => p.theme.colors.earth[300]};`
const BarTrack = styled.div`height:8px;background:rgba(255,255,255,0.1);border-radius:4px;`
const BarFill = styled.div`height:8px;border-radius:4px;background:${p => p.theme.colors.gold[500]};width:${p => p.pct}%;`
const Milestones = styled.div`display:flex;justify-content:space-between;margin-top:6px;`
const Milestone = styled.div`text-align:center;`
const MilestoneDot = styled.div`
  width:10px;height:10px;border-radius:50%;margin:0 auto 4px;
  background:${p => p.achieved ? p.theme.colors.gold[500] : p.theme.colors.earth[500]};
`
const MilestoneLbl = styled.p`font-size:10px;color:${p => p.theme.colors.earth[400]};`

const Grid = styled.div`
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:1rem;
  @media (max-width: 900px) {
    grid-template-columns:1fr;
  }
`

const OppCard = styled(Card)`
  display:flex;flex-direction:column;gap:0;padding:0;overflow:hidden;
  border:${p => p.status === 'ready' ? `1.5px solid ${p.theme.colors.gold[400]}` : `0.5px solid ${p.theme.colors.earth[200]}`};
  opacity:${p => p.status === 'locked' ? 0.7 : 1};
`
const OppHeader = styled.div`
  padding:1.25rem 1.25rem 1rem;
  border-bottom:0.5px solid ${p => p.theme.colors.earth[100]};
`
const OppTop = styled.div`display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;`
const OppIcon = styled.div`
  width:44px;height:44px;border-radius:${p => p.theme.radius.md};
  background:${p => p.theme.colors.gold[200]};color:${p => p.theme.colors.earth[800]};
  display:flex;align-items:center;justify-content:center;
  svg{width:20px;height:20px;}
`
const OppTitle = styled.p`font-size:15px;font-weight:500;color:${p => p.theme.colors.earth[800]};margin-bottom:2px;`
const OppProvider = styled.p`font-size:12px;color:${p => p.theme.colors.earth[500]};`
const OppDesc = styled.p`font-size:13px;color:${p => p.theme.colors.earth[600]};line-height:1.6;padding:1rem 1.25rem;`
const OppFooter = styled.div`padding:0 1.25rem 1.25rem;`

const LockedOverlay = styled.div`
  display:flex;align-items:center;gap:6px;
  font-size:12px;color:${p => p.theme.colors.earth[400]};
  background:${p => p.theme.colors.earth[50]};
  border-radius:6px;padding:8px 12px;
  svg{width:14px;height:14px;}
`

const ICONS = {
  bank: <TrendingUp />,
  shield: <Shield />,
  file: <FileText />,
  building: <Building2 />,
}

export default function Opportunities() {
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
        <SectionTitle mb="1.25rem">Opportunities</SectionTitle>

        <ScoreBanner>
          <ScoreChip>
            <ScoreNum>{t.creditScore}</ScoreNum>
            <ScoreLbl>/ {t.maxScore}</ScoreLbl>
          </ScoreChip>
          <ScoreBar>
            <BarLabel>
              <BarLabelTxt>Your credit score progress</BarLabelTxt>
              <BarLabelTxt>8 pts to LSETF grant</BarLabelTxt>
            </BarLabel>
            <BarTrack><BarFill pct={(t.creditScore / t.maxScore) * 100} /></BarTrack>
            <Milestones>
              {[{ score: 500, label: 'Loan' }, { score: 650, label: 'Insurance' }, { score: 750, label: 'Grants' }, { score: 800, label: 'Tenders' }].map(m => (
                <Milestone key={m.score}>
                  <MilestoneDot achieved={t.creditScore >= m.score} />
                  <MilestoneLbl>{m.score}</MilestoneLbl>
                  <MilestoneLbl>{m.label}</MilestoneLbl>
                </Milestone>
              ))}
            </Milestones>
          </ScoreBar>
          <BannerLeft>
            <BannerTitle>2 opportunities unlocked</BannerTitle>
            <BannerSub>Keep transacting to unlock more</BannerSub>
          </BannerLeft>
        </ScoreBanner>

        <Grid>
          {opportunities.map(o => (
            <OppCard key={o.id} status={o.status} delay={`${o.id * 0.07}s`}>
              <OppHeader>
                <OppTop>
                  <OppIcon>{ICONS[o.icon]}</OppIcon>
                  <Badge variant={o.status === 'ready' ? 'success' : o.status === 'soon' ? 'warning' : 'locked'}>
                    {o.status === 'ready' ? <><CheckCircle size={11} /> Ready</>
                      : o.status === 'soon' ? <><Clock size={11} /> {o.ptsAway} pts away</>
                        : <><Lock size={11} /> Score {o.scoreNeeded}+</>}
                  </Badge>
                </OppTop>
                <OppTitle>{o.title}</OppTitle>
                <OppProvider>{o.provider} · {o.sub}</OppProvider>
              </OppHeader>
              <OppDesc>{o.desc}</OppDesc>
              <OppFooter>
                {o.status === 'ready' ? (
                  <Button 
                    variant={applied[o.id] === 'success' ? 'outline' : 'gold'} 
                    fullWidth 
                    onClick={() => !applied[o.id] && handleApply(o.id)}
                    disabled={applied[o.id] === true}
                  >
                    {applied[o.id] === 'success' ? <><CheckCircle size={14} /> Application sent</> 
                      : applied[o.id] === true ? 'Sending...' 
                      : <>{o.type === 'grant' ? 'Apply for grant' : o.type === 'loan' ? 'Start application' : 'Get access'} <ArrowRight size={14} /></>}
                  </Button>
                ) : o.status === 'soon' ? (
                  <Button variant="outline" fullWidth disabled>
                    {o.ptsAway} more credit points needed
                  </Button>
                ) : (
                  <LockedOverlay>
                    <Lock /> Reach a score of {o.scoreNeeded} to unlock this
                  </LockedOverlay>
                )}
              </OppFooter>
            </OppCard>
          ))}
        </Grid>

        <Card delay="0.35s" style={{ marginTop: '1rem' }}>
          <SectionTitle>How to grow your score faster</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
            {[
              { icon: <TrendingUp size={18} />, tip: 'Transact more', desc: 'Every payment via your KoraPay link adds to your score. Encourage customers to pay digitally.' },
              { icon: <CheckCircle size={18} />, tip: 'Stay consistent', desc: 'Regular monthly transactions score higher than occasional large ones. Consistency matters most.' },
              { icon: <Shield size={18} />, tip: 'Keep BVN active', desc: 'An active, verified BVN is worth 100% of the BVN factor. Check your identity stays current.' },
            ].map(tip => (
              <div key={tip.tip} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#E6F8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.earth[800] }}>
                  {tip.icon}
                </div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: theme.colors.earth[800] }}>{tip.tip}</p>
                <p style={{ fontSize: '13px', color: theme.colors.earth[500], lineHeight: '1.6' }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </Page>
    )
}
