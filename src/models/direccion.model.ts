import MySQLConnector from '../db/connection';
import { direccionInterface } from '../interfaces/interfaces';

const db = new MySQLConnector();

// 🔹 Obtener todas las direcciones
export async function getDirecciones_get(): Promise<direccionInterface[]> {
  try {
    await db.connect();
    const sql = 'SELECT * FROM direccion';
    const response: any = await db.query(sql);
    db.close();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 🔹 Obtener una dirección por ID
export async function getDireccionById_get(id_direccion: number): Promise<direccionInterface | null> {
  try {
    await db.connect();
    const sql = 'SELECT * FROM direccion WHERE id_direccion = ?';
    const response: any = await db.query(sql, [id_direccion]);
    db.close();
    return response.length > 0 ? response[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 🔹 Crear dirección
export async function createDireccion_post(direccion: direccionInterface): Promise<boolean> {
  try {
    await db.connect();
    const sql = `INSERT INTO direccion (pais, departamento, ciudad, completa)
                 VALUES (?, ?, ?, ?)`;
    const response: any = await db.query(sql, [
      direccion.pais,
      direccion.departamento,
      direccion.ciudad,
      direccion.completa,
    ]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Actualizar dirección
export async function updateDireccion_put(direccion: direccionInterface): Promise<boolean> {
  try {
    if (!direccion.id_direccion) return false;

    await db.connect();
    const sql = `UPDATE direccion
                 SET pais = ?, departamento = ?, ciudad = ?, completa = ?
                 WHERE id_direccion = ?`;
    const response: any = await db.query(sql, [
      direccion.pais,
      direccion.departamento,
      direccion.ciudad,
      direccion.completa,
      direccion.id_direccion,
    ]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Eliminar dirección
export async function deleteDireccion_delete(id_direccion: number): Promise<boolean> {
  try {
    await db.connect();
    const sql = 'DELETE FROM direccion WHERE id_direccion = ?';
    const response: any = await db.query(sql, [id_direccion]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}