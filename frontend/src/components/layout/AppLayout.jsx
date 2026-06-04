import styled from 'styled-components'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Shell = styled.div`
  display: flex;
  min-height: 100vh;
`
const Main = styled.main`
  flex: 1;
  min-width: 0;
  background: ${p => p.theme.colors.earth[50]};
  overflow-y: auto;
`

export default function AppLayout() {
  return (
    <Shell>
      <Sidebar />
      <Main><Outlet /></Main>
    </Shell>
  )
}
