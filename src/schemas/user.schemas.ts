import { z } from "zod";

export const createUserSchema = z.object({
  nombre: z
    .string()
    .nonempty("El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),

  apellido: z
    .string()
    .nonempty("El apellido es obligatorio")
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(100, "El apellido no puede superar los 100 caracteres"),

  correo: z
    .string()
    .nonempty("El correo es obligatorio")
    .email("El correo debe tener un formato válido"),

  contrasena: z
    .string()
    .nonempty("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),

  telefono: z.string().optional(),

  id_direccion: z.number().int("Debe ser un número entero").optional(),
});

export const updateUserSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres")
    .optional(),

  apellido: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(100, "El apellido no puede superar los 100 caracteres")
    .optional(),

  correo: z.string().email("El correo debe ser válido").optional(),

  contrasena: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").optional(),

  telefono: z.string().optional(),

  id_direccion: z.number().int("Debe ser un número entero").optional(),
});

export const loginUserSchema = z.object({
  correo: z
    .string()
    .nonempty("El correo es obligatorio")
    .email("Debe ingresar un correo electrónico válido"),

  contrasena: z.string().nonempty("La contraseña es obligatoria"),
});