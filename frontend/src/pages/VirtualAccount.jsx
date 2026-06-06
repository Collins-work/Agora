import { useState } from 'react'

export default function VirtualAccount() {
  const [traderId, setTraderId] = useState('')
  const [name, setName] = useState('')
  const [bankCode, setBankCode] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/virtual-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ traderId, name, bank_code: bankCode }),
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setResult({ success: false, error: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Request Virtual Account</h2>
      <form onSubmit={submit} style={{ maxWidth: 520 }}>
        <div style={{ marginBottom: 8 }}>
          <label>Trader ID</label>
          <input value={traderId} onChange={(e) => setTraderId(e.target.value)} placeholder="trader-123" />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Account name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Example Trader" />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Bank code (optional)</label>
          <input value={bankCode} onChange={(e) => setBankCode(e.target.value)} placeholder="044" />
        </div>
        <div>
          <button type="submit" disabled={loading}>{loading ? 'Requesting…' : 'Create Virtual Account'}</button>
        </div>
      </form>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Result</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
