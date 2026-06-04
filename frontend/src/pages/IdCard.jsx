import styled, { keyframes } from 'styled-components'
import { useTheme } from 'styled-components'
import { Button, Card, SectionTitle } from '../components/ui'
import { currentTrader } from '../data/mockData'
import { Download, Share2, Copy, CheckCircle } from 'lucide-react'
import { useState } from 'react'

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}`

const Page = styled.div`padding:1.75rem 2rem;max-width:900px;`

const Grid = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start;`

const BigCard = styled.div`
  background:${p => p.theme.colors.earth[800]};
  border-radius:20px;
  padding:2rem;
  color:${p => p.theme.colors.earth[50]};
  position:relative;overflow:hidden;
  animation:${float} 5s ease-in-out infinite;
  box-shadow:${p => p.theme.shadow.lg};
  &::before{content:'';position:absolute;top:-40px;right:-40px;width:180px;height:180px;border-radius:50%;border:36px solid ${p => p.theme.colors.gold[500]}18;}
  &::after{content:'';position:absolute;bottom:-50px;left:-30px;width:160px;height:160px;border-radius:50%;border:30px solid ${p => p.theme.colors.gold[500]}10;}
`
const CardBrand = styled.p`font-size:11px;font-weight:600;letter-spacing:0.12em;margin-bottom:1.5rem;`
const CardAvatar = styled.div`
  width:60px;height:60px;border-radius:50%;
  background:${p => p.theme.colors.gold[500]};
  display:flex;align-items:center;justify-content:center;
  font-size:22px;font-weight:700;color:${p => p.theme.colors.earth[900]};
  margin-bottom:12px;border:3px solid ${p => p.theme.colors.gold[300]};
`
const CardName = styled.p`font-size:20px;font-weight:500;margin-bottom:4px;`
const CardTrade = styled.p`font-size:13px;color:${p => p.theme.colors.earth[300]};margin-bottom:1.5rem;`
const CardDivider = styled.hr`border:none;border-top:0.5px solid rgba(255,255,255,0.15);margin:1rem 0;`
const CardGrid = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:12px;`
const CardField = styled.div``
const CFL = styled.p`font-size:10px;color:${p => p.theme.colors.earth[400]};margin-bottom:3px;letter-spacing:0.05em;`
const CFV = styled.p`font-size:13px;font-weight:500;color:${p => p.theme.colors.earth[50]};`
const CardFooter = styled.div`display:flex;align-items:flex-end;justify-content:space-between;margin-top:1.5rem;`
const QrBox = styled.div`
  width:56px;height:56px;background:white;border-radius:8px;
  display:flex;align-items:center;justify-content:center;font-size:28px;
`
const VerifiedPill = styled.div`
  display:inline-flex;align-items:center;gap:5px;
  background:rgba(25,118,210,0.12);color:#39A2DB;
  font-size:11px;padding:5px 12px;border-radius:20px;
`

const RightPanel = styled.div`display:flex;flex-direction:column;gap:1rem;`

const InfoRow = styled.div`display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:0.5px solid ${p => p.theme.colors.earth[100]};&:last-child{border:none;}`
const InfoLabel = styled.p`font-size:13px;color:${p => p.theme.colors.earth[500]};`
const InfoVal = styled.p`font-size:13px;font-weight:500;color:${p => p.theme.colors.earth[800]};`

const LinkBox = styled.div`
  background:${p => p.theme.colors.earth[50]};
  border:1px solid ${p => p.theme.colors.earth[200]};
  border-radius:${p => p.theme.radius.md};
  padding:10px 14px;
  display:flex;align-items:center;justify-content:space-between;
  gap:10px;
`
const LinkText = styled.p`
  font-family:${p => p.theme.fonts.mono};
  font-size:12px;color:${p => p.theme.colors.earth[600]};
  flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
`
const CopyBtn = styled.button`
  display:flex;align-items:center;gap:5px;font-size:12px;font-weight:500;
  color:${p => p.copied ? p.theme.colors.earth[800] : p.theme.colors.earth[600]};
  background:none;border:none;cursor:pointer;flex-shrink:0;white-space:nowrap;
  transition:${p => p.theme.transition};
`

const ScoreBar = styled.div`margin-top:6px;`
const ScoreBg = styled.div`height:8px;background:${p => p.theme.colors.earth[100]};border-radius:4px;`
const ScoreFill = styled.div`height:8px;border-radius:4px;background:${p => p.theme.colors.gold[500]};width:${p => p.pct}%;`
const ScoreTicks = styled.div`display:flex;justify-content:space-between;margin-top:4px;`
const ScoreTick = styled.p`font-size:10px;color:${p => p.theme.colors.earth[400]};`

const t = currentTrader

export default function IdCardPage() {
  const [copied, setCopied] = useState(false)
  const theme = useTheme()

  const copy = () => {
    navigator.clipboard.writeText(t.id).catch(() => { })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Page>
      <SectionTitle mb="1.5rem">My Business ID Card</SectionTitle>

      <Grid>
        <div>
          <BigCard>
            <CardBrand>AGORA · BUSINESS IDENTITY</CardBrand>
            <CardAvatar>{t.initials}</CardAvatar>
            <CardName>{t.name}</CardName>
            <CardTrade>{t.trade} · {t.market}, {t.state}</CardTrade>
            <CardDivider />
            <CardGrid>
              <CardField><CFL>BUSINESS ID</CFL><CFV>{t.id}</CFV></CardField>
              <CardField><CFL>MEMBER SINCE</CFL><CFV>{t.memberSince}</CFV></CardField>
              <CardField><CFL>BVN LINKED</CFL><CFV>{t.bvn}</CFV></CardField>
              <CardField><CFL>CREDIT SCORE</CFL><CFV gold>{t.creditScore} / {t.maxScore}</CFV></CardField>
            </CardGrid>
            <CardFooter>
              <div>
                <p style={{ fontSize: '10px', color: theme.colors.earth[500], marginBottom: '4px' }}>Powered by</p>
                <p style={{ fontSize: '13px', fontWeight: '500', color: theme.colors.earth[800] }}>KoraPay</p>
              </div>
              <VerifiedPill><CheckCircle size={12} /> BVN Verified</VerifiedPill>
              <QrBox>⊞</QrBox>
            </CardFooter>
          </BigCard>

          <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
            <Button variant="outline" style={{ flex: 1 }}>
              <Share2 size={15} /> Share ID
            </Button>
            <Button variant="gold" style={{ flex: 1 }}>
              <Download size={15} /> Download
            </Button>
          </div>
        </div>

        <RightPanel>
          <Card delay="0.1s">
            <SectionTitle>ID details</SectionTitle>
            {[
              ['Full name', t.name],
              ['Business ID', t.id],
              ['Trade type', t.trade],
              ['Market', t.market],
              ['State', t.state],
              ['Phone', t.phone],
              ['BVN status', '✓ Verified'],
              ['Member since', t.memberSince],
            ].map(([label, val]) => (
              <InfoRow key={label}>
                <InfoLabel>{label}</InfoLabel>
                <InfoVal style={val.startsWith('✓') ? { color: theme.colors.earth[800] } : {}}>{val}</InfoVal>
              </InfoRow>
            ))}
          </Card>

          <Card delay="0.15s">
            <SectionTitle>Credit score</SectionTitle>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: '700', color: theme.colors.earth[800] }}>{t.creditScore}</p>
              <p style={{ fontSize: '14px', color: theme.colors.earth[500] }}>/ {t.maxScore}</p>
              <span style={{ marginLeft: 'auto', background: theme.colors.green[100], color: theme.colors.earth[800], fontSize: '11px', padding: '3px 10px', borderRadius: '20px', fontWeight: '500' }}>Good standing</span>
            </div>
            <ScoreBar>
              <ScoreBg><ScoreFill pct={(t.creditScore / t.maxScore) * 100} /></ScoreBg>
              <ScoreTicks>
                <ScoreTick>0</ScoreTick>
                <ScoreTick>Poor</ScoreTick>
                <ScoreTick>Fair</ScoreTick>
                <ScoreTick>Good</ScoreTick>
                <ScoreTick>850</ScoreTick>
              </ScoreTicks>
            </ScoreBar>
            <p style={{ fontSize: '12px', color: theme.colors.earth[500], marginTop: '10px', lineHeight: '1.6' }}>Your score grows every time a customer pays you through your KoraPay link. Keep transacting to unlock more.</p>
          </Card>

          <Card delay="0.2s">
            <SectionTitle>Share your ID</SectionTitle>
            <p style={{ fontSize: '13px', color: theme.colors.earth[500], marginBottom: '10px' }}>Copy your Business ID to share with banks, suppliers, or government portals.</p>
            <LinkBox>
              <LinkText>{t.id}</LinkText>
              <CopyBtn copied={copied} onClick={copy}>
                {copied ? <><CheckCircle size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
              </CopyBtn>
            </LinkBox>
          </Card>
        </RightPanel>
      </Grid>
    </Page>
  )
}
