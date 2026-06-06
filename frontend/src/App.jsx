import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { GlobalStyle } from './styles/GlobalStyle'

import Landing from './pages/Landing'
import About from './pages/About'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import IdCard from './pages/IdCard'
import PaymentLink from './pages/PaymentLink'
import VirtualAccount from './pages/VirtualAccount'
import Transactions from './pages/Transactions'
import Opportunities from './pages/Opportunities'
import Loans from './pages/Loans'
import Tenders from './pages/Tenders'
import Insurance from './pages/Insurance'
import Settings from './pages/Settings'
import AppLayout from './components/layout/AppLayout'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/id-card" element={<IdCard />} />
            <Route path="/payment-link" element={<PaymentLink />} />
            <Route path="/virtual-account" element={<VirtualAccount />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}
