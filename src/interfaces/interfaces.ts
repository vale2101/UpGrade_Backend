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
  producto: string;
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
