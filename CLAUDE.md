# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SnapTheTitle** — photography studio management platform (Korean market). Monorepo with a React frontend, Spring Boot backend, and Docker-based deployment via Nginx.

## Commands

### Frontend (`snapthetitle/`)
```bash
npm install          # Install dependencies
npm start            # Dev server on port 3000
npm run build        # Production build → build/
npm test             # Run tests
```

### Backend (`snapthetitle-backend/`)
```bash
./gradlew bootRun    # Dev server on port 8080
./gradlew build      # Production build → build/libs/
./gradlew test       # Run tests
```

### Full Stack (Docker)
```bash
# Build frontend first, then spin up all services
cd snapthetitle && npm install && npm run build && cd ..
docker-compose up --build

# Access points
# Frontend:  http://localhost  (Nginx port 80)
# API:       http://localhost/api  (proxied to backend:8080)
# Images:    http://localhost/uploads/<filename>.webp
# MySQL:     localhost:3307
```

## Architecture

### Backend (`snapthetitle-backend/`)
Layered Spring Boot 3.5 / Java 17 app.

- **Controllers** are split into `controller/admin/` and `controller/user/` — admin endpoints require JWT, user endpoints are public.
- **Services** hold all business logic (`AttachmentService` handles file uploads and WebP/thumbnail conversion via Scrimage).
- **Entities** use `deleted_yn` ('Y'/'N') for soft deletes and `display_order` for admin-controlled ordering.
- **Database**: MySQL 8 with Flyway migrations in `src/main/resources/db/migration/`. Schema is in `V1__init_schema.sql`.
- **Spring profiles**: `dev` (localhost DB) vs `prod` (Docker env vars). Activated via `SPRING_PROFILES_ACTIVE` in `.env`.
- **File storage**: Uploaded files are stored at `/home/app/uploads` inside Docker and served by Nginx from `/uploads/`.

### Frontend (`snapthetitle/`)
Create React App with Tailwind CSS.

- **API clients**: `src/api/adminApi.js` (axios with JWT `Authorization` header) and `src/api/publicApi.js` (public fetch).
- **Auth**: JWT stored in `localStorage`, provided via `AuthContext`. Admin routes are guarded by `PrivateRoute`.
- **Admin routes** (`/admin/*`): Dashboard with analytics (Recharts), plus CRUD for Gallery, Products, FAQ, Guide, Partner, and main-page slider.
- **Public routes**: `/`, `/about`, `/gallery`, `/product`, `/reservation`, `/notice/faq|guide|partner`.
- **Image display**: Gallery uses React Masonry CSS + Yet Another React Lightbox.

### Infrastructure
- `docker-compose.yml` orchestrates MySQL, Spring Boot backend, and the Nginx+React frontend container.
- The frontend `Dockerfile` is a multi-stage build: Node build stage → Nginx serving stage with `nginx.conf`.
- Nginx terminates SSL (Let's Encrypt via Certbot), serves static assets with long-lived cache headers, and proxies `/api/` to the backend.

## Key Domain Entities

| Entity | Purpose |
|---|---|
| `Product` / `ProductOption` | Studio service packages with year and pricing options |
| `GalleryPhoto` / `MainPhoto` | Image content (gallery grid and homepage slider) |
| `Attachment` | WebP files + thumbnails; polymorphic via `entity_type` + `entity_id` |
| `Faq` / `Guide` / `GuideDetail` | Content management for notice pages |
| `Partner` | Partner businesses (bouquets, suits, etc.) |
| `VisitLog` | Visitor analytics data powering the admin dashboard |
| `AdminUser` | Admin credentials (JWT-authenticated) |

## Configuration

Environment variables are in `.env` (not committed). Key variables: DB credentials, JWT secret, `SPRING_PROFILES_ACTIVE`.

Backend profiles:
- `application-dev.yml` — connects to localhost MySQL
- `application-prod.yml` — reads credentials from Docker env vars
