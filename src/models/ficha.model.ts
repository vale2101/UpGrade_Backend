import MySQLConnector from '../db/connection';
import { fichaInterface } from '../interfaces/interfaces';

const db = new MySQLConnector();

// 🔹 Obtener todas las fichas
export async function getFichas_get(): Promise<fichaInterface[]> {
  try {
    await db.connect();
    const sql = 'SELECT * FROM ficha';
    const response: any = await db.query(sql);
    db.close();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 🔹 Obtener una ficha por ID
export async function getFichaById_get(id_ficha: number): Promise<fichaInterface | null> {
  try {
    await db.connect();
    const sql = 'SELECT * FROM ficha WHERE id_ficha = ?';
    const response: any = await db.query(sql, [id_ficha]);
    db.close();
    return response.length > 0 ? response[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 🔹 Crear ficha
// 🔹 Crear ficha
export async function createFicha_post(ficha: fichaInterface): Promise<number | null> {
  try {
    await db.connect();
    const sql = `INSERT INTO ficha (pantalla, procesador, camara, memoria, sistemaO, garantia, estado)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const response: any = await db.query(sql, [
      ficha.pantalla,
      ficha.procesador,
      ficha.camara,
      ficha.memoria,
      ficha.sistemaO,
      ficha.garantia,
      ficha.estado,
    ]);
    db.close();
    return response.insertId || null; // devolvemos el ID insertado
  } catch (error) {
    console.error(error);
    return null;
  }
}


// 🔹 Actualizar ficha
export async function updateFicha_put(ficha: fichaInterface): Promise<boolean> {
  try {
    if (!ficha.id_ficha) return false;

    await db.connect();
    const sql = `UPDATE ficha
                 SET pantalla = ?, procesador = ?, camara = ?, memoria = ?, sistemaO = ?, garantia = ?, estado = ?
                 WHERE id_ficha = ?`;
    const response: any = await db.query(sql, [
      ficha.pantalla,
      ficha.procesador,
      ficha.camara,
      ficha.memoria,
      ficha.sistemaO,
      ficha.garantia,
      ficha.estado,
      ficha.id_ficha,
    ]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Eliminar ficha
export async function deleteFicha_delete(id_ficha: number): Promise<boolean> {
  try {
    await db.connect();
    const sql = 'DELETE FROM ficha WHERE id_ficha = ?';
    const response: any = await db.query(sql, [id_ficha]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Obtener ficha por ID de producto
export async function getFichaByProductoId_get(id_producto: number): Promise<any | null> {
  try {
    await db.connect();
    const sql = `
      SELECT *
      FROM ficha
      WHERE id_ficha = (
        SELECT id_ficha
        FROM producto
        WHERE id_producto = ?
      )
    `;
    const response: any = await db.query(sql, [id_producto]);
    db.close();
    return response.length > 0 ? response[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}