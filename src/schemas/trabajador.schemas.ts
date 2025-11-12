import { z } from "zod";

export const createTrabajadorSchema = z.object({
  nombre: z.string().min(2, "El nombre es obligatorio"),
  apellido: z.string().min(2, "El apellido es obligatorio"),
  correo: z.string().email("Correo inválido"),
  telefono: z.string().min(7, "El teléfono es obligatorio"),
  contrasena: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  producto: z.string().min(2, "El producto es obligatorio"),
});

export const updateTrabajadorSchema = createTrabajadorSchema.partial();