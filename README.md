# Landing Page

This is a modern landing page built as a full-stack application. It leverages Next.js for both the frontend and API routes, with a PostgreSQL database managed through Prisma for robust data handling.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=for-the-badge&logo=postgresql)

![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)

![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.x-38B2AC?style=for-the-badge&logo=tailwind-css)

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)

## 🛠️ Built With

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v18 or higher recommended)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yogendrabaskota/Landing-page_Nextjs.git
   cd Landing-page_Nextjs
   ```
2. **Install dependencies**

```bash
npm install

```

3. **Start Project**

```bash
npm run dev
```

## 🔌 API Integration

The frontend is designed to connect with a backend API. The expected endpoints include:

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/projects`     | Fetch all projects  |
| GET    | `/api/projects/:id` | Get single pothole  |
| POST   | `/api/projects`     | Create new projects |
| PATCH  | `/api/projects/:id` | Update projects     |
| DELETE | `/api/projects/:id` | Delete projects     |

### Environment Variables (.env)

Create a `.env` file in the root directory to configure the API connection and database. Use the provided `.env.example` as a template.

**API Documentation:**

<div align="left">
  <a href="https://documenter.getpostman.com/view/33322053/2sB3HjMLw9" target="_blank">
    <img src="https://run.pstmn.io/button.svg" alt="Run in Postman" width="150">
    <br>
    <strong>View Interactive API Docs</strong>
  </a>
</div>

## Feedback

If you have any feedback, please reach out to me at yogendrabaskota18@gmail.com
