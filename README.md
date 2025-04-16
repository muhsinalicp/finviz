# 📊 FinViz - Personal Finance Visualizer

FinViz is a simple, elegant web application for managing personal finances. It allows users to track their transactions, visualize expenses, and set monthly budgets — all with beautiful, responsive UI and insightful charts.

## 🌟 Features

### ✅ Stage 1: Basic Transaction Tracking

- Add, edit, and delete transactions
- View all transactions in a clean list
- Monthly expenses visualized with bar charts
- Form validation using Zod + React Hook Form

### 🎨 Stage 2: Categories

- Assign predefined categories to transactions
- Category-wise pie chart for expense breakdown
- Dashboard with summary cards and recent activity

### 💸 Stage 3: Budgeting

- Set monthly budgets per category
- Budget vs Actual comparison with progress tracking
- Real-time spending insights

---

## 🛠 Tech Stack

- **Next.js (App Router)** — Full-stack React framework
- **MongoDB** — NoSQL database for persistent storage
- **shadcn/ui** — Beautiful headless UI components
- **Recharts** — Interactive data visualizations
- **Tailwind CSS** — Utility-first styling
- **Zod** + **React Hook Form** — Type-safe form validation

---

## 📁 Project Structure

src/ ├── app/ │ ├── dashboard/ │ ├── transactions/ │ ├── budgets/ │ └── api/ ├── components/ ├── models/ ├── db/ └── utils/
