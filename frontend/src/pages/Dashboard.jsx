import styled, { useTheme } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import AppLayout from '../components/layout/AppLayout'
import { Card, MetricCard, MetricLabel, MetricValue, MetricSub, SectionTitle, Badge, Avatar, fadeUp } from '../components/ui'
import { currentTrader, scoreFactors, transactions, opportunities, monthlyData } from '../data/mockData'
import { TrendingUp, ArrowDownLeft, ArrowUpRight, Bell, ChevronRight, Zap } from 'lucide-react'
import styled2 from 'styled-components'

const Page = styled.div`
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 1100px;
`

const TopBar = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`
const Greeting = styled.h1`
  font-family: ${p => p.theme.fonts.display};
  font-size: 22px;
  font-weight: 600;
  color: ${p => p.theme.colors.earth[800]};
`
const Sub = styled.p`font-size: 13px; color: ${p => p.theme.colors.earth[500]}; margin-top: 2px;`
const TopRight = styled.div`display:flex;align-items:center;gap:10px;`
const NotifBtn = styled.button`
  width:36px;height:36px;border-radius:${p => p.theme.radius.md};
  border:0.5px solid ${p => p.theme.colors.earth[200]};
  background:white;display:flex;align-items:center;justify-content:center;
  color:${p => p.theme.colors.earth[600]};cursor:pointer;
  transition:${p => p.theme.transition};
  &:hover{background:${p => p.theme.colors.earth[100]};}
`

const MetricsGrid = styled.div`display:grid;grid-template-columns:repeat(4,1fr);gap:12px;`

const MidGrid = styled.div`display:grid;grid-template-columns:1fr 300px;gap:1.25rem;`

const BottomGrid = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;`

// Score ring
const RingWrap = styled.div`display:flex;align-items:center;gap:1.25rem;margin-bottom:1.25rem;`
const Ring = styled.svg`width:88px;height:88px;flex-shrink:0;`
const RingText = styled.div``
const RingNum = styled.p`font-family:${p => p.theme.fonts.display};font-size:28px;font-weight:700;color:${p => p.theme.colors.earth[800]};line-height:1;`
const RingLabel = styled.p`font-size:11px;color:${p => p.theme.colors.earth[400]};margin-top:2px;`
const RingStatus = styled.p`font-size:14px;font-weight:500;color:${p => p.theme.colors.earth[700]};margin-top:4px;`
const LoanBadge = styled.div`
  display:inline-flex;align-items:center;gap:5px;
  background:${p => p.theme.colors.green[100]};color:${p => p.theme.colors.earth[800]};
  font-size:11px;font-weight:500;padding:4px 10px;border-radius:${p => p.theme.radius.full};margin-top:6px;
`

const FactorRow = styled.div`display:flex;align-items:center;gap:8px;margin-bottom:8px;`
const FactorLabel = styled.p`font-size:12px;color:${p => p.theme.colors.earth[600]};width:120px;flex-shrink:0;`
const FactorBg = styled.div`flex:1;height:6px;background:${p => p.theme.colors.earth[100]};border-radius:3px;`
const FactorFill = styled.div`height:6px;border-radius:3px;background:${p => p.fill};width:${p => p.pct}%;`
const FactorPct = styled.p`font-size:11px;color:${p => p.theme.colors.earth[400]};width:28px;text-align:right;`

// ID Card mini
const IdCard = styled.div`
  background:${p => p.theme.colors.earth[700]};
  border-radius:${p => p.theme.radius.lg};
  padding:1.25rem;
  color:${p => p.theme.colors.earth[50]};
  position:relative;overflow:hidden;cursor:pointer;
  transition:${p => p.theme.transition};
  &:hover{transform:translateY(-2px);box-shadow:${p => p.theme.shadow.lg};}
  &::before{content:'';position:absolute;top:-20px;right:-20px;width:100px;height:100px;border-radius:50%;border:20px solid ${p => p.theme.colors.gold[500]}18;}
`
const IdBrand = styled.p`font-size:10px;font-weight:600;letter-spacing:0.1em;color:${p => p.theme.colors.earth[800]};margin-bottom:10px;`
const IdAvatar = styled.div`
  width:38px;height:38px;border-radius:50%;background:${p => p.theme.colors.gold[500]};
  display:flex;align-items:center;justify-content:center;
  font-size:14px;font-weight:600;color:${p => p.theme.colors.earth[900]};margin-bottom:8px;
`
const IdName = styled.p`font-size:15px;font-weight:500;`
const IdTrade = styled.p`font-size:11px;color:${p => p.theme.colors.earth[300]};margin-bottom:10px;`
const IdDivider = styled.hr`border:none;border-top:0.5px solid rgba(255,255,255,0.12);margin:8px 0;`
const IdGrid = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:8px;`
const IdFLabel = styled.p`font-size:10px;color:${p => p.theme.colors.earth[400]};margin-bottom:2px;`
const IdFVal = styled.p`font-size:12px;font-weight:500;color:${p => p.gold ? p.theme.colors.earth[800] : p.theme.colors.earth[50]};`
const IdFooter = styled.div`display:flex;align-items:center;justify-content:space-between;margin-top:10px;`
const IdQr = styled.div`
  width:32px;height:32px;background:white;border-radius:5px;
  display:flex;align-items:center;justify-content:center;font-size:18px;
`

// Transactions
const TxnRow = styled.div`
  display:flex;align-items:center;justify-content:space-between;
  padding:9px 0;border-bottom:0.5px solid ${p => p.theme.colors.earth[100]};
  &:last-child{border:none;}
`
const TxnLeft = styled.div`display:flex;align-items:center;gap:10px;`
const TxnIcon = styled.div`
  width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;
  background:${p => p.type === 'in' ? p.theme.colors.green[100] : p.theme.colors.red[100]};
  color:${p => p.theme.colors.earth[800]};
  svg{width:15px;height:15px;}
`
const TxnName = styled.p`font-size:13px;font-weight:500;color:${p => p.theme.colors.earth[800]};`
const TxnDate = styled.p`font-size:11px;color:${p => p.theme.colors.earth[400]};`
const TxnAmt = styled.p`
  font-size:13px;font-weight:500;
  color:${p => p.theme.colors.earth[800]};
`

// Opportunities
const OppCard = styled.div`
  display:flex;align-items:center;gap:10px;
  padding:10px 12px;border:0.5px solid ${p => p.theme.colors.earth[200]};
  border-radius:${p => p.theme.radius.md};background:white;margin-bottom:8px;
  transition:${p => p.theme.transition};cursor:pointer;
  &:hover{border-color:${p => p.theme.colors.gold[500]};transform:translateX(3px);}
`
const OppIcon = styled.div`
  width:32px;height:32px;border-radius:8px;
  background:${p => p.theme.colors.gold[200]};color:${p => p.theme.colors.earth[800]};
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
  svg{width:16px;height:16px;}
`
const OppName = styled.p`font-size:13px;font-weight:500;color:${p => p.theme.colors.earth[800]};`
const OppSub = styled.p`font-size:11px;color:${p => p.theme.colors.earth[400]};`

const fmt = n => '₦' + n.toLocaleString()
const CIRCUMFERENCE = 2 * Math.PI * 34

export default function Dashboard() {
  const navigate = useNavigate()
  const theme = useTheme()
  const t = currentTrader
  const offset = CIRCUMFERENCE - (t.creditScore / t.maxScore) * CIRCUMFERENCE

  return (
    <AppLayout>
      <Page>
        <TopBar>
          <div>
            <Greeting>Good morning, {t.name.split(' ')[0]} 👋</Greeting>
            <Sub>Friday, 30 May 2026 &nbsp;·&nbsp; {t.market}</Sub>
          </div>
          <TopRight>
            <NotifBtn><Bell size={17} /></NotifBtn>
            <Avatar size="36px" fontSize="13px">{t.initials}</Avatar>
          </TopRight>
        </TopBar>

        <MetricsGrid>
          {[
            { label: 'Total received', value: fmt(t.totalReceived), sub: `+${t.monthlyGrowth}% this month`, up: true },
            { label: 'Credit score', value: t.creditScore, sub: `+${t.scoreGrowth} pts this month`, up: true },
            { label: 'Transactions', value: t.totalTransactions, sub: 'This month', up: false },
            { label: 'Unique customers', value: t.uniqueCustomers, sub: `+${t.newCustomers} new buyers`, up: true },
          ].map((m, i) => (
            <MetricCard key={i} delay={`${i * 0.08}s`}>
              <MetricLabel>{m.label}</MetricLabel>
              <MetricValue>{m.value}</MetricValue>
              <MetricSub up={m.up}>{m.up ? '↑ ' : ''}{m.sub}</MetricSub>
            </MetricCard>
          ))}
        </MetricsGrid>

        <MidGrid>
          <Card delay="0.1s">
            <SectionTitle>Credit profile</SectionTitle>
            <RingWrap>
              <Ring viewBox="0 0 88 88">
                <circle cx="44" cy="44" r="34" fill="none" stroke="#E6F2FA" strokeWidth="8" />
                <circle cx="44" cy="44" r="34" fill="none" stroke="#1976D2" strokeWidth="8"
                  strokeDasharray={CIRCUMFERENCE} strokeDashoffset={offset}
                  strokeLinecap="round" transform="rotate(-90 44 44)" />
              </Ring>
              <RingText>
                <RingNum>{t.creditScore}</RingNum>
                <RingLabel>out of {t.maxScore}</RingLabel>
                <RingStatus>{t.status}</RingStatus>
                <LoanBadge>✓ Loan ready up to ₦250,000</LoanBadge>
              </RingText>
            </RingWrap>
            {scoreFactors.map(f => (
              <FactorRow key={f.label}>
                <FactorLabel>{f.label}</FactorLabel>
                <FactorBg><FactorFill pct={f.pct} fill={f.color} /></FactorBg>
                <FactorPct>{f.pct}%</FactorPct>
              </FactorRow>
            ))}
            <div style={{ marginTop: '1rem' }}>
              <ResponsiveContainer width="100%" height={80}>
                <AreaChart data={monthlyData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1976D2" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1976D2" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={v => [`₦${v.toLocaleString()}`, 'Received']} contentStyle={{ fontSize: '12px', borderRadius: '8px', border: '0.5px solid #E6F2FA' }} />
                  <Area type="monotone" dataKey="received" stroke="#1976D2" strokeWidth={2} fill="url(#grad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <IdCard onClick={() => navigate('/id-card')}>
              <IdBrand>AGORA · VERIFIED ID</IdBrand>
              <IdAvatar>{t.initials}</IdAvatar>
              <IdName>{t.name}</IdName>
              <IdTrade>{t.trade} · {t.market}</IdTrade>
              <IdDivider />
              <IdGrid>
                <div><IdFLabel>Business ID</IdFLabel><IdFVal>{t.id}</IdFVal></div>
                <div><IdFLabel>BVN linked</IdFLabel><IdFVal>{t.bvn}</IdFVal></div>
                <div><IdFLabel>Member since</IdFLabel><IdFVal>{t.memberSince}</IdFVal></div>
                <div><IdFLabel>Credit score</IdFLabel><IdFVal gold>{t.creditScore} / {t.maxScore}</IdFVal></div>
              </IdGrid>
              <IdFooter>
                <div style={{ fontSize: '10px', color: theme.colors.earth[500] }}>Powered by <span style={{ color: theme.colors.earth[800] }}>KoraPay</span></div>
                <IdQr>⊞</IdQr>
              </IdFooter>
            </IdCard>

            <Card p="1rem" delay="0.15s" style={{ cursor: 'pointer' }} onClick={() => navigate('/payment-link')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EAF8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={16} color="#185FA5" />
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: '500', color: theme.colors.earth[800] }}>Your payment link</p>
                  <p style={{ fontSize: '11px', color: theme.colors.earth[500] }}>Share to receive payments instantly</p>
                </div>
                <ChevronRight size={15} style={{ marginLeft: 'auto', color: theme.colors.earth[500] }} />
              </div>
              <div style={{ background: '#F4FBFF', borderRadius: '8px', padding: '8px 10px', fontFamily: 'monospace', fontSize: '11px', color: theme.colors.earth[800], wordBreak: 'break-all' }}>
                pay.korapay.com/mp/amara-okonkwo
              </div>
            </Card>
          </div>
        </MidGrid>

        <BottomGrid>
          <Card delay="0.2s">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <SectionTitle mb="0">Recent transactions</SectionTitle>
              <span style={{ fontSize: '12px', color: theme.colors.earth[800], cursor: 'pointer', fontWeight: '500' }} onClick={() => navigate('/transactions')}>View all →</span>
            </div>
            {transactions.slice(0, 5).map(tx => (
              <TxnRow key={tx.id}>
                <TxnLeft>
                  <TxnIcon type={tx.type}>{tx.type === 'in' ? <ArrowDownLeft /> : <ArrowUpRight />}</TxnIcon>
                  <div>
                    <TxnName>{tx.name}</TxnName>
                    <TxnDate>{tx.date} {tx.method === 'KoraPay' ? '· via KoraPay' : ''}</TxnDate>
                  </div>
                </TxnLeft>
                <TxnAmt type={tx.type}>{tx.type === 'in' ? '+' : '-'}{fmt(tx.amount)}</TxnAmt>
              </TxnRow>
            ))}
          </Card>

          <Card delay="0.25s">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <SectionTitle mb="0">Opportunities unlocked</SectionTitle>
              <span style={{ fontSize: '12px', color: theme.colors.earth[800], cursor: 'pointer', fontWeight: '500' }} onClick={() => navigate('/opportunities')}>View all →</span>
            </div>
            {opportunities.map(o => (
              <OppCard key={o.id} onClick={() => navigate('/opportunities')}>
                <OppIcon><TrendingUp /></OppIcon>
                <div style={{ flex: 1 }}>
                  <OppName>{o.title}</OppName>
                  <OppSub>{o.provider} · {o.sub}</OppSub>
                </div>
                <Badge variant={o.status === 'ready' ? 'success' : o.status === 'soon' ? 'warning' : 'locked'}>
                  {o.status === 'ready' ? 'Ready' : o.status === 'soon' ? `${o.ptsAway} pts away` : `${o.scoreNeeded}+ needed`}
                </Badge>
              </OppCard>
            ))}
          </Card>
        </BottomGrid>
      </Page>
    </AppLayout>
  )
}
