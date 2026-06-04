import styled, { useTheme } from 'styled-components'
import { Card, SectionTitle, Button, Badge } from '../components/ui'
import { currentTrader } from '../data/mockData'
import { FileText, Lock, ArrowRight, Building2, Clock, CheckCircle } from 'lucide-react'

const Page = styled.div`padding:1.75rem 2rem;max-width:1000px;`

const LockedBanner = styled.div`
  background:${p => p.theme.colors.earth[100]};
  border:1px dashed ${p => p.theme.colors.earth[300]};
  border-radius:${p => p.theme.radius.lg};
  padding:1.5rem 2rem;
  display:flex;align-items:center;gap:1.5rem;
  margin-bottom:1.5rem;
`
const LockIcon = styled.div`
  width:56px;height:56px;border-radius:50%;
  background:${p => p.theme.colors.earth[200]};
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
  color:${p => p.theme.colors.earth[500]};
`
const ProgressBar = styled.div`flex:1;`
const ProgressLabel = styled.div`display:flex;justify-content:space-between;margin-bottom:6px;`
const ProgressTrack = styled.div`height:10px;background:${p => p.theme.colors.earth[200]};border-radius:5px;`
const ProgressFill = styled.div`height:10px;border-radius:5px;background:${p => p.theme.colors.gold[500]};width:${p => p.pct}%;`

const Grid = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:1rem;`

const TenderCard = styled(Card)`
  padding:0;overflow:hidden;
  opacity:${p => p.locked ? 0.6 : 1};
`
const TenderHeader = styled.div`padding:1.25rem;border-bottom:0.5px solid ${p => p.theme.colors.earth[100]};`
const TenderTop = styled.div`display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;`
const TenderIcon = styled.div`
  width:40px;height:40px;border-radius:${p => p.theme.radius.md};
  background:${p => p.theme.colors.gold[200]};color:${p => p.theme.colors.earth[800]};
  display:flex;align-items:center;justify-content:center;
  svg{width:18px;height:18px;}
`
const TenderName = styled.p`font-size:15px;font-weight:500;color:${p => p.theme.colors.earth[800]};margin-bottom:2px;`
const TenderAgency = styled.p`font-size:12px;color:${p => p.theme.colors.earth[500]};`
const TenderBody = styled.div`padding:1.25rem;`
const TenderValue = styled.p`font-size:22px;font-weight:700;color:${p => p.theme.colors.earth[800]};font-family:${p => p.theme.fonts.display};margin-bottom:4px;`
const TenderSub = styled.p`font-size:12px;color:${p => p.theme.colors.earth[500]};margin-bottom:1rem;`
const TenderMeta = styled.div`display:flex;flex-direction:column;gap:5px;margin-bottom:1rem;`
const TenderMetaRow = styled.div`display:flex;align-items:center;gap:6px;font-size:12px;color:${p => p.theme.colors.earth[600]};`

const tenders = [
  { id: 1, name: 'School Supply Contract', agency: 'Lagos State Ministry of Education', icon: <Building2 />, value: '₦2.5M – ₦8M', category: 'Stationery & Books', deadline: 'June 30, 2026', minScore: 800, locked: true },
  { id: 2, name: 'Market Infrastructure', agency: 'LASG Infrastructure Dept.', icon: <FileText />, value: '₦1.2M – ₦4M', category: 'Construction Materials', deadline: 'July 15, 2026', minScore: 800, locked: true },
  { id: 3, name: 'Federal Uniform Supply', agency: 'Ministry of Interior', icon: <Clock />, value: '₦5M – ₦20M', category: 'Textile & Fabric', deadline: 'Aug 1, 2026', minScore: 800, locked: true },
  { id: 4, name: 'Canteen & Catering', agency: 'University of Lagos', icon: <Building2 />, value: '₦800K – ₦2M', category: 'Food Supply', deadline: 'June 20, 2026', minScore: 800, locked: true },
]

export default function Tenders() {
  const t = currentTrader
  const theme = useTheme()
  const needed = 800
  const pct = Math.min((t.creditScore / needed) * 100, 100)
  const ptsAway = needed - t.creditScore

  return (
    <Page>
        <SectionTitle mb="1.25rem">Government Tenders</SectionTitle>

        <LockedBanner>
          <LockIcon><Lock size={24} /></LockIcon>
          <ProgressBar>
            <ProgressLabel>
              <p style={{ fontSize: '14px', fontWeight: '500', color: theme.colors.earth[800] }}>You need a score of 800 to access government tenders</p>
              <p style={{ fontSize: '13px', color: theme.colors.earth[500] }}>{t.creditScore} / {needed}</p>
            </ProgressLabel>
            <ProgressTrack><ProgressFill pct={pct} /></ProgressTrack>
            <p style={{ fontSize: '12px', color: theme.colors.earth[500], marginTop: '6px' }}>
              You are <strong style={{ color: theme.colors.earth[800] }}>{ptsAway} points away</strong>. Keep accepting payments via KoraPay to grow your score.
            </p>
          </ProgressBar>
        </LockedBanner>

        <div style={{ background: '#E6F8FF', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle size={18} color={theme.colors.earth[800]} />
          <div>
            <p style={{ fontSize: '13px', fontWeight: '500', color: theme.colors.earth[800] }}>Your Agora ID is already accepted on the FG Procurement Portal</p>
            <p style={{ fontSize: '12px', color: theme.colors.earth[500] }}>Once your score reaches 800, you can register and bid on contracts immediately — no extra paperwork needed.</p>
          </div>
        </div>

        <Grid>
          {tenders.map(tender => (
            <TenderCard key={tender.id} locked={tender.locked} delay={`${tender.id * 0.07}s`}>
              <TenderHeader>
                <TenderTop>
                  <TenderIcon>{tender.icon}</TenderIcon>
                  <Badge variant="locked"><Lock size={10} /> Score {tender.minScore}+</Badge>
                </TenderTop>
                <TenderName>{tender.name}</TenderName>
                <TenderAgency>{tender.agency}</TenderAgency>
              </TenderHeader>
              <TenderBody>
                <TenderValue>{tender.value}</TenderValue>
                <TenderSub>Contract value range</TenderSub>
                <TenderMeta>
                  <TenderMetaRow><FileText size={12} /> Category: {tender.category}</TenderMetaRow>
                  <TenderMetaRow><Clock size={12} /> Closes: {tender.deadline}</TenderMetaRow>
                </TenderMeta>
                <Button variant="outline" fullWidth disabled>
                  <Lock size={13} /> Unlock at score 800
                </Button>
              </TenderBody>
            </TenderCard>
          ))}
        </Grid>

        <Card delay="0.35s" style={{ marginTop: '1rem' }}>
          <SectionTitle>How government tenders work on Agora</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
            {[
              { n: '1', title: 'Reach score 800', desc: 'Transact consistently via KoraPay. You are only 58 points away from unlocking all tender opportunities.' },
              { n: '2', title: 'Browse & apply', desc: 'Filter tenders by category, value, and deadline. Your Agora ID is submitted automatically with every application.' },
              { n: '3', title: 'Win contracts', desc: 'Successful bids are disbursed through KoraPay. Every contract payment further boosts your credit score.' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#E6F8FF', color: theme.colors.earth[800], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600', flexShrink: 0 }}>{s.n}</div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: theme.colors.earth[800], marginBottom: '4px' }}>{s.title}</p>
                  <p style={{ fontSize: '13px', color: theme.colors.earth[500], lineHeight: '1.6' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Page>
    )
}
