# Items API - Copilot Instructions

## Project Overview

TypeScript/Express REST API with PostgreSQL, featuring production-ready error handling and logging.

## Architecture & Data Flow

**Database → Pool → Controller → Routes → App**

- `src/config/db.ts` exports singleton pool via `getPool()` - must call `dbConnect()` first in `server.ts`
- Controllers use `getPool()` to access database, never import pool directly
- All database operations use parameterized queries: `pool.query('SELECT * FROM items WHERE id = $1', [id])`

## Critical Patterns

### Error Handling

**Use `ApiError` class, never manual status responses:**

```typescript
// ✅ Correct
throw ApiError.notFound('Item not found');
throw ApiError.badRequest('Invalid input');

// ❌ Wrong
res.status(404).json({ message: 'Not found' });
```

Available methods: `ApiError.badRequest()`, `notFound()`, `unauthorized()`, `forbidden()`, `conflict()`, `unprocessableEntity()`, `internal()`

### Controllers

- All controller functions are `async` with `(req, res, next)` signature
- Input validation before database calls
- Use `next(error)` in catch blocks, never throw errors directly
- Never send responses in catch blocks

### Database Connection

Database initializes before server starts:

```typescript
await dbConnect(); // Call once in server.ts
const pool = getPool(); // Use in controllers
```

### Logging

**Use Winston logger, not console:**

- `logger.info()` - Server startup, database connection
- `logger.warn()` - 404s, operational errors
- `logger.error()` - Server errors, database failures

Morgan handles HTTP request logging automatically.

## Development Workflow

### Commands

```bash
npm run dev           # Development with hot reload
npm run compose:up    # Start PostgreSQL container
npm run build         # Compile TypeScript
npm start             # Run production build
npm run lint:fix      # Auto-fix linting issues
```

### Database Setup

1. `docker-compose up -d` - Starts PostgreSQL with `init.sql` auto-loaded
2. Schema auto-creates `items` table with sample data
3. Connection uses `.env` variables: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

### Environment Variables

`.env` required for local development (not committed):

- `NODE_ENV` - Controls logging format (development/production)
- `PORT` - Server port (default: 3000)
- Database configs match `docker-compose.yml` values

## File Structure Conventions

```
src/
├── server.ts           # Entry point - calls dbConnect() then app.listen()
├── app.ts              # Express setup, middleware, routes, error handlers
├── config/
│   ├── config.ts       # Centralized config from env vars
│   └── db.ts           # Database pool singleton
├── controllers/        # Async request handlers, use getPool()
├── routes/             # Route definitions only, no logic
├── models/             # TypeScript interfaces (no ORM)
├── middlewares/        # errorHandler uses ApiError
└── utils/
    ├── apiError.ts     # Custom error class
    └── logger.ts       # Winston configuration
```

## Key Integration Points

- **Morgan → Winston**: Production uses `morgan('combined', { stream: logger.info })`
- **Express → ErrorHandler**: Last middleware in `app.ts`, catches ApiError and async errors
- **Docker → Init SQL**: `docker-compose.yml` mounts `init.sql` to `/docker-entrypoint-initdb.d/`

## Project-Specific Rules

1. **No ORM** - Raw SQL with parameterized queries only
2. **Singleton pool** - One pool instance via `dbConnect()`, access via `getPool()`
3. **Explicit error types** - Use ApiError static methods, not HTTP codes
4. **Async controllers** - All database operations are async/await
5. **Structured logging** - Winston for application logs, Morgan for HTTP logs
