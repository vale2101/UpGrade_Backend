import MySQLConnector from "../db/connection";
import { productoInterface } from "../interfaces/interfaces";

const db = new MySQLConnector();

// 🔹 Obtener todos los productos
export async function getProductos_get(): Promise<productoInterface[]> {
  try {
    await db.connect();
    const sql = "SELECT * FROM producto";
    const response: any = await db.query(sql);
    db.close();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 🔹 Obtener producto por ID
export async function getProductoById_get(id_producto: number): Promise<productoInterface | null> {
  try {
    await db.connect();
    const sql = "SELECT * FROM producto WHERE id_producto = ?";
    const response: any = await db.query(sql, [id_producto]);
    db.close();
    return response.length > 0 ? response[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 🔹 Crear producto
export async function createProducto_post(producto: productoInterface): Promise<boolean> {
  try {
    await db.connect();
    const sql = `INSERT INTO producto 
      (nombre, precio, categoria, stock, tipo, color, capacidad, id_ficha, foto, foto2, foto3)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const response: any = await db.query(sql, [
      producto.nombre,
      producto.precio,
      producto.categoria,
      producto.stock,
      producto.tipo,
      producto.color,
      producto.capacidad,
      producto.id_ficha,
      producto.foto,
      producto.foto2 || null,
      producto.foto3 || null,
    ]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Actualizar producto
export async function updateProducto_put(producto: productoInterface): Promise<boolean> {
  try {
    if (!producto.id_producto) return false;

    await db.connect();
    const sql = `UPDATE producto SET 
      nombre=?, precio=?, categoria=?, stock=?, tipo=?, color=?, capacidad=?, id_ficha=?, foto=?, foto2=?, foto3=? 
      WHERE id_producto=?`;
    const response: any = await db.query(sql, [
      producto.nombre,
      producto.precio,
      producto.categoria,
      producto.stock,
      producto.tipo,
      producto.color,
      producto.capacidad,
      producto.id_ficha,
      producto.foto,
      producto.foto2 || null,
      producto.foto3 || null,
      producto.id_producto,
    ]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Eliminar producto
export async function deleteProducto_delete(id_producto: number): Promise<boolean> {
  try {
    await db.connect();
    const sql = "DELETE FROM producto WHERE id_producto = ?";
    const response: any = await db.query(sql, [id_producto]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Actualizar solo el stock de un producto
export async function updateProductoStock_put(id_producto: number, stock: number): Promise<boolean> {
  try {
    await db.connect();
    const sql = "UPDATE producto SET stock = ? WHERE id_producto = ?";
    const response: any = await db.query(sql, [stock, id_producto]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}
