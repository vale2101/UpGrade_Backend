import { Request, Response } from "express";
import { HttpStatusCode } from "axios";
import {
  getPedidos_get,
  getPedidoById_get,
  createPedido_post,
  updatePedido_put,
  deletePedido_delete,
  getProductosByPedidoId_get,
  getPedidosByUserId_get,
} from "../models/pedido.model";

// 🔹 Obtener todos los pedidos
export async function getPedidos(req: Request, res: Response): Promise<Response> {
  const pedidos = await getPedidos_get();
  return res.status(HttpStatusCode.Ok).json({ data: pedidos });
}

// 🔹 Obtener un pedido por ID
export async function getPedidoById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const pedido = await getPedidoById_get(Number(id));

  if (!pedido) {
    return res.status(HttpStatusCode.NotFound).json({ message: "Pedido no encontrado" });
  }

  return res.status(HttpStatusCode.Ok).json({ data: pedido });
}

// 🔹 Crear pedido
export async function createPedido(req: Request, res: Response): Promise<Response> {
  const success = await createPedido_post(req.body);

  if (!success) {
    return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo crear el pedido" });
  }

  return res.status(HttpStatusCode.Ok).json({ message: "Pedido creado correctamente" });
}

// 🔹 Actualizar pedido (ej. estado)
export async function updatePedido(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const success = await updatePedido_put({ ...req.body, id_pedido: Number(id) });

  if (!success) {
    return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo actualizar el pedido" });
  }

  return res.status(HttpStatusCode.Ok).json({ message: "Pedido actualizado correctamente" });
}

// 🔹 Eliminar pedido
export async function deletePedido(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const success = await deletePedido_delete(Number(id));

  if (!success) {
    return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo eliminar el pedido" });
  }

  return res.status(HttpStatusCode.Ok).json({ message: "Pedido eliminado correctamente" });
}

// 🔹 Obtener productos de un pedido (descomponiendo JSON)
export async function getProductosByPedidoId(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const productos = await getProductosByPedidoId_get(Number(id));

  if (!productos || productos.length === 0) {
    return res.status(HttpStatusCode.NotFound).json({ message: "No se encontraron productos para este pedido" });
  }

  return res.status(HttpStatusCode.Ok).json({ data: productos });
}

// 🔹 Obtener pedidos por usuario
export async function getPedidosByUserId(req: Request, res: Response): Promise<Response> {
  const { id_user } = req.params;
  const pedidos = await getPedidosByUserId_get(Number(id_user));

  if (!pedidos || pedidos.length === 0) {
    return res.status(HttpStatusCode.NotFound).json({ message: "No se encontraron pedidos para este usuario" });
  }

  return res.status(HttpStatusCode.Ok).json({ data: pedidos });
}
