# CleanKilo CRM

**A web-based Customer Relationship Management (CRM) system built specifically for modern laundry businesses.** CleanKilo delivers a dual-interface platform — an operator-facing Admin Dashboard and a customer-facing portal — to bridge the operational gap between laundry service providers and their customers.

---

## Overview

The laundry industry in Indonesia is highly fragmented, with most businesses still relying on physical ledgers, WhatsApp messages, and word-of-mouth for customer management. CleanKilo addresses this by providing a centralized CRM platform that handles the full customer lifecycle: from order placement and real-time tracking, to payment processing, loyalty management, complaint resolution, and churn prevention.

This project was designed as a production-grade prototype with emphasis on realistic business flows, not just aesthetic UI.

---

## Live Demo

**[cleankilo.vercel.app](https://zackreal.github.io/clean-kilo/)** — Deployed via GitHub Actions to GitHub Pages.

| Role | Access |
|---|---|
| Admin | Login page > Select "Admin" |
| Customer | Login page > Select "Customer" |

---

## System Architecture

The platform is composed of two independent portals that share a common data layer:

```
CleanKilo CRM
├── /admin              → Admin Dashboard (B2B/Operator)
│   ├── /summary        → Business overview & live KPIs
│   ├── /orders         → Order queue & payment verification
│   ├── /customers      → Customer directory & profiles
│   ├── /users          → Staff management
│   ├── /segments       → RFM-based customer segmentation
│   ├── /retention      → Churn detection & win-back tools
│   ├── /loyalty        → Loyalty tier management
│   ├── /reviews        → Feedback center with AI-assisted replies
│   ├── /analytics      → Revenue & trend reports
│   └── /resolution     → Complaint ticketing & service recovery
│
└── /customer           → Customer Portal (B2C)
    ├── Home            → Order summary & quick actions
    ├── Order           → New order form + live tracking + payment
    ├── History         → Transaction history & complaint submission
    ├── Points          → Loyalty points & voucher redemption
    ├── Feedback        → Rating & review submission
    └── Profile         → Account & address management
```

---

## Features

### Admin Dashboard

**Business Overview**
Real-time KPI cards (daily revenue, active orders, customer satisfaction score) supported by interactive bar charts for monthly trend analysis.

**Order Management**
A pipeline view of all active laundry orders with status controls (Received > Washing > Drying > Ironing > Done). Each order row includes a dedicated payment status badge (Paid / Unpaid) and a one-click "Accept Cash" button for walk-in and COD transactions, enabling admins to close orders without going through the QRIS flow.

**Customer Segmentation**
RFM-based segmentation (Recency, Frequency, Monetary) automatically classifies customers into behavioral groups: Champion, Loyal, At Risk, and Dormant — providing actionable insight for targeted marketing.

**Churn Management**
Detects customers who haven't transacted in 30+ days and flags them as "Ghost" or "Cooling Down." Each flagged customer has a direct action to simulate sending a WhatsApp re-engagement message with a personalized promo offer (Win-Back Campaign flow).

**Loyalty Program Management**
Defines tier thresholds (Regular, Silver, Gold) and manages point multipliers and voucher rules per tier. Admins can adjust program parameters and see tier distribution across the customer base.

**Feedback Center**
Aggregates all customer reviews with sentiment classification (Positive, Neutral, Complaint). Admins can write personalized replies or generate contextual draft replies per review. Complaint-flagged reviews are visually prioritized.

**Complaint Ticketing / Resolution Center**
A dedicated Service Recovery module. When customers submit a formal complaint from their portal (e.g., stained clothing, missing item), a ticket is generated here with full case details. Admins can close each ticket with one of three resolution actions: Approve Refund, Free Re-wash, or Reject Claim. Each action updates the ticket status in real-time and fires a confirmation notification.

**Staff Management**
User directory for laundry operators with role-based access separation between admin and courier accounts.

---

### Customer Portal

**Home**
Personalized landing view showing active order status, accumulated points, and tier badge. Quick-action buttons navigate directly to the most-used features.

**Order Placement & Live Tracking**
A multi-step order form supporting two delivery methods: Courier Pickup/Delivery and In-Store Drop-off. After placement, customers see a live status tracker moving through each production stage. Once the laundry is ready, a payment card appears with:
- QRIS payment flow (simulated scan + confirmation)
- Cash/COD option that routes to admin verification

The system follows a realistic business SOP: washing begins immediately after weighing, independent of payment. The clean laundry is held until payment is confirmed, preventing both operational delays and unpaid pickups.

**Transaction History & Complaint Submission**
Full order history with digital invoice preview. Each recent order has a "File Complaint" button that opens a categorized complaint form (Color Bleed, Missing Item, Quality Issue, Other) with a description field. Submitted complaints appear directly in the Admin Resolution Center.

**Loyalty Points & Vouchers**
Points are earned per transaction and displayed with a progress bar toward the next tier. Available vouchers can be viewed and simulated as redeemed, with a clear redemption history log.

**Feedback & Reviews**
A structured review form with star rating and smart tag selection (e.g., "Fast", "Neat", "Friendly Staff") rather than free-text only, ensuring consistent feedback data for admin analysis.

---

## Payment Flow

The payment model is designed around a real-world laundry constraint: **the final price is unknown until the laundry is weighed at the shop.** The system handles this as follows:

1. Customer places an order (pickup or walk-in)
2. Laundry is collected, weighed, and production begins immediately
3. Once weighed, an invoice is generated and the order is marked "Unpaid"
4. Customer receives a payment notification and can pay via:
   - **QRIS** — customer scans and confirms from their portal
   - **Bank Transfer** — customer confirms manually
   - **Cash / COD** — admin verifies and marks as paid from the operator dashboard
5. Clean laundry is released for delivery or pickup only after payment is confirmed

This prevents the common cash-flow problem of customers collecting their laundry and delaying payment indefinitely.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion) |
| Icons | Phosphor Icons |
| Deployment | GitHub Actions + GitHub Pages |
| Node Requirement | >= 20.9.0 |

---

## Getting Started

**Prerequisites:** Node.js >= 20.9.0, npm

```bash
# Clone the repository
git clone https://github.com/zackreal/clean-kilo.git
cd clean-kilo

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). On the login screen, select a role (Admin or Customer) to enter the respective portal.

**Build for production:**
```bash
npm run build
```

---

## Project Structure

```
.
├── app/
│   ├── admin/          # Admin route pages (each section has its own page.tsx)
│   ├── customer/       # Customer portal page
│   ├── login/          # Authentication gate
│   └── layout.tsx      # Root layout with font and metadata
├── components/
│   ├── admin/
│   │   └── sections/   # Individual admin section components
│   ├── customer/
│   │   └── views/      # Individual customer view components
│   └── ui/             # Shared UI primitives (Toast, etc.)
├── lib/
│   └── data.ts         # Centralized data types, mock data, and constants
└── .github/
    └── workflows/
        └── deploy.yml  # CI/CD pipeline for GitHub Pages deployment
```

---

## Deployment

The repository is configured for automatic deployment to GitHub Pages using GitHub Actions. Any push to the `main` branch triggers a build and redeploy.

The workflow file is located at `.github/workflows/deploy.yml`. It uses `next build` with static export (`output: 'export'`) to generate a fully static site, eliminating the need for a Node.js server in production.

---

## Design Decisions

**No external backend or database.** All data is stateful and lives in component-level state initialized from `lib/data.ts`. This was an intentional decision to keep the prototype self-contained and deployable as a static site, while still demonstrating all CRM flows realistically.

**Dual-portal architecture.** Rather than a single admin-only dashboard, the system was designed with a parallel customer-facing interface. This reflects how a real CRM functions — the admin side is only as useful as the customer data and interactions feeding into it.

**Realistic business logic over simplified UI flows.** Features like the payment hold, complaint ticketing, and churn detection were designed to reflect actual operational challenges in small-to-medium laundry businesses in Indonesia, not textbook CRM theory.

---

## Author

**Giri Purnama** — [github.com/zackreal](https://github.com/zackreal)
