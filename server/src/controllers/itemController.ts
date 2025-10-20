import { Request, Response, NextFunction } from 'express';
import { Item } from '../models/item';
import { getPool } from '../config/db';
import { ApiError } from '../utils/apiError';

// Create an item
export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      throw ApiError.badRequest('Item name is required');
    }

    const pool = getPool();
    const result = await pool.query(
      'INSERT INTO items (name) VALUES ($1) RETURNING *',
      [name],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Read all items
export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pool = getPool();
    const result = await pool.query('SELECT * FROM items ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// Read single item
export const getItemById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      throw ApiError.badRequest('Invalid item ID');
    }

    const pool = getPool();
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      throw ApiError.notFound('Item not found');
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Update an item
export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;

    if (isNaN(id)) {
      throw ApiError.badRequest('Invalid item ID');
    }

    if (!name || name.trim() === '') {
      throw ApiError.badRequest('Item name is required');
    }

    const pool = getPool();
    const result = await pool.query(
      'UPDATE items SET name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [name, id],
    );

    if (result.rows.length === 0) {
      throw ApiError.notFound('Item not found');
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Delete an item
export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      throw ApiError.badRequest('Invalid item ID');
    }

    const pool = getPool();
    const result = await pool.query(
      'DELETE FROM items WHERE id = $1 RETURNING *',
      [id],
    );

    if (result.rows.length === 0) {
      throw ApiError.notFound('Item not found');
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
