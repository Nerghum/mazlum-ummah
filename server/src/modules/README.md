# Modules

This directory is reserved for feature-level module expansion when a bounded context grows beyond the shared MVC folders.

Current implementation keeps controllers, services, models, validators, and routes in top-level folders for discoverability while preserving module boundaries through naming:

- `news.*`
- `auth.*`
- `homepage.*`
- `media.*`
- `analytics.*`
- `taxonomy.*`

For larger teams, move each group into `modules/<feature>/` with the same internal shape.
