# Agora 🇳🇬

> Give Nigeria's 40 million market traders a verified digital financial identity — powered by KoraPay.

Built for the **KoraPay Hackathon 2026**.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite) + Styled Components |
| Routing | React Router v6 |
| Charts | Recharts |
| Backend | Node.js + Express |
| Payments | KoraPay API |
| Identity | KoraPay BVN Verification |

---

## Project Structure

```
agora/
├── frontend/               # React Vite app
│   ├── src/
│   │   ├── pages/          # All screens
│   │   │   ├── Landing.jsx
│   │   │   ├── Onboarding.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── IdCard.jsx
│   │   │   ├── PaymentLink.jsx
│   │   │   ├── Transactions.jsx
│   │   │   ├── Opportunities.jsx
│   │   │   ├── Loans.jsx
│   │   │   ├── Tenders.jsx
│   │   │   ├── Insurance.jsx
│   │   │   └── Settings.jsx
│   │   ├── components/
│   │   │   ├── layout/     # Sidebar, AppLayout
│   │   │   └── ui/         # Shared UI components
│   │   ├── data/           # Mock data
│   │   └── styles/         # Theme tokens, GlobalStyle
│   └── index.html
│
└── backend/                # Express API
    ├── server.js           # All routes
    ├── .env.example        # Environment variables template
    └── package.json
```

---

## Quick Start

### 1. Clone and install

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
cp .env.example .env
```

### 2. Add your KoraPay keys

Open `backend/.env` and add your KoraPay secret key from [dashboard.korapay.com](https://dashboard.korapay.com):

```
KORAPAY_SECRET_KEY=sk_test_your_key_here
KORAPAY_PUBLIC_KEY=pk_test_your_key_here
```

> The app works in **demo mode** without keys — all KoraPay calls fall back to mock data automatically.

### 3. Run the app

Open two terminals:

```bash
# Terminal 1 — Backend
cd backend
npm run dev
# → Running on http://localhost:4000

# Terminal 2 — Frontend
cd frontend
npm run dev
# → Running on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Pages / Screens

| Route | Screen |
|-------|--------|
| `/` | Landing page |
| `/onboarding` | 4-step trader signup (BVN + OTP) |
| `/dashboard` | Main dashboard — score, transactions, ID card |
| `/id-card` | Full digital business ID card |
| `/payment-link` | KoraPay payment link + QR code |
| `/transactions` | Full transaction history + charts |
| `/opportunities` | Loans, grants, tenders unlocked by score |
| `/loans` | Loan products + apply flow |
| `/tenders` | Government tender listings |
| `/insurance` | Insurance plans |
| `/settings` | Profile, security, notifications, KoraPay |

---

## KoraPay Integration

| Feature | KoraPay API Used |
|---------|-----------------|
| BVN verification on signup | `POST /identity/bvn` |
| Generate trader payment link | `POST /transactions/initialize/link` |
| Receive and record payments | Collections API + Webhook |
| Disburse loan funds | Payouts API |
| OTP/phone verification | Notification service |

---

## Demo Credentials

- **Trader:** Amara Okonkwo
- **Business ID:** AG-LG-00419
- **Credit Score:** 742 / 850
- **Market:** Balogun Market, Lagos

---

## Built by

Team Agora · KoraPay Hackathon 2026

*"KoraPay is the rails. Agora is the station."*
