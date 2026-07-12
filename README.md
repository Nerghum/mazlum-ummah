# Newspaper Portal CMS

A full-stack newspaper portal CMS with a secure Express/MongoDB API and a TailAdmin-inspired React admin dashboard.

## Stack

- Backend: Node.js, Express, MongoDB, Mongoose, JWT, RBAC, Zod
- Admin: React, Vite, TailwindCSS, React Router, Redux Toolkit, Axios, React Hook Form, Zod
- Infra: Docker Compose, MongoDB self-hosted service, seed data, API docs

## Quick Start With Docker

```bash
cd "/Users/nerghum/Desktop/personal/Mazlum ummah 2"
docker compose up --build -d
docker compose exec server npm run seed
```

Frontend URL: `http://localhost:3000`
Admin URL: `http://localhost:5173`
API URL: `http://localhost:4000`

For live admin preview links, set the main frontend domain in `admin/.env` before building admin:

```env
VITE_FRONTEND_URL=https://your-main-domain.com
```

Seed login:

- Email: `superadmin@news.local`
- Password: `Admin123!`

## Project Structure

```text
server/  Express API, MVC modules, schemas, middleware, seeds, jobs
admin/   React admin panel, routes, reusable UI, store, services
docs/    API documentation and deployment guide
```

See [docs/API.md](docs/API.md) and [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Docker Commands

Start or rebuild all services:

```bash
cd "/Users/nerghum/Desktop/personal/Mazlum ummah 2"
docker compose up --build -d
docker compose exec server npm run seed
```

Stop all services:

```bash
cd "/Users/nerghum/Desktop/personal/Mazlum ummah 2"
docker compose down
```

Restart after code changes:

```bash
cd "/Users/nerghum/Desktop/personal/Mazlum ummah 2"
docker compose up --build -d
```

If Docker build fails during `RUN npm install` with `ECONNRESET` or `npm error network aborted`, the npm registry connection dropped while Docker was building an image. Run the same command again:

```bash
docker compose up --build -d
```

Then seed after the services are running:

```bash
docker compose exec server npm run seed
```
