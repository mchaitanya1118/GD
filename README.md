# Neqtra Salary Slip Generator

A full-stack, multi-tenant SaaS-ready payroll management system designed for small businesses.

## 🚀 Quick Start (Local)

### Prerequisites
- Node.js 20+
- Docker & Docker Compose

### Setup
1. Clone the repository.
2. Run `docker compose up -d` to start PostgreSQL.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Setup the database and seed:
   ```bash
   cd apps/api
   npx prisma db push
   npx prisma db seed
   ```
5. Start development servers:
   ```bash
   npm run dev
   ```

### Access
- Frontend: `http://localhost:3000`
- API: `http://localhost:4000`
- Demo Admin: `admin@neqtra.com` / `admin123`

## ⚙️ Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, ShadCN UI, Zustand.
- **Backend**: NestJS, PostgreSQL, Prisma ORM.
- **Features**: Custom Spreadsheet Engine, JWT Auth, Multi-tenancy.

## 📁 Structure
- `apps/web`: Next.js frontend application.
- `apps/api`: NestJS backend API.
- `packages/shared`: Common types and validation (TODO).

## 📡 API Documentation

### Auth
- `POST /auth/register`: Create a new business and admin.
- `POST /auth/login`: Login for existing users.

### Employees
- `GET /employees`: List all employees for the tenant.
- `POST /employees`: Create a new employee.

### Salary Slips
- `GET /salary-slips?month=X&year=Y`: Get payroll overview for a month.
- `POST /salary-slips`: Save/update a salary slip grid.

## 🛡️ License
MIT
# payroll
