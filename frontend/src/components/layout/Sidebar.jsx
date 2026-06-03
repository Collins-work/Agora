import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import { currentTrader } from '../../data/mockData'
import { Avatar } from '../ui'
import {
  LayoutDashboard, CreditCard, Link2, BarChart2,
  Building2, FileText, Shield, Settings, LogOut, TrendingUp
} from 'lucide-react'

const Wrap = styled.aside`
  width: 220px;
  min-width: 220px;
  background: ${p => p.theme.colors.earth[700]};
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem 1rem;
  min-height: 100vh;
  position: sticky;
  top: 0;
`

const Logo = styled(NavLink)`
  font-family: ${p => p.theme.fonts.display};
  font-size: 20px;
  font-weight: 700;
  color: ${p => p.theme.colors.earth[50]};
  margin-bottom: 2rem;
  padding: 0 0.5rem;
  span { color: ${p => p.theme.colors.earth[50]}; }
  text-decoration: none;
`

const NavSection = styled.p`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: ${p => p.theme.colors.earth[400]};
  text-transform: uppercase;
  margin: 1.2rem 0 0.4rem 0.5rem;
`

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: ${p => p.theme.radius.md};
  font-size: 13px;
  color: ${p => p.theme.colors.earth[300]};
  transition: ${p => p.theme.transition};
  margin-bottom: 2px;
  text-decoration: none;

  &:hover {
    background: rgba(255,255,255,0.08);
    color: ${p => p.theme.colors.earth[50]};
  }
  &.active {
    background: ${p => p.theme.colors.gold[500]};
    color: ${p => p.theme.colors.earth[900]};
    font-weight: 500;
  }
  svg { width: 17px; height: 17px; flex-shrink: 0; }
`

const Spacer = styled.div`flex: 1;`

const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 8px;
  border-radius: ${p => p.theme.radius.md};
  border-top: 0.5px solid ${p => p.theme.colors.earth[600]};
  padding-top: 12px;
  margin-top: 8px;
`
const UserName = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${p => p.theme.colors.earth[50]};
`
const UserId = styled.p`
  font-size: 11px;
  color: ${p => p.theme.colors.earth[400]};
`
const LogOutBtn = styled.button`
  margin-left: auto;
  color: ${p => p.theme.colors.earth[400]};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: ${p => p.theme.transition};
  &:hover { color: ${p => p.theme.colors.earth[50]}; }
  svg { width: 16px; height: 16px; }
`

export default function Sidebar() {
  const navigate = useNavigate()
  return (
    <Wrap>
      <Logo to="/">Ago<span>ra</span></Logo>

      <NavItem to="/dashboard"><LayoutDashboard /> Dashboard</NavItem>
      <NavItem to="/id-card"><CreditCard /> My ID Card</NavItem>
      <NavItem to="/payment-link"><Link2 /> Payment Link</NavItem>
      <NavItem to="/transactions"><BarChart2 /> Transactions</NavItem>

      <NavSection>Opportunities</NavSection>
      <NavItem to="/opportunities"><TrendingUp /> Opportunities</NavItem>
      <NavItem to="/loans"><Building2 /> Loans</NavItem>
      <NavItem to="/tenders"><FileText /> Tenders</NavItem>
      <NavItem to="/insurance"><Shield /> Insurance</NavItem>

      <NavSection>Account</NavSection>
      <NavItem to="/settings"><Settings /> Settings</NavItem>

      <Spacer />

      <UserRow>
        <Avatar size="32px" fontSize="12px">{currentTrader.initials}</Avatar>
        <div>
          <UserName>{currentTrader.name.split(' ')[0]}</UserName>
          <UserId>{currentTrader.id}</UserId>
        </div>
        <LogOutBtn onClick={() => navigate('/')}><LogOut /></LogOutBtn>
      </UserRow>
    </Wrap>
  )
}
