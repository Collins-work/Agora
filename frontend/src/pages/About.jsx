import styled from 'styled-components'
import { useTheme } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Banknote, ShieldCheck, Sparkles, Users, Target, History } from 'lucide-react'
import { Button } from '../components/ui'

const Page = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(212,168,83,0.14), transparent 28%),
    radial-gradient(circle at top right, rgba(90,62,27,0.14), transparent 30%),
    ${p => p.theme.colors.earth[50]};
  color: ${p => p.theme.colors.earth[800]};
  font-family: ${p => p.theme.fonts.body};
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 0.5px solid ${p => p.theme.colors.earth[200]};
  background: rgba(253, 246, 236, 0.92);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 50;
  @media (max-width: 900px) {
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 1rem 1rem;
    justify-content: center;
  }
`

const Logo = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  font-family: ${p => p.theme.fonts.display};
  font-size: 22px;
  font-weight: 700;
  color: ${p => p.theme.colors.earth[800]};
  span { color: ${p => p.theme.colors.earth[800]}; }
`

const Hero = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4.5rem 2rem 3rem;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2rem;
  align-items: center;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 3rem 1rem 2.5rem;
  }
`

const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: ${p => p.theme.colors.gold[200]};
  color: ${p => p.theme.colors.earth[800]};
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 1.25rem;
`

const Title = styled.h1`
  font-family: ${p => p.theme.fonts.display};
  font-size: clamp(44px, 6vw, 72px);
  line-height: 0.95;
  margin-bottom: 1rem;
  max-width: 11ch;
  span { color: ${p => p.theme.colors.earth[800]}; }
`

const Intro = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: ${p => p.theme.colors.earth[600]};
  max-width: 640px;
  margin-bottom: 1.75rem;
`

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

const StoryCard = styled.div`
  background: ${p => p.theme.colors.earth[700]};
  color: ${p => p.theme.colors.earth[50]};
  border-radius: 24px;
  padding: 1.75rem;
  position: relative;
  overflow: hidden;
  box-shadow: ${p => p.theme.shadow.lg};
  &::after {
    content: '';
    position: absolute;
    top: -40px;
    right: -40px;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 24px solid ${p => p.theme.colors.gold[500]}1f;
  }
`

const StoryLabel = styled.p`
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.earth[800]};
  margin-bottom: 0.75rem;
`

const StoryText = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: ${p => p.theme.colors.earth[200]};
  margin-bottom: 1rem;
`

const StatRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem 3rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const Stat = styled.div`
  background: ${p => p.theme.colors.white};
  border: 0.5px solid ${p => p.theme.colors.earth[200]};
  border-radius: 18px;
  padding: 1.25rem;
  box-shadow: ${p => p.theme.shadow.sm};
`

const StatNumber = styled.p`
  font-family: ${p => p.theme.fonts.display};
  font-size: 30px;
  font-weight: 700;
  color: ${p => p.theme.colors.earth[800]};
  margin-bottom: 0.35rem;
`

const StatLabel = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: ${p => p.theme.colors.earth[500]};
`

const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem 3rem;
`

const SectionTitle = styled.h2`
  font-family: ${p => p.theme.fonts.display};
  font-size: 34px;
  margin-bottom: 1rem;
  color: ${p => p.theme.colors.earth[800]};
`

const SectionSub = styled.p`
  font-size: 16px;
  line-height: 1.75;
  color: ${p => p.theme.colors.earth[500]};
  max-width: 760px;
  margin-bottom: 1.5rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: ${p => p.theme.colors.white};
  border: 0.5px solid ${p => p.theme.colors.earth[200]};
  border-radius: 18px;
  padding: 1.25rem;
`

const IconWrap = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: ${p => p.theme.colors.gold[200]};
  color: ${p => p.theme.colors.earth[800]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`

const CardTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${p => p.theme.colors.earth[800]};
  margin-bottom: 0.5rem;
`

const CardText = styled.p`
  font-size: 13px;
  line-height: 1.7;
  color: ${p => p.theme.colors.earth[500]};
`

const Timeline = styled.div`
  display: grid;
  gap: 0.85rem;
`

const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 1rem;
  align-items: start;
  background: ${p => p.theme.colors.white};
  border: 0.5px solid ${p => p.theme.colors.earth[200]};
  border-radius: 18px;
  padding: 1rem 1.1rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const Time = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: ${p => p.theme.colors.earth[600]};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const FooterCta = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem 4.5rem;
`

const FooterBox = styled.div`
  background: linear-gradient(135deg, ${p => p.theme.colors.earth[700]}, ${p => p.theme.colors.earth[600]});
  color: ${p => p.theme.colors.earth[50]};
  border-radius: 24px;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
`

const footerPoints = [
  { icon: <BadgeCheck size={18} />, title: 'Trusted identity', text: 'A business ID traders can actually use in the real world.' },
  { icon: <Banknote size={18} />, title: 'Payment rails', text: 'Accept money instantly and keep the trail of every transaction.' },
  { icon: <ShieldCheck size={18} />, title: 'Built for trust', text: 'Credit, insurance, and tenders flow from verified activity.' },
]

export default function About() {
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <Page>
      <Nav>
        <Logo onClick={() => navigate('/')}>Ago<span>ra</span></Logo>
        <div />
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Button variant="ghost" onClick={() => navigate('/login')}>Sign in</Button>
          <Button variant="gold" onClick={() => navigate('/onboarding')}>Get your free ID <ArrowRight size={15} /></Button>
        </div>
      </Nav>

      <Hero>
        <div>
          <Eyebrow><Sparkles size={14} /> Why Agora exists</Eyebrow>
          <Title>Built from a simple idea: every trader deserves to be seen.</Title>
          <Intro>
            Agora was created to give informal traders a verified digital identity, a payment link, and a path into formal financial services without forcing them through paperwork they were never designed to carry.
          </Intro>
          <Actions>
            <Button variant="gold" size="lg" onClick={() => navigate('/onboarding')}>Start with Agora <ArrowRight size={16} /></Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/')}>Back home</Button>
          </Actions>
        </div>

        <StoryCard>
          <StoryLabel>The spark</StoryLabel>
          <StoryText>
            The idea came from watching traders in busy Nigerian markets do everything right for their businesses and still remain invisible to banks, insurers, and procurement systems.
          </StoryText>
          <StoryText>
            Agora turns those daily transactions into proof: a business identity, a credit profile, and a financial footprint that can unlock loans, insurance, and government opportunities.
          </StoryText>
          <StoryText>
            The goal is not to replace the trader’s business. It is to make the business legible to the systems that decide who gets access.
          </StoryText>
        </StoryCard>
      </Hero>

      <StatRow>
        <Stat>
          <StatNumber>40M+</StatNumber>
          <StatLabel>informal traders in Nigeria who need a clear path into formal finance</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>1 ID</StatNumber>
          <StatLabel>A single verified business identity that can travel across payments and opportunity</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>0 paperwork</StatNumber>
          <StatLabel>The experience we aimed for: simple, fast, and accessible from day one</StatLabel>
        </Stat>
      </StatRow>

      <Section>
        <SectionTitle>What Agora does</SectionTitle>
        <SectionSub>
          Agora brings together digital identity, payment acceptance, and credit visibility in one place so a trader can start small and grow into formal systems over time.
        </SectionSub>
        <Grid>
          {[
            { icon: <Users size={18} />, title: 'Identity', text: 'Create a verified trader profile that can be shared anywhere.' },
            { icon: <Target size={18} />, title: 'Access', text: 'Open the door to loans, insurance, and public procurement.' },
            { icon: <History size={18} />, title: 'Growth', text: 'Turn real trade activity into a visible credit journey.' },
          ].map(item => (
            <Card key={item.title}>
              <IconWrap>{item.icon}</IconWrap>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.text}</CardText>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionTitle>How the idea took shape</SectionTitle>
        <SectionSub>
          Agora was shaped around a few practical truths: people trust what they can verify, businesses grow when payments are easy, and financial access follows data that is consistent over time.
        </SectionSub>
        <Timeline>
          <TimelineItem>
            <Time>01</Time>
            <div>
              <CardTitle>Observation</CardTitle>
              <CardText>Traders needed a way to prove who they are and what they do without starting from a bank branch or a stack of forms.</CardText>
            </div>
          </TimelineItem>
          <TimelineItem>
            <Time>02</Time>
            <div>
              <CardTitle>Design</CardTitle>
              <CardText>We focused on one clean flow: sign up, verify identity, receive a business ID, accept payments, and build trust from activity.</CardText>
            </div>
          </TimelineItem>
          <TimelineItem>
            <Time>03</Time>
            <div>
              <CardTitle>Outcome</CardTitle>
              <CardText>Agora makes the trader visible to systems that can fund, insure, and support them while staying easy to use on a phone.</CardText>
            </div>
          </TimelineItem>
        </Timeline>
      </Section>

      <FooterCta>
        <FooterBox>
          <div>
            <SectionTitle style={{ marginBottom: '0.5rem', color: theme.colors.earth[50] }}>Ready to see Agora in action?</SectionTitle>
            <SectionSub style={{ marginBottom: 0, color: theme.colors.earth[200] }}>
              Start the onboarding flow and get a verified business identity in minutes.
            </SectionSub>
          </div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {footerPoints.map(point => (
              <div key={point.title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ marginTop: '2px', color: theme.colors.earth[800] }}>{point.icon}</div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>{point.title}</p>
                  <p style={{ fontSize: '12px', color: theme.colors.earth[200], lineHeight: 1.6 }}>{point.text}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="gold" size="lg" onClick={() => navigate('/onboarding')}>Get started <ArrowRight size={16} /></Button>
        </FooterBox>
      </FooterCta>
    </Page>
  )
}
