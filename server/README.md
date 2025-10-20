# Items API

A simple RESTful API for managing items, built with TypeScript, Express, and PostgreSQL. The API supports CRUD operations (Create, Read, Update, Delete) for items, with robust error handling and production-ready logging using Winston.

## Features

- Create, read, update, and delete items
- PostgreSQL database with parameterized queries (no ORM)
- Centralized error handling with custom `ApiError` class
- Structured logging with Winston and HTTP logging with Morgan
- Dockerized for easy deployment

## Quick Start

```bash
# Start PostgreSQL with Docker Compose
npm run compose:up

# Start the API in development mode
npm run dev
```

Environment variables are configured in `.env`.

## Endpoints

- `POST /items` - Create a new item
- `GET /items` - Retrieve all items
- `GET /items/:id` - Retrieve an item by ID
- `PUT /items/:id` - Update an item by ID
- `DELETE /items/:id` - Delete an item by ID

---
