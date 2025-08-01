import { Router, Request, Response } from "express";
import { db } from "../config/db";

const getAll = async (req: Request, res: Response) => {
  try {
    const products = await db.all("SELECT * FROM products");
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const findOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await db.get("SELECT * FROM products WHERE id = ?", id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { name, description, price, quantity, stock } = req.body;
    const result = await db.run(
      `INSERT INTO products (name, description, price, quantity, stock)
   VALUES (?, ?, ?, ?, ?)`,
      name,
      description || null,
      price,
      quantity,
      stock
    );
    const newProduct = await db.get(
      "SELECT * FROM products WHERE id = ?",
      result.lastID
    );
    res.status(201).json(newProduct);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
const updateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, stock } = req.body; // <-- añadimos stock

    const result = await db.run(
      `UPDATE products
         SET name       = ?,
             description= ?,
             price      = ?,
             quantity   = ?,
             stock      = ?    -- ahora hay 5 campos para SET
       WHERE id = ?`, // y uno para WHERE
      name,
      description || null,
      price,
      quantity,
      stock, // <-- pasamos stock aquí
      id // <-- y luego el id
    );

    if (result.changes === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const updated = await db.get("SELECT * FROM products WHERE id = ?", id);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.run("DELETE FROM products WHERE id = ?", id);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const report = async (req: Request, res: Response) => {
  try {
    const rows = await db.all(
      `SELECT id, name, stock, (stock * price) AS total_value
         FROM products`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAll, findOne, create, updateById, deleteById, report };
