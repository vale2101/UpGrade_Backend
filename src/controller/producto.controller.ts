import { Request, Response } from "express";
import { HttpStatusCode } from "axios";
import {
  getProductos_get,
  getProductoById_get,
  createProducto_post,
  updateProducto_put,
  deleteProducto_delete,
} from "../models/producto.model";

// 🔹 Obtener todos los productos
export async function getProductos(req: Request, res: Response): Promise<Response> {
  const productos = await getProductos_get();
  return res.status(HttpStatusCode.Ok).json({ data: productos });
}

// 🔹 Obtener un producto por ID
export async function getProductoById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const producto = await getProductoById_get(Number(id));

  if (!producto) {
    return res.status(HttpStatusCode.NotFound).json({ message: "Producto no encontrado" });
  }

  return res.status(HttpStatusCode.Ok).json({ data: producto });
}

// 🔹 Crear producto
export async function createProducto(req: Request, res: Response): Promise<Response> {
  const success = await createProducto_post(req.body);

  if (!success) {
    return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo crear el producto" });
  }

  return res.status(HttpStatusCode.Ok).json({ message: "Producto creado correctamente" });
}

// 🔹 Actualizar producto
export async function updateProducto(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const success = await updateProducto_put({ ...req.body, id_producto: Number(id) });

  if (!success) {
    return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo actualizar el producto" });
  }

  return res.status(HttpStatusCode.Ok).json({ message: "Producto actualizado correctamente" });
}

// 🔹 Eliminar producto
export async function deleteProducto(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const success = await deleteProducto_delete(Number(id));

  if (!success) {
    return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo eliminar el producto" });
  }

  return res.status(HttpStatusCode.Ok).json({ message: "Producto eliminado correctamente" });
}
