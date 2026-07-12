# Generated Project Structure

```text
.
├── admin
│   ├── src
│   │   ├── components
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── store
│   │   └── utils
│   ├── Dockerfile
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── jobs
│   │   ├── middlewares
│   │   ├── models
│   │   ├── modules
│   │   ├── routes
│   │   ├── seed
│   │   ├── services
│   │   ├── uploads
│   │   ├── utils
│   │   └── validators
│   ├── Dockerfile
│   └── package.json
├── docs
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── PROJECT_STRUCTURE.md
└── docker-compose.yml
```

The project uses an MVC service layer:

- Models define MongoDB schemas and indexes.
- Validators define API contract validation with Zod.
- Controllers translate HTTP requests to service calls.
- Services contain business logic.
- Routes apply auth, RBAC, validation, and controller handlers.
