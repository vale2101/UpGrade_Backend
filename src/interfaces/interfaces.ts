export interface userInterface {
  id_user?: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  telefono?: string;
  id_direccion?: number;
  fecha_registro?: string;
}
export interface direccionInterface {
  id_user?: number;
  id_direccion?: number;
  pais: string;
  departamento: string;
  ciudad: string;
  completa: string;
}
export interface trabajadorInterface {
  id_trabajador?: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  contrasena: string;
}
export interface fichaInterface {
  id_ficha?: number;
  pantalla: string;
  procesador: string;
  camara: string;
  memoria: string;
  sistemaO: string;
  garantia: string;
  estado: string;
}
export interface productoInterface {
  id_producto?: number;
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
  tipo: "Nuevo" | "SemiNuevo" | "Reacondicionado";
  color: string;
  capacidad: string;
  id_ficha: number;
  foto: string;        
  foto2?: string;      
  foto3?: string;      
  ficha?: fichaInterface; // opcional: para incluir datos de la ficha asociada
}
export interface PedidoProducto {
  id_producto: number;
  cantidad: number;
  precio: number;
}

export interface PedidoInterface {
  id_pedido?: number;        
  id_user: number;           
  id_direccion: number;      
  fecha?: string;           
  estado?: 'Pendiente' | 'Pagado' | 'Enviado' | 'Entregado' | 'Cancelado';
  productos: PedidoProducto[];
  total?: number;            
}
export interface administradorInterface {
  id_administrador?: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  contrasena: string;
}