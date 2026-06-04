import { demoAccount } from './demoAccount'

const ACCOUNTS_KEY = 'agora.accounts'
const SESSION_KEY = 'agora.session'

const isClient = () => typeof window !== 'undefined'

const readJSON = (key, fallback) => {
    if (!isClient()) return fallback
    try {
        const raw = window.localStorage.getItem(key)
        return raw ? JSON.parse(raw) : fallback
    } catch {
        return fallback
    }
}

const writeJSON = (key, value) => {
    if (!isClient()) return
    window.localStorage.setItem(key, JSON.stringify(value))
}

const maskDemoAccount = account => ({
    ...account,
    isDemo: true,
})

const seedAccounts = () => {
    const accounts = readJSON(ACCOUNTS_KEY, [])
    const demoIndex = accounts.findIndex(account => account.id === demoAccount.id)
    
    if (demoIndex >= 0) {
        // Merge latest demo account data (like opportunities) into existing demo session
        accounts[demoIndex] = { ...maskDemoAccount(demoAccount), ...accounts[demoIndex] }
        // Ensure opportunities is specifically updated if it was empty
        if (!accounts[demoIndex].opportunities || accounts[demoIndex].opportunities.length === 0) {
            accounts[demoIndex].opportunities = demoAccount.opportunities
        }
        writeJSON(ACCOUNTS_KEY, accounts)
        return accounts
    }
    
    const seeded = [maskDemoAccount(demoAccount), ...accounts]
    writeJSON(ACCOUNTS_KEY, seeded)
    return seeded
}

export const getAccounts = () => seedAccounts()

export const getActiveAccount = () => {
    const accounts = getAccounts()
    const sessionId = readJSON(SESSION_KEY, null)
    return accounts.find(account => account.id === sessionId) || accounts[0] || maskDemoAccount(demoAccount)
}

export const getActiveCollections = () => {
    const account = getActiveAccount()
    return {
        monthlyData: account.monthlyData || [],
        scoreHistory: account.scoreHistory || [],
        scoreFactors: account.scoreFactors || [],
        transactions: account.transactions || [],
        opportunities: account.opportunities || [],
    }
}

export const saveAccount = account => {
    const accounts = getAccounts()
    const nextAccount = { ...account }
    const index = accounts.findIndex(item => item.id === nextAccount.id)
    const nextAccounts = index >= 0
        ? accounts.map(item => (item.id === nextAccount.id ? nextAccount : item))
        : [nextAccount, ...accounts]
    writeJSON(ACCOUNTS_KEY, nextAccounts)
    writeJSON(SESSION_KEY, nextAccount.id)
    return nextAccount
}

export const setActiveAccount = id => {
    if (!isClient()) return
    window.localStorage.setItem(SESSION_KEY, id)
}

export const clearSession = () => {
    if (!isClient()) return
    window.localStorage.removeItem(SESSION_KEY)
}

export const findAccountByIdentifier = (identifier, pin) => {
    const value = identifier.trim().toLowerCase()
    const accounts = getAccounts()
    return accounts.find(account => {
        const matchesIdentifier = [account.id, account.email, account.phone]
            .filter(Boolean)
            .some(field => String(field).toLowerCase() === value)
        const matchesPin = String(account.pin || '') === String(pin || '')
        return matchesIdentifier && matchesPin
    }) || null
}

export const createAccountFromOnboarding = form => {
    const firstName = form.firstName.trim()
    const lastName = form.lastName.trim()
    const businessId = `AG-LG-${Math.floor(10000 + Math.random() * 90000)}`
    const name = `${firstName} ${lastName}`.trim()
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    const activeAccount = {
        id: businessId,
        name,
        initials: `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase(),
        trade: form.tradeType || 'Trader',
        market: form.market || 'Unknown market',
        state: (form.market || '').split(',').pop()?.trim() || 'Nigeria',
        bvn: form.bvn ? form.bvn.replace(/\d(?=\d{4})/g, '•') : 'Pending verification',
        phone: form.phone,
        email: form.email,
        pin: form.pin,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        creditScore: 0,
        maxScore: 850,
        status: 'New account',
        loanReady: false,
        paymentLink: `https://pay.korapay.com/agora/${slug}`,
        totalReceived: 0,
        totalTransactions: 0,
        uniqueCustomers: 0,
        monthlyGrowth: 0,
        scoreGrowth: 0,
        newCustomers: 0,
        monthlyData: [],
        scoreHistory: [],
        scoreFactors: [],
        transactions: [],
        opportunities: [],
        isDemo: false,
    }
    return saveAccount(activeAccount)
}

export const demo = maskDemoAccount(demoAccount)
