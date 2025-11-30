import { Router } from "express";
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../controller/producto.controller";
import {
  createProductoSchema,
  updateProductoSchema,
} from "../schemas/producto.schema";
import { validateSchema } from "../middleware/validateSchemas.middleware";

const router = Router();

// 🔹 Obtener todos los productos
router.get("/productos", getProductos);

// 🔹 Obtener un producto por ID
router.get("/productos/:id", getProductoById);

// 🔹 Crear producto con validación
router.post("/productos", validateSchema(createProductoSchema), createProducto);

// 🔹 Actualizar producto con validación
router.put("/productos/:id", validateSchema(updateProductoSchema), updateProducto);

// 🔹 Eliminar producto
router.delete("/productos/:id", deleteProducto);

export default router;
