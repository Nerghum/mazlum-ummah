# Deployment Guide

## Prerequisites

- Node.js 20+
- MongoDB 7+
- Docker and Docker Compose for container deployment
- Reverse proxy such as Nginx, Caddy, or a managed load balancer

## Environment

Create production environment files from examples:

```bash
cp server/.env.example server/.env
cp admin/.env.example admin/.env
```

Set strong values:

```text
NODE_ENV=production
MONGO_URI=mongodb://<user>:<password>@<host>:27017/newspaper_cms?authSource=admin
JWT_ACCESS_SECRET=<64+ random chars>
JWT_REFRESH_SECRET=<64+ random chars>
CLIENT_URL=https://admin.example.com
VITE_API_URL=https://api.example.com/api/v1
```

## Docker

```bash
docker compose up --build -d
docker compose exec server npm run seed
```

For production, use managed volumes for:

- MongoDB data
- `server/uploads`

## Manual Server Deployment

```bash
cd server
npm ci --omit=dev
npm start
```

Run behind a process manager:

```bash
pm2 start src/server.js --name newspaper-cms-api
```

## Admin Build

```bash
cd admin
npm ci
npm run build
```

Serve `admin/dist` from Nginx or Caddy. All client routes should fall back to `index.html`.

## Security Checklist

- Use HTTPS only.
- Rotate JWT secrets before launch.
- Restrict MongoDB network access.
- Use a dedicated MongoDB user with least privilege.
- Keep `helmet`, CORS, rate limits, file type validation, and Mongo sanitization enabled.
- Store uploads in private object storage if public filesystem access is not desired.
- Configure backup and restore tests for MongoDB.

## Scaling Notes

- Put API instances behind a load balancer.
- Move uploads to S3-compatible storage for horizontal scaling.
- Add Redis for shared rate limiting and API cache.
- Use MongoDB replica sets and proper indexes for read-heavy traffic.
- Run scheduled publishing as a singleton worker in production.
