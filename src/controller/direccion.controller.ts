import { Request, Response } from "express";
import { HttpStatusCode } from "axios";
import {
  getDirecciones_get,
  getDireccionById_get,
  createDireccion_post,
  updateDireccion_put,
  deleteDireccion_delete,
} from "../models/direccion.model";

// 🔹 Obtener todas las direcciones
export async function getDirecciones(req: Request, res: Response): Promise<Response> {
  const direcciones = await getDirecciones_get();
  return res.status(HttpStatusCode.Ok).json({ data: direcciones });
}

// 🔹 Obtener una dirección por ID
export async function getDireccionById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const direccion = await getDireccionById_get(Number(id));

  if (!direccion) {
    return res.status(HttpStatusCode.NotFound).json({ message: "Dirección no encontrada" });
  }

  return res.status(HttpStatusCode.Ok).json({ data: direccion });
}

// 🔹 Crear dirección
export async function createDireccion(req: Request, res: Response): Promise<Response> {
  const success = await createDireccion_post(req.body);

  if (!success) {
    return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo crear la dirección" });
  }

  return res.status(HttpStatusCode.Ok).json({ message: "Dirección creada correctamente" });
}

// 🔹 Actualizar dirección
export async function updateDireccion(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const success = await updateDireccion_put({ ...req.body, id_direccion: Number(id) });

  if (!success) {
    return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo actualizar la dirección" });
  }

  return res.status(HttpStatusCode.Ok).json({ message: "Dirección actualizada correctamente" });
}

// 🔹 Eliminar dirección
export async function deleteDireccion(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const success = await deleteDireccion_delete(Number(id));

  if (!success) {
    return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo eliminar la dirección" });
  }

  return res.status(HttpStatusCode.Ok).json({ message: "Dirección eliminada correctamente" });
}