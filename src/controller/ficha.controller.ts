import { Request, Response } from "express";
import { HttpStatusCode } from "axios";
import {
  getFichas_get,
  getFichaById_get,
  createFicha_post,
  updateFicha_put,
  deleteFicha_delete,
  getFichaByProductoId_get, // 🔹 añadimos la nueva función del modelo
} from "../models/ficha.model";

// 🔹 Obtener todas las fichas
export async function getFichas(req: Request, res: Response): Promise<Response> {
  const fichas = await getFichas_get();
  return res.status(HttpStatusCode.Ok).json({ data: fichas });
}

// 🔹 Obtener una ficha por ID
export async function getFichaById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const ficha = await getFichaById_get(Number(id));

  if (!ficha) {
    return res.status(HttpStatusCode.NotFound).json({ message: "Ficha no encontrada" });
  }

  return res.status(HttpStatusCode.Ok).json({ data: ficha });
}

// 🔹 Obtener ficha por ID de producto
export async function getFichaByProductoId(req: Request, res: Response): Promise<Response> {
  const { id_producto } = req.params;
  const ficha = await getFichaByProductoId_get(Number(id_producto));

  if (!ficha) {
    return res.status(HttpStatusCode.NotFound).json({ message: "Ficha no encontrada para este producto" });
  }

  return res.status(HttpStatusCode.Ok).json({ data: ficha });
}

// 🔹 Crear ficha
export async function createFicha(req: Request, res: Response): Promise<Response> {
  const insertId = await createFicha_post(req.body);

  if (!insertId) {
    return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo crear la ficha" });
  }

  // Consultamos la ficha recién creada
  const ficha = await getFichaById_get(insertId);

  return res.status(HttpStatusCode.Ok).json({
    message: "Ficha creada correctamente",
    data: ficha,
  });
}


// 🔹 Actualizar ficha
export async function updateFicha(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const success = await updateFicha_put({ ...req.body, id_ficha: Number(id) });

  if (!success) {
    return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo actualizar la ficha" });
  }

  return res.status(HttpStatusCode.Ok).json({ message: "Ficha actualizada correctamente" });
}

// 🔹 Eliminar ficha
export async function deleteFicha(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const success = await deleteFicha_delete(Number(id));

  if (!success) {
    return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo eliminar la ficha" });
  }

  return res.status(HttpStatusCode.Ok).json({ message: "Ficha eliminada correctamente" });
}
