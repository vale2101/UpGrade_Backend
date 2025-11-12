import MySQLConnector from '../db/connection';
import { userInterface } from '../interfaces/interfaces';

const db = new MySQLConnector();

// 🔹 Obtener todos los usuarios
export async function getUsers_get(): Promise<userInterface[]> {
  try {
    await db.connect();
    const sql = 'SELECT * FROM user';
    const response: any = await db.query(sql);
    db.close();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 🔹 Obtener un usuario por ID
export async function getUserById_get(id_user: number): Promise<userInterface | null> {
  try {
    await db.connect();
    const sql = 'SELECT * FROM user WHERE id_user = ?';
    const response: any = await db.query(sql, [id_user]);
    db.close();
    return response.length > 0 ? response[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 🔹 Crear usuario
export async function createUser_post(user: userInterface): Promise<boolean> {
  try {
    await db.connect();
    const sql = `INSERT INTO user 
      (nombre, apellido, correo, contrasena, telefono, id_direccion, fecha_registro) 
      VALUES (?, ?, ?, ?, ?, ?, NOW())`;
    const response: any = await db.query(sql, [
      user.nombre,
      user.apellido,
      user.correo,
      user.contrasena,
      user.telefono || null,
      user.id_direccion || null,
    ]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Actualizar usuario
export async function updateUser_put(user: userInterface): Promise<boolean> {
  try {
    if (!user.id_user) return false;

    await db.connect();
    const sql = `UPDATE user 
      SET nombre = ?, apellido = ?, correo = ?, contrasena = ?, telefono = ?, id_direccion = ? 
      WHERE id_user = ?`;
    const response: any = await db.query(sql, [
      user.nombre,
      user.apellido,
      user.correo,
      user.contrasena,
      user.telefono || null,
      user.id_direccion || null,
      user.id_user,
    ]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Eliminar usuario (DELETE físico)
export async function deleteUser_delete(id_user: number): Promise<boolean> {
  try {
    await db.connect();
    const sql = 'DELETE FROM user WHERE id_user = ?';
    const response: any = await db.query(sql, [id_user]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Obtener usuario con su dirección
export async function getUserWithDireccion_get(id_user: number): Promise<any | null> {
  try {
    await db.connect();
    const sql = `
      SELECT 
        u.id_user,
        u.nombre,
        u.apellido,
        u.correo,
        u.telefono,
        u.fecha_registro,
        d.id_direccion,
        d.pais,
        d.departamento,
        d.ciudad,
        d.completa
      FROM user u
      LEFT JOIN direccion d ON u.id_direccion = d.id_direccion
      WHERE u.id_user = ?
    `;
    const response: any = await db.query(sql, [id_user]);
    db.close();
    return response.length > 0 ? response[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}