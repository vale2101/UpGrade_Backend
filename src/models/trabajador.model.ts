import MySQLConnector from '../db/connection';
import { trabajadorInterface } from '../interfaces/interfaces';

const db = new MySQLConnector();

// 🔹 Obtener todos los trabajadores
export async function getTrabajadores_get(): Promise<trabajadorInterface[]> {
  try {
    await db.connect();
    const sql = 'SELECT * FROM trabajador';
    const response: any = await db.query(sql);
    db.close();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 🔹 Obtener un trabajador por ID
export async function getTrabajadorById_get(id_trabajador: number): Promise<trabajadorInterface | null> {
  try {
    await db.connect();
    const sql = 'SELECT * FROM trabajador WHERE id_trabajador = ?';
    const response: any = await db.query(sql, [id_trabajador]);
    db.close();
    return response.length > 0 ? response[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 🔹 Crear trabajador
export async function createTrabajador_post(trabajador: trabajadorInterface): Promise<boolean> {
  try {
    await db.connect();
    const sql = `INSERT INTO trabajador 
      (nombre, apellido, correo, contrasena, telefono) 
      VALUES (?, ?, ?, ?, ?)`;
    const response: any = await db.query(sql, [
      trabajador.nombre,
      trabajador.apellido,
      trabajador.correo,
      trabajador.contrasena,
      trabajador.telefono || null,
    ]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Actualizar trabajador
export async function updateTrabajador_put(trabajador: trabajadorInterface): Promise<boolean> {
  try {
    if (!trabajador.id_trabajador) return false;

    await db.connect();
    const sql = `UPDATE trabajador 
      SET nombre = ?, apellido = ?, correo = ?, contrasena = ?, telefono = ? 
      WHERE id_trabajador = ?`;
    const response: any = await db.query(sql, [
      trabajador.nombre,
      trabajador.apellido,
      trabajador.correo,
      trabajador.contrasena,
      trabajador.telefono || null,
      trabajador.id_trabajador,
    ]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteTrabajador_delete(id_trabajador: number): Promise<boolean> {
  try {
    await db.connect();
    const sql = 'DELETE FROM trabajador WHERE id_trabajador = ?';
    const response: any = await db.query(sql, [id_trabajador]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}