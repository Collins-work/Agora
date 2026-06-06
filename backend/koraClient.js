const axios = require('axios')
require('dotenv').config()

const KORAPAY_SECRET = process.env.KORAPAY_SECRET_KEY || process.env.KORAPAY_SECRET || ''
const KORAPAY_URL = 'https://api.korapay.com/merchant/api/v1'

const korapay = axios.create({
  baseURL: KORAPAY_URL,
  headers: {
    Authorization: `Bearer ${KORAPAY_SECRET}`,
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

async function safeRequest(method, path, data) {
  try {
    const res = await korapay.request({ method, url: path, data })
    return res.data
  } catch (err) {
    // normalize error for callers
    if (err.response) {
      const { status, data: respData } = err.response
      const e = new Error(`KoraPay API error: ${status}`)
      e.status = status
      e.response = respData
      throw e
    }
    const e = new Error(`KoraPay request failed: ${err.message}`)
    throw e
  }
}

module.exports = { korapay, safeRequest }
