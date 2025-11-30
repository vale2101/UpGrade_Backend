import MySQLConnector from '../db/connection';
import { administradorInterface } from '../interfaces/interfaces';

const db = new MySQLConnector();

// 🔹 Obtener todos los administradores
export async function getAdministradores_get(): Promise<administradorInterface[]> {
  try {
    await db.connect();
    const sql = 'SELECT * FROM administrador';
    const response: any = await db.query(sql);
    db.close();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 🔹 Obtener un administrador por ID
export async function getAdministradorById_get(id_administrador: number): Promise<administradorInterface | null> {
  try {
    await db.connect();
    const sql = 'SELECT * FROM administrador WHERE id_administrador = ?';
    const response: any = await db.query(sql, [id_administrador]);
    db.close();
    return response.length > 0 ? response[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 🔹 Crear administrador
export async function createAdministrador_post(administrador: administradorInterface): Promise<boolean> {
  try {
    await db.connect();
    const sql = `INSERT INTO administrador 
      (nombre, apellido, correo, telefono, contrasena) 
      VALUES (?, ?, ?, ?, ?)`;
    const response: any = await db.query(sql, [
      administrador.nombre,
      administrador.apellido,
      administrador.correo,
      administrador.telefono || null,
      administrador.contrasena,
    ]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Actualizar administrador
export async function updateAdministrador_put(administrador: administradorInterface): Promise<boolean> {
  try {
    if (!administrador.id_administrador) return false;

    await db.connect();
    const sql = `UPDATE administrador 
      SET nombre = ?, apellido = ?, correo = ?, telefono = ?, contrasena = ? 
      WHERE id_administrador = ?`;
    const response: any = await db.query(sql, [
      administrador.nombre,
      administrador.apellido,
      administrador.correo,
      administrador.telefono || null,
      administrador.contrasena,
      administrador.id_administrador,
    ]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Eliminar administrador
export async function deleteAdministrador_delete(id_administrador: number): Promise<boolean> {
  try {
    await db.connect();
    const sql = 'DELETE FROM administrador WHERE id_administrador = ?';
    const response: any = await db.query(sql, [id_administrador]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}
