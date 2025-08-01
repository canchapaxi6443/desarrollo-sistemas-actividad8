import { Router, Request, Response } from "express";
import { db } from "../config/db";
import {
  create,
  findOne,
  getAll,
  updateById,
  deleteById,
  report,
} from "../controllers/products-controller";

const router = Router();

// Ruta de prueba
router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Listar todos los productos
router.get("/products", getAll);

// Ver un producto por ID
router.get("/products/:id", findOne);

// Crear un producto
router.post("/products", create);

// Actualizar un producto
router.put("/products/:id", updateById);

// Eliminar un producto
router.delete("/products/:id", deleteById);

// Report

router.get("/report", report);

export default router;
