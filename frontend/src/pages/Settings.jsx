import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import AppLayout from '../components/layout/AppLayout'
import { Card, SectionTitle, Button, Input, Label, FormGroup, Avatar, Divider } from '../components/ui'
import { currentTrader } from '../data/mockData'
import { User, Shield, Bell, Link2, CheckCircle } from 'lucide-react'

const Page = styled.div`padding:1.75rem 2rem;max-width:820px;`
const Grid = styled.div`display:grid;grid-template-columns:200px 1fr;gap:1.5rem;align-items:start;`
const TabList = styled.div`display:flex;flex-direction:column;gap:4px;`
const Tab = styled.button`
  display:flex;align-items:center;gap:10px;padding:10px 12px;
  border-radius:${p => p.theme.radius.md};font-size:14px;cursor:pointer;
  transition:${p => p.theme.transition};border:none;text-align:left;width:100%;
  background:${p => p.active ? p.theme.colors.gold[200] : 'transparent'};
  color:${p => p.active ? p.theme.colors.gold[900] : p.theme.colors.earth[600]};
  font-weight:${p => p.active ? '500' : '400'};
  svg{width:16px;height:16px;}
  &:hover{background:${p => p.theme.colors.earth[100]};}
`
const Toggle = styled.button`
  width:44px;height:24px;border-radius:12px;border:none;cursor:pointer;
  transition:${p => p.theme.transition};
  background:${p => p.on ? p.theme.colors.gold[500] : p.theme.colors.earth[200]};
  position:relative;
  &::after{
    content:'';position:absolute;top:3px;
    left:${p => p.on ? '22px' : '3px'};
    width:18px;height:18px;border-radius:50%;background:white;
    transition:${p => p.theme.transition};
  }
`
const ToggleRow = styled.div`
  display:flex;align-items:center;justify-content:space-between;
  padding:12px 0;border-bottom:0.5px solid ${p => p.theme.colors.earth[100]};
  &:last-child{border:none;}
`
const ToggleLabel = styled.p`font-size:14px;font-weight:500;color:${p => p.theme.colors.earth[800]};`
const ToggleSub = styled.p`font-size:12px;color:${p => p.theme.colors.earth[400]};margin-top:2px;`

const t = currentTrader
const TABS = [
  { id: 'profile', label: 'Profile', icon: <User /> },
  { id: 'security', label: 'Security', icon: <Shield /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell /> },
  { id: 'integrations', label: 'KoraPay', icon: <Link2 /> },
]

export default function Settings() {
  const theme = useTheme()
  const [tab, setTab] = useState('profile')
  const [saved, setSaved] = useState(false)
  const [notifs, setNotifs] = useState({ payment: true, score: true, opportunities: false, weekly: true })

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <AppLayout>
      <Page>
        <SectionTitle mb="1.5rem">Settings</SectionTitle>
        <Grid>
          <Card p="0.75rem">
            <TabList>
              {TABS.map(tb => (
                <Tab key={tb.id} active={tab === tb.id} onClick={() => setTab(tb.id)}>
                  {tb.icon} {tb.label}
                </Tab>
              ))}
            </TabList>
          </Card>

          <div>
            {tab === 'profile' && (
              <Card delay="0s">
                <SectionTitle>Profile details</SectionTitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', background: '#F4FBFF', borderRadius: '10px' }}>
                  <Avatar size="56px" fontSize="20px">{t.initials}</Avatar>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '500', color: theme.colors.earth[800] }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: theme.colors.earth[500] }}>{t.id} · Member since {t.memberSince}</p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#E6F8FF', color: theme.colors.earth[800], fontSize: '11px', padding: '3px 9px', borderRadius: '20px', marginTop: '4px' }}>
                      <CheckCircle size={11} /> BVN Verified
                    </div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <FormGroup><Label>First name</Label><Input defaultValue="Amara" /></FormGroup>
                  <FormGroup><Label>Last name</Label><Input defaultValue="Okonkwo" /></FormGroup>
                </div>
                <FormGroup><Label>Phone number</Label><Input defaultValue="080••••••34" disabled /></FormGroup>
                <FormGroup><Label>Email address</Label><Input defaultValue="amara@example.com" /></FormGroup>
                <FormGroup><Label>Market</Label><Input defaultValue="Balogun Market, Lagos" disabled /></FormGroup>
                <FormGroup><Label>Trade type</Label><Input defaultValue="Textile Trader" /></FormGroup>
                <Button variant="gold" onClick={save}>
                  {saved ? <><CheckCircle size={14} /> Saved!</> : 'Save changes'}
                </Button>
              </Card>
            )}

            {tab === 'security' && (
              <Card delay="0s">
                <SectionTitle>Security</SectionTitle>
                <p style={{ fontSize: '13px', color: theme.colors.earth[500], marginBottom: '1.25rem' }}>Manage your PIN and verification settings.</p>
                <FormGroup><Label>Current PIN</Label><Input type="password" placeholder="••••••" /></FormGroup>
                <FormGroup><Label>New PIN</Label><Input type="password" placeholder="••••••" /></FormGroup>
                <FormGroup><Label>Confirm new PIN</Label><Input type="password" placeholder="••••••" /></FormGroup>
                <Button variant="gold" onClick={save}>Update PIN</Button>
                <Divider my="1.5rem" />
                <SectionTitle>BVN status</SectionTitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#E6F8FF', borderRadius: '10px', padding: '1rem' }}>
                  <CheckCircle size={20} color={theme.colors.earth[800]} />
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '500', color: theme.colors.earth[800] }}>BVN verified · {t.bvn}</p>
                    <p style={{ fontSize: '12px', color: theme.colors.earth[500] }}>Verified via KoraPay on {t.memberSince}</p>
                  </div>
                </div>
              </Card>
            )}

            {tab === 'notifications' && (
              <Card delay="0s">
                <SectionTitle>Notification preferences</SectionTitle>
                {[
                  { key: 'payment', label: 'Payment received', sub: 'Get notified when a customer pays you via KoraPay' },
                  { key: 'score', label: 'Credit score update', sub: 'When your score changes, up or down' },
                  { key: 'opportunities', label: 'New opportunities', sub: 'Loans, grants, or tenders you newly qualify for' },
                  { key: 'weekly', label: 'Weekly summary', sub: 'Your weekly earnings and score report via SMS' },
                ].map(n => (
                  <ToggleRow key={n.key}>
                    <div>
                      <ToggleLabel>{n.label}</ToggleLabel>
                      <ToggleSub>{n.sub}</ToggleSub>
                    </div>
                    <Toggle on={notifs[n.key]} onClick={() => setNotifs(prev => ({ ...prev, [n.key]: !prev[n.key] }))} />
                  </ToggleRow>
                ))}
              </Card>
            )}

            {tab === 'integrations' && (
              <Card delay="0s">
                <SectionTitle>KoraPay integration</SectionTitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#E6F8FF', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem' }}>
                  <CheckCircle size={20} color={theme.colors.earth[800]} />
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '500', color: theme.colors.earth[800] }}>KoraPay account connected</p>
                    <p style={{ fontSize: '12px', color: theme.colors.earth[500] }}>All payments are being tracked and scored</p>
                  </div>
                </div>
                <FormGroup><Label>Payment link</Label><Input value={t.paymentLink} readOnly /></FormGroup>
                <FormGroup><Label>KoraPay reference ID</Label><Input value="KP-NG-AO-0041922" readOnly /></FormGroup>
                <p style={{ fontSize: '13px', color: theme.colors.earth[500], lineHeight: '1.6', marginBottom: '1rem' }}>Your KoraPay account is the engine behind your Agora credit profile. Every payment received through your link automatically updates your score.</p>
                <Button variant="outline">Disconnect KoraPay</Button>
              </Card>
            )}
          </div>
        </Grid>
      </Page>
    </AppLayout>
  )
}
