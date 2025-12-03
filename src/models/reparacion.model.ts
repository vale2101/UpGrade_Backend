import MySQLConnector from "../db/connection";
import { reparacionInterface } from "../interfaces/interfaces";

const db = new MySQLConnector();

// 🔹 Obtener todas las reparaciones
export async function getReparaciones_get(): Promise<reparacionInterface[]> {
  try {
    await db.connect();
    const sql = "SELECT * FROM reparacion";
    const response: any = await db.query(sql);
    db.close();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 🔹 Obtener reparación por ID
export async function getReparacionById_get(id_reparacion: number): Promise<reparacionInterface | null> {
  try {
    await db.connect();
    const sql = "SELECT * FROM reparacion WHERE id_reparacion = ?";
    const response: any = await db.query(sql, [id_reparacion]);
    db.close();
    return response.length > 0 ? response[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 🔹 Crear reparación
export async function createReparacion_post(reparacion: reparacionInterface): Promise<boolean> {
  try {
    await db.connect();
    const sql = `INSERT INTO reparacion 
      (estado, dispositivo, observaciones, costo, id_user, id_trabajador)
      VALUES (?, ?, ?, ?, ?, ?)`;
    const response: any = await db.query(sql, [
      reparacion.estado || "Recibido",
      reparacion.dispositivo,
      reparacion.observaciones || null,
      reparacion.costo || 0.0,
      reparacion.id_user,
      reparacion.id_trabajador,
    ]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Actualizar reparación completa
export async function updateReparacion_put(reparacion: reparacionInterface): Promise<boolean> {
  try {
    if (!reparacion.id_reparacion) return false;

    await db.connect();
    const sql = `UPDATE reparacion SET 
      estado=?, dispositivo=?, observaciones=?, costo=?, id_user=?, id_trabajador=? 
      WHERE id_reparacion=?`;
    const response: any = await db.query(sql, [
      reparacion.estado,
      reparacion.dispositivo,
      reparacion.observaciones || null,
      reparacion.costo,
      reparacion.id_user,
      reparacion.id_trabajador,
      reparacion.id_reparacion,
    ]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Eliminar reparación
export async function deleteReparacion_delete(id_reparacion: number): Promise<boolean> {
  try {
    await db.connect();
    const sql = "DELETE FROM reparacion WHERE id_reparacion = ?";
    const response: any = await db.query(sql, [id_reparacion]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Obtener reparaciones por ID de usuario
export async function getReparacionesByUser_get(id_user: number): Promise<reparacionInterface[]> {
  try {
    await db.connect();
    const sql = "SELECT * FROM reparacion WHERE id_user = ?";
    const response: any = await db.query(sql, [id_user]);
    db.close();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 🔹 Obtener reparaciones por ID de trabajador
export async function getReparacionesByTrabajador_get(id_trabajador: number): Promise<reparacionInterface[]> {
  try {
    await db.connect();
    const sql = "SELECT * FROM reparacion WHERE id_trabajador = ?";
    const response: any = await db.query(sql, [id_trabajador]);
    db.close();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 🔹 Cambiar estado de reparación
export async function updateEstadoReparacion_put(id_reparacion: number, estado: string): Promise<boolean> {
  try {
    await db.connect();
    const sql = "UPDATE reparacion SET estado = ? WHERE id_reparacion = ?";
    const response: any = await db.query(sql, [estado, id_reparacion]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}
