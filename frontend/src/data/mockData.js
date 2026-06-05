import { demoAccount } from './demoAccount'
import { getActiveAccount, getActiveCollections } from './auth'

const createAccountProxy = () => new Proxy(demoAccount, {
    get(target, prop) {
        const activeAccount = getActiveAccount()
        if (!activeAccount || activeAccount.isDemo) {
            return target[prop]
        }
        return activeAccount[prop]
    },
})

const createArrayProxy = key => new Proxy(demoAccount[key], {
    get(target, prop) {
        const activeAccount = getActiveAccount()
        if (!activeAccount || activeAccount.isDemo) {
            return Reflect.get(target, prop)
        }
        const collections = getActiveCollections()
        const source = collections[key] && collections[key].length ? collections[key] : []
        return Reflect.get(source, prop)
    },
})

export const currentTrader = createAccountProxy()
export const scoreFactors = createArrayProxy('scoreFactors')
export const transactions = createArrayProxy('transactions')
export const opportunities = createArrayProxy('opportunities')
export const monthlyData = createArrayProxy('monthlyData')
export const scoreHistory = createArrayProxy('scoreHistory')

export const markets = [
    'Balogun Market, Lagos',
    'Alaba International Market, Lagos',
    'Oshodi Market, Lagos',
    'Computer Village, Lagos',
    'Onitsha Main Market, Anambra',
    'Ariaria Market, Abia',
    'Wuse Market, Abuja',
    'Sabon Gari Market, Kano',
    'Owode Market, Ogun',
    'Oba Market, Edo',
]

export const tradeTypes = [
    'Textile & Fabric',
    'Electronics',
    'Food & Provisions',
    'Clothing & Fashion',
    'Building Materials',
    'Phones & Accessories',
    'Household Goods',
    'Jewelry & Accessories',
    'Cosmetics & Beauty',
    'Auto Parts',
    'Agricultural Produce',
    'Footwear',
]
