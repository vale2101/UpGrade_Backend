import { z } from "zod";

// 🔹 Crear administrador
export const createAdministradorSchema = z.object({
  nombre: z.string().min(2, "El nombre es obligatorio"),
  apellido: z.string().min(2, "El apellido es obligatorio"),
  correo: z.string().email("Correo inválido"),
  telefono: z.string().min(7, "El teléfono es obligatorio"),
  contrasena: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// 🔹 Login administrador
export const loginAdministradorSchema = z.object({
  correo: z
    .string()
    .nonempty("El correo es obligatorio")
    .email("Debe ingresar un correo electrónico válido"),

  contrasena: z.string().nonempty("La contraseña es obligatoria"),
});

// 🔹 Actualizar administrador (todos los campos opcionales)
export const updateAdministradorSchema = createAdministradorSchema.partial();
