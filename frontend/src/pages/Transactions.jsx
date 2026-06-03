import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import AppLayout from '../components/layout/AppLayout'
import { Card, SectionTitle, Badge, Input } from '../components/ui'
import { transactions, monthlyData } from '../data/mockData'
import { ArrowDownLeft, ArrowUpRight, Search, Filter } from 'lucide-react'

const Page = styled.div`padding:1.75rem 2rem;max-width:1000px;`
const TopRow = styled.div`display:grid;grid-template-columns:1fr 320px;gap:1.25rem;margin-bottom:1.25rem;`

const FilterBar = styled.div`
  display:flex;align-items:center;gap:10px;margin-bottom:1rem;flex-wrap:wrap;
`
const FilterBtn = styled.button`
  padding:6px 14px;border-radius:${p => p.theme.radius.full};
  font-size:13px;font-weight:500;cursor:pointer;
  transition:${p => p.theme.transition};border:1px solid;
  border-color:${p => p.active ? p.theme.colors.gold[500] : p.theme.colors.earth[200]};
  background:${p => p.active ? p.theme.colors.gold[500] : 'white'};
  color:${p => p.active ? p.theme.colors.earth[900] : p.theme.colors.earth[600]};
  &:hover{border-color:${p => p.theme.colors.gold[500]};}
`
const SearchWrap = styled.div`position:relative;margin-bottom:1rem;`
const SearchIcon = styled.div`position:absolute;left:12px;top:50%;transform:translateY(-50%);color:${p => p.theme.colors.earth[400]};`
const SearchInput = styled(Input)`padding-left:36px;`

const TxnTable = styled.div``
const TxnRow = styled.div`
  display:flex;align-items:center;justify-content:space-between;
  padding:12px 0;border-bottom:0.5px solid ${p => p.theme.colors.earth[100]};
  &:last-child{border:none;}
  transition:${p => p.theme.transition};
  &:hover{background:${p => p.theme.colors.earth[50]};margin:0 -1rem;padding:12px 1rem;border-radius:8px;}
`
const TxnLeft = styled.div`display:flex;align-items:center;gap:12px;`
const TxnIcon = styled.div`
  width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;
  background:${p => p.type === 'in' ? p.theme.colors.green[100] : p.theme.colors.red[100]};
  color:${p => p.theme.colors.earth[800]};
  svg{width:18px;height:18px;}
`
const TxnName = styled.p`font-size:14px;font-weight:500;color:${p => p.theme.colors.earth[800]};`
const TxnMeta = styled.p`font-size:12px;color:${p => p.theme.colors.earth[400]};margin-top:2px;`
const TxnRight = styled.div`text-align:right;`
const TxnAmt = styled.p`
  font-size:14px;font-weight:500;
  color:${p => p.theme.colors.earth[800]};
`
const TxnCat = styled.p`font-size:11px;color:${p => p.theme.colors.earth[400]};margin-top:2px;`

const SummaryGrid = styled.div`display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:1.25rem;`
const SumBox = styled.div`
  background:${p => p.theme.colors.white};border:0.5px solid ${p => p.theme.colors.earth[200]};
  border-radius:${p => p.theme.radius.lg};padding:1rem;
`
const SumVal = styled.p`font-size:22px;font-weight:500;color:${p => p.c || p.theme.colors.earth[800]};font-family:${p => p.theme.fonts.display};`
const SumLbl = styled.p`font-size:12px;color:${p => p.theme.colors.earth[500]};margin-bottom:4px;`

const fmt = n => '₦' + n.toLocaleString()

export default function Transactions() {
  const theme = useTheme()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = transactions.filter(tx => {
    const matchFilter = filter === 'all' || tx.type === filter
    const matchSearch = tx.name.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const totalIn = transactions.filter(t => t.type === 'in').reduce((s, t) => s + t.amount, 0)
  const totalOut = transactions.filter(t => t.type === 'out').reduce((s, t) => s + t.amount, 0)
  const viaKora = transactions.filter(t => t.method === 'KoraPay').length

  return (
    <AppLayout>
      <Page>
        <SectionTitle mb="1.25rem">Transactions</SectionTitle>

        <SummaryGrid>
          <SumBox><SumLbl>Total received</SumLbl><SumVal c={theme.colors.earth[800]}>{fmt(totalIn)}</SumVal></SumBox>
          <SumBox><SumLbl>Total spent</SumLbl><SumVal c={theme.colors.earth[800]}>{fmt(totalOut)}</SumVal></SumBox>
          <SumBox><SumLbl>Via KoraPay</SumLbl><SumVal>{viaKora} payments</SumVal></SumBox>
        </SummaryGrid>

        <TopRow>
          <Card>
            <SectionTitle>Monthly overview</SectionTitle>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={monthlyData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: theme.colors.earth[500] }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip formatter={v => [`₦${v.toLocaleString()}`, 'Received']} contentStyle={{ fontSize: '12px', borderRadius: '8px', border: `0.5px solid ${theme.colors.earth[100]}` }} />
                <Bar dataKey="received" fill="#1976D2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card delay="0.05s">
            <SectionTitle>Breakdown</SectionTitle>
            {[
              { label: 'Sales', pct: 78, color: '#1976D2' },
              { label: 'Wholesale', pct: 14, color: '#0C3B57' },
              { label: 'Restock', pct: 5, color: '#39A2DB' },
              { label: 'Expenses', pct: 3, color: '#6B7280' },
            ].map(b => (
              <div key={b.label} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <p style={{ fontSize: '12px', color: theme.colors.earth[800] }}>{b.label}</p>
                  <p style={{ fontSize: '12px', color: theme.colors.earth[500] }}>{b.pct}%</p>
                </div>
                <div style={{ height: '6px', background: '#E6F2FA', borderRadius: '3px' }}>
                  <div style={{ height: '6px', borderRadius: '3px', background: b.color, width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </Card>
        </TopRow>

        <Card delay="0.1s">
          <SectionTitle>All transactions</SectionTitle>
          <FilterBar>
            {['all', 'in', 'out'].map(f => (
              <FilterBtn key={f} active={filter === f} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f === 'in' ? 'Received' : 'Sent'}
              </FilterBtn>
            ))}
            <div style={{ flex: 1 }} />
            <Badge variant="info" style={{ fontSize: '12px', padding: '5px 12px' }}>{filtered.length} transactions</Badge>
          </FilterBar>
          <SearchWrap>
            <SearchIcon><Search size={15} /></SearchIcon>
            <SearchInput placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} />
          </SearchWrap>
          <TxnTable>
            {filtered.map(tx => (
              <TxnRow key={tx.id}>
                <TxnLeft>
                  <TxnIcon type={tx.type}>{tx.type === 'in' ? <ArrowDownLeft /> : <ArrowUpRight />}</TxnIcon>
                  <div>
                    <TxnName>{tx.name}</TxnName>
                    <TxnMeta>{tx.date} {tx.method === 'KoraPay' ? '· via KoraPay' : ''}</TxnMeta>
                  </div>
                </TxnLeft>
                <TxnRight>
                  <TxnAmt type={tx.type}>{tx.type === 'in' ? '+' : '-'}{fmt(tx.amount)}</TxnAmt>
                  <TxnCat>{tx.category}</TxnCat>
                </TxnRight>
              </TxnRow>
            ))}
            {filtered.length === 0 && <p style={{ textAlign: 'center', padding: '2rem', color: theme.colors.earth[500], fontSize: '14px' }}>No transactions found.</p>}
          </TxnTable>
        </Card>
      </Page>
    </AppLayout>
  )
}
