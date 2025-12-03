import { z } from "zod";

export const createReparacionSchema = z.object({
  estado: z.string().refine(
    (val) => ["Recibido", "Revisión", "Reparación", "Reparado", "Cancelado"].includes(val),
    { message: "El estado debe ser 'Recibido', 'Revisión', 'Reparación', 'Reparado' o 'Cancelado'" }
  ).default("Recibido"),

  dispositivo: z.string().min(2, "El dispositivo es obligatorio"),

  observaciones: z.string().optional().nullable(),

  costo: z.number().nonnegative("El costo no puede ser negativo"),

  id_user: z.number().int().positive("El id_user debe ser válido"),

  id_trabajador: z.number().int().positive("El id_trabajador debe ser válido"),
});

export const updateReparacionSchema = createReparacionSchema.partial();
