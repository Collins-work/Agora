import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Button, Card, SectionTitle, Input, Label, FormGroup } from '../components/ui'
import { currentTrader, transactions } from '../data/mockData'
import { Copy, CheckCircle, Share2, QrCode, ArrowDownLeft, ExternalLink, Zap, ChevronLeft } from 'lucide-react'

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
const Grid = styled.div`
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:1.5rem;
  @media (max-width: 900px) {
    grid-template-columns:1fr;
  }
`

const LinkCard = styled(Card)`
  background:${p => p.theme.colors.earth[800]};
  border:none;
  color:${p => p.theme.colors.earth[50]};
`
const LinkLabel = styled.p`font-size:12px;color:${p => p.theme.colors.earth[400]};margin-bottom:6px;`
const LinkUrl = styled.div`
  background:rgba(255,255,255,0.08);border-radius:8px;
  padding:10px 14px;font-family:${p => p.theme.fonts.mono};
  font-size:12px;color:${p => p.theme.colors.earth[500]};
  word-break:break-all;margin-bottom:14px;border:0.5px solid rgba(255,255,255,0.1);
`
const Actions = styled.div`display:flex;gap:8px;flex-wrap:wrap;`
const ActionBtn = styled.button`
  display:flex;align-items:center;gap:6px;
  padding:8px 14px;border-radius:8px;font-size:13px;font-weight:500;
  cursor:pointer;transition:${p => p.theme.transition};border:1px solid rgba(255,255,255,0.2);
  color:${p => p.theme.colors.earth[50]};background:rgba(255,255,255,0.08);
  &:hover{background:rgba(255,255,255,0.15);}
  svg{width:14px;height:14px;}
`
const GoldBtn = styled(ActionBtn)`
  background:${p => p.theme.colors.gold[500]};color:${p => p.theme.colors.earth[900]};
  border-color:${p => p.theme.colors.gold[500]};font-weight:600;
  &:hover{background:${p => p.theme.colors.gold[400]};}
`

const StatsRow = styled.div`
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:10px;
  margin-top:1rem;
  @media (max-width: 700px) {
    grid-template-columns:1fr;
  }
`
const StatBox = styled.div`
  background:rgba(255,255,255,0.06);border-radius:8px;padding:10px 12px;
  border:0.5px solid rgba(255,255,255,0.1);
`
const StatVal = styled.p`font-size:20px;font-weight:500;color:${p => p.theme.colors.earth[50]};font-family:${p => p.theme.fonts.display};`
const StatLbl = styled.p`font-size:11px;color:${p => p.theme.colors.earth[400]};margin-top:2px;`

const QrFrame = styled.div`
  width:140px;height:140px;background:white;border-radius:12px;
  display:flex;align-items:center;justify-content:center;margin:1rem auto;
  font-size:80px;border:3px solid ${p => p.theme.colors.gold[300]};
`

const TxnRow = styled.div`
  display:flex;align-items:center;justify-content:space-between;
  padding:10px 0;border-bottom:0.5px solid ${p => p.theme.colors.earth[100]};
  &:last-child{border:none;}
`
const TxnLeft = styled.div`display:flex;align-items:center;gap:10px;`
const TxnIcon = styled.div`
  width:32px;height:32px;border-radius:8px;background:${p => p.theme.colors.green[100]};
  color:${p => p.theme.colors.earth[800]};display:flex;align-items:center;justify-content:center;
  svg{width:15px;height:15px;}
`
const TxnName = styled.p`font-size:13px;font-weight:500;color:${p => p.theme.colors.earth[800]};`
const TxnDate = styled.p`font-size:11px;color:${p => p.theme.colors.earth[400]};`
const TxnAmt = styled.p`font-size:13px;font-weight:500;color:${p => p.theme.colors.earth[800]};`

const RequestForm = styled.div`
  background:${p => p.theme.colors.earth[50]};
  border:1px solid ${p => p.theme.colors.earth[200]};
  border-radius:${p => p.theme.radius.lg};padding:1.25rem;
`

const t = currentTrader
const inbound = transactions.filter(tx => tx.type === 'in' && tx.method === 'KoraPay')
const fmt = n => '₦' + n.toLocaleString()

export default function PaymentLink() {
  const navigate = useNavigate()
  const theme = useTheme()
  const [copied, setCopied] = useState(false)
  const [amount, setAmount] = useState('')
  const [desc, setDesc] = useState('')
  const [generated, setGenerated] = useState(null)

  const copy = () => {
    navigator.clipboard.writeText(t.paymentLink).catch(() => { })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateLink = () => {
    if (amount) setGenerated(`${t.paymentLink}?amount=${amount}&desc=${encodeURIComponent(desc)}`)
  }

  const totalViaKora = inbound.reduce((s, tx) => s + tx.amount, 0)

  return (
    <Page>
        <BackBtn onClick={() => navigate('/dashboard')}><ChevronLeft size={14} /> Back to dashboard</BackBtn>
        <SectionTitle mb="1.25rem">Payment Link</SectionTitle>
        <Grid>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <LinkCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(25,118,210,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={16} color="#1976D2" />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500' }}>Your KoraPay payment link</p>
                  <p style={{ fontSize: '11px', color: theme.colors.earth[500] }}>Share with any customer to receive payment</p>
                </div>
              </div>
              <LinkLabel>Payment link</LinkLabel>
              <LinkUrl>{t.paymentLink}</LinkUrl>
              <Actions>
                <GoldBtn onClick={copy}>
                  {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy link'}
                </GoldBtn>
                <ActionBtn><Share2 size={14} /> Share</ActionBtn>
                <ActionBtn><ExternalLink size={14} /> Open</ActionBtn>
              </Actions>
              <StatsRow>
                <StatBox><StatVal>{inbound.length}</StatVal><StatLbl>Payments received</StatLbl></StatBox>
                <StatBox><StatVal>₦{(totalViaKora / 1000).toFixed(0)}k</StatVal><StatLbl>Via this link</StatLbl></StatBox>
                <StatBox><StatVal>+{t.scoreGrowth}</StatVal><StatLbl>Credit pts earned</StatLbl></StatBox>
              </StatsRow>
            </LinkCard>

            <Card delay="0.1s">
              <SectionTitle>QR code</SectionTitle>
              <p style={{ fontSize: '13px', color: theme.colors.earth[500], textAlign: 'center' }}>Let customers scan to pay instantly — no typing needed</p>
              <QrFrame>⊞</QrFrame>
              <Button variant="outline" fullWidth>
                <Download size={15} /> Download QR code
              </Button>
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card delay="0.05s">
              <SectionTitle>Generate a custom link</SectionTitle>
              <p style={{ fontSize: '13px', color: theme.colors.earth[500], marginBottom: '1rem' }}>Create a link for a specific amount — great for invoices and orders.</p>
              <FormGroup>
                <Label>Amount (₦)</Label>
                <Input placeholder="e.g. 25000" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Description (optional)</Label>
                <Input placeholder="e.g. 2 yards ankara fabric" value={desc} onChange={e => setDesc(e.target.value)} />
              </FormGroup>
              <Button variant="gold" fullWidth onClick={generateLink}>Generate link</Button>
              {generated && (
                <div style={{ marginTop: '10px', background: '#E6F8FF', borderRadius: '8px', padding: '10px 12px' }}>
                  <p style={{ fontSize: '11px', color: theme.colors.earth[800], fontWeight: '500', marginBottom: '4px' }}>✓ Custom link ready</p>
                  <p style={{ fontFamily: 'monospace', fontSize: '11px', color: theme.colors.earth[800], wordBreak: 'break-all' }}>{generated}</p>
                </div>
              )}
            </Card>

            <Card delay="0.15s">
              <SectionTitle>KoraPay payments received</SectionTitle>
              {inbound.slice(0, 5).map(tx => (
                <TxnRow key={tx.id}>
                  <TxnLeft>
                    <TxnIcon><ArrowDownLeft /></TxnIcon>
                    <div>
                      <TxnName>{tx.name}</TxnName>
                      <TxnDate>{tx.date}</TxnDate>
                    </div>
                  </TxnLeft>
                  <TxnAmt>+{fmt(tx.amount)}</TxnAmt>
                </TxnRow>
              ))}
            </Card>
          </div>
        </Grid>
      </Page>
    )
}

function Download({ size }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7,10 12,15 17,10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
}
