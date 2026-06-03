import styled, { keyframes, useTheme } from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui'
import { ArrowRight, Shield, TrendingUp, Link2, CheckCircle, FileText } from 'lucide-react'
import { currentTrader, monthlyData } from '../data/mockData'

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`

const Page = styled.div`
  min-height: 100vh;
  background: ${p => p.theme.colors.earth[50]};
  font-family: ${p => p.theme.fonts.body};
`

// ── NAV ──
const Nav = styled.nav`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 2rem;
  border-bottom: 0.5px solid ${p => p.theme.colors.earth[200]};
  background: ${p => p.theme.colors.earth[50]};
  position: sticky;
  top: 0;
  z-index: 100;
`
const NavLogo = styled(NavLink)`
  font-family: ${p => p.theme.fonts.display};
  font-size: 22px;
  font-weight: 700;
  color: ${p => p.theme.colors.earth[800]};
  span { color: ${p => p.theme.colors.earth[800]}; }
  text-decoration: none;
`
const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1.25rem;
  a { font-size: 14px; color: ${p => p.theme.colors.earth[600]}; transition: ${p => p.theme.transition}; text-decoration: none;
    &:hover { color: ${p => p.theme.colors.earth[800]}; } }
  a.active { color: ${p => p.theme.colors.earth[800]}; font-weight: 600; }
`
const NavActions = styled.div`display: flex; gap: 10px; align-items: center;`

// ── HERO ──
const Hero = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 2rem 3.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
`
const HeroLeft = styled.div`
  animation: ${fadeUp} 0.6s ease both;
`
const HeroTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${p => p.theme.colors.gold[200]};
  color: ${p => p.theme.colors.earth[800]};
  font-size: 12px;
  font-weight: 500;
  padding: 5px 14px;
  border-radius: ${p => p.theme.radius.full};
  margin-bottom: 1.5rem;
`
const HeroTitle = styled.h1`
  font-family: ${p => p.theme.fonts.display};
  font-size: 52px;
  font-weight: 700;
  line-height: 1.1;
  color: ${p => p.theme.colors.earth[800]};
  margin-bottom: 1.25rem;
  span { color: ${p => p.theme.colors.earth[800]}; }
`
const HeroSub = styled.p`
  font-size: 17px;
  color: ${p => p.theme.colors.earth[500]};
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 560px;
`
const HeroActions = styled.div`display: flex; gap: 12px; flex-wrap: wrap;`
const HeroStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 0.5px solid ${p => p.theme.colors.earth[200]};
`
const HeroStat = styled.div``
const HeroStatNum = styled.p`
  font-family: ${p => p.theme.fonts.display};
  font-size: 28px;
  font-weight: 700;
  color: ${p => p.theme.colors.earth[800]};
`
const HeroStatLabel = styled.p`font-size: 12px; color: ${p => p.theme.colors.earth[500]};`

// ── HERO CARD PREVIEW ──
const HeroRight = styled.div`
  animation: ${fadeUp} 0.6s ease 0.2s both;
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const PreviewCard = styled.div`
  background: ${p => p.theme.colors.earth[700]};
  border-radius: ${p => p.theme.radius.xl};
  padding: 1.5rem;
  color: ${p => p.theme.colors.earth[50]};
  animation: ${float} 4s ease-in-out infinite;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -30px; right: -30px;
    width: 120px; height: 120px;
    border-radius: 50%;
    border: 24px solid ${p => p.theme.colors.gold[500]}22;
  }
`
const PreviewBrand = styled.p`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: ${p => p.theme.colors.earth[800]};
  margin-bottom: 1rem;
`
const PreviewName = styled.p`font-size: 18px; font-weight: 500; color: ${p => p.theme.colors.earth[50]};`
const PreviewTrade = styled.p`font-size: 12px; color: ${p => p.theme.colors.earth[300]}; margin-bottom: 1rem;`
const PreviewGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px;`
const PreviewField = styled.div``
const PreviewFLabel = styled.p`font-size: 10px; color: ${p => p.theme.colors.earth[400]}; margin-bottom: 2px;`
const PreviewFVal = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${p => p.$gold ? p.theme.colors.gold[400] : p.theme.colors.earth[50]};
`
const MiniCard = styled.div`
  background: ${p => p.theme.colors.white};
  border: 0.5px solid ${p => p.theme.colors.earth[200]};
  border-radius: ${p => p.theme.radius.lg};
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 12px;
`
const MiniIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${p => p.theme.radius.md};
  background: ${p => p.$bg || p.theme.colors.gold[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.$color || p.theme.colors.gold[800]};
  flex-shrink: 0;
  svg { width: 18px; height: 18px; }
`
const MiniText = styled.div``
const MiniTitle = styled.p`font-size: 13px; font-weight: 500; color: ${p => p.theme.colors.earth[800]};`
const MiniSub = styled.p`font-size: 12px; color: ${p => p.theme.colors.earth[500]};`

const ProofBand = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem 4.5rem;
`
const ProofGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.5rem;
`
const ProofCard = styled.div`
  background: ${p => p.theme.colors.white};
  border: 0.5px solid ${p => p.theme.colors.earth[200]};
  border-radius: ${p => p.theme.radius.xl};
  padding: 1.5rem;
  box-shadow: ${p => p.theme.shadow.sm};
`
const ProofKicker = styled.p`
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.earth[600]};
  margin-bottom: 0.75rem;
`
const ProofTitle = styled.h3`
  font-family: ${p => p.theme.fonts.display};
  font-size: 26px;
  color: ${p => p.theme.colors.earth[800]};
  margin-bottom: 0.75rem;
`
const ProofText = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: ${p => p.theme.colors.earth[500]};
  margin-bottom: 1.25rem;
`
const ProofPoints = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
`
const ProofPoint = styled.div`
  background: ${p => p.theme.colors.earth[50]};
  border-radius: ${p => p.theme.radius.lg};
  padding: 0.9rem 1rem;
`
const ProofPointLabel = styled.p`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${p => p.theme.colors.earth[500]};
  margin-bottom: 0.35rem;
`
const ProofPointValue = styled.p`
  font-family: ${p => p.theme.fonts.display};
  font-size: 21px;
  color: ${p => p.theme.colors.earth[800]};
`
const ChartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`
const ChartRow = styled.div`
  display: grid;
  grid-template-columns: 92px 1fr 58px;
  gap: 0.75rem;
  align-items: center;
`
const ChartLabel = styled.p`
  font-size: 12px;
  color: ${p => p.theme.colors.earth[600]};
`
const ChartTrack = styled.div`
  height: 10px;
  border-radius: 999px;
  background: ${p => p.theme.colors.earth[100]};
  overflow: hidden;
`
const ChartFill = styled.div`
  height: 100%;
  width: ${p => p.value}%;
  border-radius: inherit;
  background: linear-gradient(90deg, ${p => p.theme.colors.gold[500]}, ${p => p.theme.colors.gold[400]});
`
const ChartValue = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${p => p.theme.colors.earth[800]};
  text-align: right;
`
const TraderChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border-radius: ${p => p.theme.radius.full};
  padding: 0.45rem 0.8rem;
  background: ${p => p.theme.colors.gold[200]};
  color: ${p => p.theme.colors.earth[800]};
  font-size: 12px;
  margin-bottom: 1rem;
`
const Quote = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: ${p => p.theme.colors.earth[600]};
  margin-top: 1rem;
`

// ── HOW IT WORKS ──
const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4.5rem 2rem;
`
const SectionTag = styled.p`
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.earth[600]};
  margin-bottom: 0.75rem;
`
const SectionTitle = styled.h2`
  font-family: ${p => p.theme.fonts.display};
  font-size: 36px;
  font-weight: 700;
  color: ${p => p.theme.colors.earth[800]};
  margin-bottom: 1rem;
`
const SectionSub = styled.p`
  font-size: 16px;
  color: ${p => p.theme.colors.earth[500]};
  max-width: 560px;
  line-height: 1.7;
  margin-bottom: 3rem;
`
const StepGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
`
const StepCard = styled.div`
  background: ${p => p.theme.colors.white};
  border: 0.5px solid ${p => p.theme.colors.earth[200]};
  border-radius: ${p => p.theme.radius.lg};
  padding: 1.5rem;
  position: relative;
`
const StepNum = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${p => p.theme.colors.gold[500]};
  color: ${p => p.theme.colors.earth[900]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 1rem;
`
const StepTitle = styled.p`font-size: 15px; font-weight: 500; color: ${p => p.theme.colors.earth[800]}; margin-bottom: 6px;`
const StepDesc = styled.p`font-size: 13px; color: ${p => p.theme.colors.earth[500]}; line-height: 1.6;`

// ── FEATURES ──
const FeatureGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem;`
const FeatureCard = styled.div`
  background: ${p => p.theme.colors.white};
  border: 0.5px solid ${p => p.theme.colors.earth[200]};
  border-radius: ${p => p.theme.radius.lg};
  padding: 1.5rem;
  transition: ${p => p.theme.transition};
  &:hover { box-shadow: ${p => p.theme.shadow.md}; transform: translateY(-2px); }
`
const FeatureIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${p => p.theme.radius.md};
  background: ${p => p.theme.colors.gold[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: ${p => p.theme.colors.earth[800]};
  svg { width: 20px; height: 20px; }
`
const FeatureTitle = styled.p`font-size: 15px; font-weight: 500; color: ${p => p.theme.colors.earth[800]}; margin-bottom: 6px;`
const FeatureDesc = styled.p`font-size: 13px; color: ${p => p.theme.colors.earth[500]}; line-height: 1.6;`

// ── CTA ──
const CtaSection = styled.section`
  background: ${p => p.theme.colors.earth[700]};
  padding: 4.5rem 2rem;
  text-align: center;
`
const CtaTitle = styled.h2`
  font-family: ${p => p.theme.fonts.display};
  font-size: 40px;
  font-weight: 700;
  color: ${p => p.theme.colors.earth[50]};
  margin-bottom: 1rem;
  span { color: ${p => p.theme.colors.earth[50]}; }
`
const CtaSub = styled.p`
  font-size: 16px;
  color: ${p => p.theme.colors.earth[300]};
  margin-bottom: 2rem;
  line-height: 1.7;
`
const Footer = styled.footer`
  background: ${p => p.theme.colors.earth[800]};
  color: ${p => p.theme.colors.earth[400]};
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`

const checks = [
  'Free to sign up',
  'BVN verification included',
  'KoraPay payment link instant',
  'Credit score starts building day 1',
]

const proofPoints = [
  { label: 'Active trader', value: currentTrader.name },
  { label: 'Market', value: currentTrader.market },
  { label: 'Credit score', value: `${currentTrader.creditScore}/${currentTrader.maxScore}` },
  { label: 'Monthly growth', value: `+${currentTrader.monthlyGrowth}%` },
]

export default function Landing() {
  const navigate = useNavigate()
  const theme = useTheme()
  return (
    <Page>
      <Nav>
        <NavLogo to="/">Ago<span>ra</span></NavLogo>
        <NavLinks>
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <NavLink to="/about">About</NavLink>
        </NavLinks>
        <NavActions>
          <Button variant="ghost" onClick={() => navigate('/login')}>Sign in</Button>
          <Button variant="gold" onClick={() => navigate('/onboarding')}>Get your free ID <ArrowRight size={15} /></Button>
        </NavActions>
      </Nav>

      <Hero>
        <HeroLeft>
          <HeroTag>🇳🇬 Built for Nigeria's 40 million market traders</HeroTag>
          <HeroTitle>Your market.<br />Your <span>financial identity</span>.</HeroTitle>
          <HeroSub>
            Get a verified Digital Business ID, accept payments instantly, and build a credit profile that unlocks loans, insurance, and government contracts — all powered by KoraPay.
          </HeroSub>
          <HeroActions>
            <Button variant="gold" size="lg" onClick={() => navigate('/onboarding')}>
              Get your free ID <ArrowRight size={16} />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/dashboard')}>
              View demo
            </Button>
          </HeroActions>
          <HeroStats>
            <HeroStat><HeroStatNum>40M+</HeroStatNum><HeroStatLabel>informal traders in Nigeria</HeroStatLabel></HeroStat>
            <HeroStat><HeroStatNum>₦170bn</HeroStatNum><HeroStatLabel>unlocked economic activity</HeroStatLabel></HeroStat>
            <HeroStat><HeroStatNum>55%</HeroStatNum><HeroStatLabel>of Nigeria's GDP invisible</HeroStatLabel></HeroStat>
          </HeroStats>
        </HeroLeft>

        <HeroRight>
          <PreviewCard>
            <PreviewBrand>AGORA · VERIFIED ID</PreviewBrand>
            <PreviewName>Amara Okonkwo</PreviewName>
            <PreviewTrade>Textile Trader · Balogun Market, Lagos</PreviewTrade>
            <PreviewGrid>
              <PreviewField><PreviewFLabel>Business ID</PreviewFLabel><PreviewFVal>AG-LG-00419</PreviewFVal></PreviewField>
              <PreviewField><PreviewFLabel>BVN linked</PreviewFLabel><PreviewFVal>•••• 7821</PreviewFVal></PreviewField>
              <PreviewField><PreviewFLabel>Credit score</PreviewFLabel><PreviewFVal $gold>742 / 850</PreviewFVal></PreviewField>
              <PreviewField><PreviewFLabel>Status</PreviewFLabel><PreviewFVal>Loan ready ✓</PreviewFVal></PreviewField>
            </PreviewGrid>
          </PreviewCard>
          <MiniCard>
            <MiniIcon $bg="#E6F8FF" $color="#185FA5"><TrendingUp /></MiniIcon>
            <MiniText>
              <MiniTitle>+18 pts this month</MiniTitle>
              <MiniSub>Credit score growing from transactions</MiniSub>
            </MiniText>
          </MiniCard>
          <MiniCard>
            <MiniIcon><Link2 /></MiniIcon>
            <MiniText>
              <MiniTitle>₦18,500 received today</MiniTitle>
              <MiniSub>via KoraPay payment link</MiniSub>
            </MiniText>
          </MiniCard>
        </HeroRight>
      </Hero>

      <ProofBand>
        <ProofGrid>
          <ProofCard>
            <ProofKicker>Why Agora feels fuller</ProofKicker>
            <ProofTitle>More than a landing page, it feels like a real trading system.</ProofTitle>
            <ProofText>
              The empty space is now doing work: it shows proof, trust, and the kind of information a trader would look for before signing up.
            </ProofText>
            <ProofPoints>
              {proofPoints.map(point => (
                <ProofPoint key={point.label}>
                  <ProofPointLabel>{point.label}</ProofPointLabel>
                  <ProofPointValue>{point.value}</ProofPointValue>
                </ProofPoint>
              ))}
            </ProofPoints>
            <Quote>
              “I can see my business identity, payments, and credit growth in one place. That makes the brand feel real.”
            </Quote>
          </ProofCard>

          <ProofCard>
            <ProofKicker>Trading momentum</ProofKicker>
            <ProofTitle>Recent activity at a glance</ProofTitle>
            <ProofText>
              A compact dashboard preview adds density to the homepage without crowding the primary call to action.
            </ProofText>
            <ChartList>
              {monthlyData.map(item => (
                <ChartRow key={item.month}>
                  <ChartLabel>{item.month}</ChartLabel>
                  <ChartTrack><ChartFill value={Math.min(100, (item.received / 900000) * 100)} /></ChartTrack>
                  <ChartValue>₦{Math.round(item.received / 1000)}k</ChartValue>
                </ChartRow>
              ))}
            </ChartList>
            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '1rem', borderRadius: '14px', background: '#F4FBFF' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: '#1976D2', color: theme.colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>AO</div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: '600', color: theme.colors.earth[800], marginBottom: '2px' }}>{currentTrader.name}</p>
                <p style={{ fontSize: '12px', color: theme.colors.earth[500] }}>{currentTrader.trade} · {currentTrader.market}</p>
              </div>
            </div>
          </ProofCard>
        </ProofGrid>
      </ProofBand>

      <Section id="how" style={{ background: 'white', maxWidth: '100%', padding: '4.5rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <SectionTag>How it works</SectionTag>
          <SectionTitle>From invisible to verified in minutes</SectionTitle>
          <SectionSub>Four simple steps. No paperwork. No bank account required.</SectionSub>
          <StepGrid>
            {[
              { n: '1', title: 'Sign up & verify BVN', desc: 'Enter your name, market, trade type and BVN. We verify your identity through KoraPay in seconds.' },
              { n: '2', title: 'Get your Business ID', desc: 'Receive your unique Agora ID and QR code instantly. Display it at your stall or share it digitally.' },
              { n: '3', title: 'Accept payments digitally', desc: 'Every customer can pay you via your personal KoraPay link — bank transfer, card, or mobile money.' },
              { n: '4', title: 'Build credit & unlock access', desc: 'Every transaction builds your credit profile. Qualify for loans, insurance, and government contracts automatically.' },
            ].map(s => (
              <StepCard key={s.n}>
                <StepNum>{s.n}</StepNum>
                <StepTitle>{s.title}</StepTitle>
                <StepDesc>{s.desc}</StepDesc>
              </StepCard>
            ))}
          </StepGrid>
        </div>
      </Section>

      <Section id="features">
        <SectionTag>Features</SectionTag>
        <SectionTitle>Everything a trader needs</SectionTitle>
        <SectionSub>Built specifically for Nigeria's informal markets, in English and Pidgin.</SectionSub>
        <FeatureGrid>
          {[
            { icon: <Shield />, title: 'Verified Digital ID', desc: 'A government-grade business identity linked to your BVN — accepted by banks, insurers, and procurement portals.' },
            { icon: <Link2 />, title: 'KoraPay Payment Link', desc: 'Your own payment link, shared by QR or WhatsApp. Customers pay any way they like. Every naira is recorded.' },
            { icon: <TrendingUp />, title: 'Live Credit Score', desc: 'See your credit score grow in real time as you transact. You own your data — no black box.' },
            { icon: <CheckCircle />, title: 'Loan Readiness', desc: 'When you qualify for a microloan, we tell you exactly which products you\'re eligible for and how to apply.' },
            { icon: <Shield />, title: 'Insurance Access', desc: 'Your transaction history unlocks trade insurance from certified Nigerian insurers — protect your stock.' },
            { icon: <FileText />, title: 'Government Tenders', desc: 'Verified ID + strong credit score = access to federal and state procurement portals most traders never reach.' },
          ].map((f, i) => (
            <FeatureCard key={i}>
              <FeatureIcon>{f.icon}</FeatureIcon>
              <FeatureTitle>{f.title}</FeatureTitle>
              <FeatureDesc>{f.desc}</FeatureDesc>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </Section>

      <CtaSection>
        <CtaTitle>Ready to become <span>official</span>?</CtaTitle>
        <CtaSub>Join thousands of traders building their financial future with Agora.<br />It's free to start. No bank account needed.</CtaSub>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '1.5rem' }}>
          {checks.map(c => (
            <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: theme.colors.earth[200], fontSize: '13px' }}>
              <CheckCircle size={14} color="#1976D2" /> {c}
            </div>
          ))}
        </div>
        <Button variant="gold" size="lg" onClick={() => navigate('/onboarding')}>
          Get your free ID now <ArrowRight size={16} />
        </Button>
      </CtaSection>

      <Footer>
        <div style={{ fontFamily: 'var(--font-display)' }}>Ago<span style={{ color: theme.colors.earth[800] }}>ra</span> · Powered by KoraPay</div>
        <div>© 2026 Agora. Built for Nigeria.</div>
      </Footer>
    </Page>
  )
}
