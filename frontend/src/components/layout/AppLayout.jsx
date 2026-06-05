import { useState } from 'react'
import styled from 'styled-components'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Shell = styled.div`
  display: flex;
  min-height: 100vh;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`
const Main = styled.main`
  flex: 1;
  min-width: 0;
  background: ${p => p.theme.colors.earth[50]};
  overflow-y: auto;
  position: relative;
`
const Header = styled.header`
  display: none;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 0.5px solid ${p => p.theme.colors.earth[200]};
  background: ${p => p.theme.colors.white};
  position: sticky;
  top: 0;
  z-index: 60;

  @media (max-width: 900px) {
    display: flex;
  }
`
const Title = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${p => p.theme.colors.earth[800]};
`
const MenuButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: ${p => p.theme.radius.md};
  border: 1px solid ${p => p.theme.colors.earth[200]};
  background: ${p => p.theme.colors.white};
  color: ${p => p.theme.colors.earth[800]};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const Overlay = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: ${p => p.open ? 'block' : 'none'};
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 34, 0.35);
    z-index: 50;
  }
`

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Shell>
      <Overlay open={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Main>
        <Header>
          <Title>Agora</Title>
          <MenuButton onClick={() => setSidebarOpen(prev => !prev)} aria-label="Toggle navigation menu">
            <Menu size={18} />
          </MenuButton>
        </Header>
        <Outlet />
      </Main>
    </Shell>
  )
}
