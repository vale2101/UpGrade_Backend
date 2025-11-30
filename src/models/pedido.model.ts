import MySQLConnector from '../db/connection';

const db = new MySQLConnector();

// 🔹 Crear pedido
export async function createPedido_post(pedido: {
  id_user: number;
  id_direccion: number;
  productos: { id_producto: number; cantidad: number }[];
}): Promise<boolean> {
  try {
    await db.connect();

    const sql = `
      INSERT INTO pedido (id_user, id_direccion, estado, productos, total)
      SELECT ?, ?, 'Pendiente',
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id_producto', p.id_producto,
            'cantidad', datos.cantidad,
            'precio', p.precio
          )
        ) AS productos,
        SUM(p.precio * datos.cantidad) AS total
      FROM producto p
      JOIN (
        ${pedido.productos
          .map(
            (prod) =>
              `SELECT ${prod.id_producto} AS id_producto, ${prod.cantidad} AS cantidad`
          )
          .join(' UNION ALL ')}
      ) AS datos
      ON p.id_producto = datos.id_producto
    `;

    const response: any = await db.query(sql, [pedido.id_user, pedido.id_direccion]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Obtener todos los pedidos
export async function getPedidos_get(): Promise<any[]> {
  try {
    await db.connect();
    const sql = 'SELECT * FROM pedido';
    const response: any = await db.query(sql);
    db.close();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 🔹 Obtener pedido por ID
export async function getPedidoById_get(id_pedido: number): Promise<any | null> {
  try {
    await db.connect();
    const sql = 'SELECT * FROM pedido WHERE id_pedido = ?';
    const response: any = await db.query(sql, [id_pedido]);
    db.close();
    return response.length > 0 ? response[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 🔹 Obtener productos de un pedido descomponiendo el JSON
export async function getProductosByPedidoId_get(id_pedido: number): Promise<any[]> {
  try {
    await db.connect();
    const sql = `
      SELECT jt.id_producto, jt.cantidad, jt.precio
      FROM pedido p,
      JSON_TABLE(
        p.productos,
        '$[*]' COLUMNS (
          id_producto INT PATH '$.id_producto',
          cantidad INT PATH '$.cantidad',
          precio DECIMAL(10,2) PATH '$.precio'
        )
      ) AS jt
      WHERE p.id_pedido = ?
    `;
    const response: any = await db.query(sql, [id_pedido]);
    db.close();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 🔹 Obtener pedidos por usuario
export async function getPedidosByUserId_get(id_user: number): Promise<any[]> {
  try {
    await db.connect();
    const sql = 'SELECT * FROM pedido WHERE id_user = ?';
    const response: any = await db.query(sql, [id_user]);
    db.close();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 🔹 Actualizar estado de pedido
export async function updatePedido_put(pedido: { id_pedido: number; estado: string }): Promise<boolean> {
  try {
    await db.connect();
    const sql = 'UPDATE pedido SET estado = ? WHERE id_pedido = ?';
    const response: any = await db.query(sql, [pedido.estado, pedido.id_pedido]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Eliminar pedido
export async function deletePedido_delete(id_pedido: number): Promise<boolean> {
  try {
    await db.connect();
    const sql = 'DELETE FROM pedido WHERE id_pedido = ?';
    const response: any = await db.query(sql, [id_pedido]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}
