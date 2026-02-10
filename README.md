# Notes API

**A minimal Node.js Express REST API for notes with in-memory storage, health check, and CRUD endpoints. ESM, Jest + Supertest.**

---

## Quick Start

```bash
npm install
npm run dev
```

Server runs at `http://localhost:3000`.

---

## API Reference

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/notes` | List all notes |
| GET | `/notes/:id` | Get one note |
| POST | `/notes` | Create note |
| PUT | `/notes/:id` | Update note |
| DELETE | `/notes/:id` | Delete note |

### Examples

**Health**
```bash
curl http://localhost:3000/health
# {"status":"ok"}
```

**Create note**
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"My Note","content":"Hello"}'
# {"id":"1","title":"My Note","content":"Hello"}
```

**List notes**
```bash
curl http://localhost:3000/notes
# [{"id":"1","title":"My Note","content":"Hello"}]
```

**Get note**
```bash
curl http://localhost:3000/notes/1
```

**Update note**
```bash
curl -X PUT http://localhost:3000/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","content":"New content"}'
```

**Delete note**
```bash
curl -X DELETE http://localhost:3000/notes/1
```

### Request / Response

- **POST/PUT body:** `{ "title": "string", "content": "string" }` (both required, non-empty)
- **Errors:** `{ "error": "message" }` — 400 validation, 404 not found

---

## Docker

### Build and run

```bash
docker build -t notes-api .
docker run -p 3000:3000 notes-api
```

### Dockerfile

Uses a minimal Node 20 Alpine image. Copies app files, installs production deps only, exposes port 3000.

```bash
# Build
docker build -t notes-api .

# Run (map port)
docker run -p 3000:3000 notes-api

# Run with custom port
docker run -p 8080:3000 -e PORT=3000 notes-api
```

---

## Deployment

### Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |

### Production run

```bash
npm ci
npm start
```

Or with Docker:

```bash
docker run -p 3000:3000 notes-api
```

### Platform notes

- **Railway / Render / Fly.io:** Set `PORT` from platform; use `npm start` or the Docker image.
- **Heroku:** Add `"start": "node src/index.js"` (included); Heroku sets `PORT`.
- **VPS:** Use a process manager (e.g. `pm2`) or systemd; bind to `0.0.0.0` and use `PORT`.

---

## Scripts

| Script | Command |
|--------|---------|
| `npm start` | Run server (production) |
| `npm run dev` | Run with nodemon (watch) |
| `npm test` | Run Jest tests |

---

## License

ISC
