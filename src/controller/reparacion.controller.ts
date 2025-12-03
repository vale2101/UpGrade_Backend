import { Request, Response } from "express";
import {
  getReparaciones_get,
  getReparacionById_get,
  createReparacion_post,
  updateReparacion_put,
  deleteReparacion_delete,
  getReparacionesByUser_get,
  getReparacionesByTrabajador_get,
  updateEstadoReparacion_put,
} from "../models/reparacion.model";
import MySQLConnector from "../db/connection";

const db = new MySQLConnector();

// 🔹 Obtener todas las reparaciones
export async function getReparaciones(req: Request, res: Response): Promise<Response> {
  const reparaciones = await getReparaciones_get();
  return res.status(200).json({ success: true, data: reparaciones });
}

// 🔹 Obtener una reparación por ID
export async function getReparacionById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const reparacion = await getReparacionById_get(Number(id));

  if (!reparacion) {
    return res.status(404).json({ success: false, message: "Reparación no encontrada" });
  }

  return res.status(200).json({ success: true, data: reparacion });
}

// 🔹 Crear reparación usando el nombre del usuario
export async function createReparacionByUserName(req: Request, res: Response): Promise<Response> {
  try {
    const { nombre, dispositivo, observaciones, costo, id_trabajador } = req.body;

    // 1. Buscar el id_user por nombre
    await db.connect();
    const sql = "SELECT id_user FROM user WHERE nombre = ?";
    const result: any = await db.query(sql, [nombre]);
    db.close();

    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    const id_user = result[0].id_user;

    // 2. Crear la reparación con el id_user encontrado
    const success = await createReparacion_post({
      estado: "Recibido",
      dispositivo,
      observaciones,
      costo,
      id_user,
      id_trabajador,
    });

    if (!success) {
      return res.status(400).json({ success: false, message: "No se pudo crear la reparación" });
    }

    return res.status(201).json({ success: true, message: "Reparación creada correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error al crear la reparación" });
  }
}

// 🔹 Actualizar reparación
export async function updateReparacion(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const success = await updateReparacion_put({ ...req.body, id_reparacion: Number(id) });

  if (!success) {
    return res.status(400).json({ success: false, message: "No se pudo actualizar la reparación" });
  }

  return res.status(200).json({ success: true, message: "Reparación actualizada correctamente" });
}

// 🔹 Eliminar reparación
export async function deleteReparacion(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const success = await deleteReparacion_delete(Number(id));

  if (!success) {
    return res.status(400).json({ success: false, message: "No se pudo eliminar la reparación" });
  }

  return res.status(200).json({ success: true, message: "Reparación eliminada correctamente" });
}

// 🔹 Obtener reparaciones por ID de usuario
export async function getReparacionesByUser(req: Request, res: Response): Promise<Response> {
  const { id_user } = req.params;
  const reparaciones = await getReparacionesByUser_get(Number(id_user));

  if (!reparaciones || reparaciones.length === 0) {
    return res.status(404).json({ success: false, message: "No se encontraron reparaciones para este usuario" });
  }

  return res.status(200).json({ success: true, data: reparaciones });
}

// 🔹 Obtener reparaciones por ID de trabajador
export async function getReparacionesByTrabajador(req: Request, res: Response): Promise<Response> {
  const { id_trabajador } = req.params;
  const reparaciones = await getReparacionesByTrabajador_get(Number(id_trabajador));

  if (!reparaciones || reparaciones.length === 0) {
    return res.status(404).json({ success: false, message: "No se encontraron reparaciones para este trabajador" });
  }

  return res.status(200).json({ success: true, data: reparaciones });
}

// 🔹 Cambiar estado de reparación
export async function updateEstadoReparacion(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const estadosPermitidos = ["Recibido", "Revisión", "Reparación", "Reparado", "Cancelado"];
    if (!estadosPermitidos.includes(estado)) {
      return res.status(400).json({ success: false, message: "Estado inválido" });
    }

    const success = await updateEstadoReparacion_put(Number(id), estado);

    if (!success) {
      return res.status(400).json({ success: false, message: "No se pudo actualizar el estado" });
    }

    const reparacion = await getReparacionById_get(Number(id));

    return res.status(200).json({
      success: true,
      message: "Estado actualizado correctamente",
      data: reparacion,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error al actualizar el estado" });
  }
}
