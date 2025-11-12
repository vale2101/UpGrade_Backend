import { z } from "zod";

export const createDireccionSchema = z.object({
  pais: z.string().min(2, "El país es obligatorio"),
  departamento: z.string().min(2, "El departamento es obligatorio"),
  ciudad: z.string().min(2, "La ciudad es obligatoria"),
  completa: z.string().min(5, "La dirección completa es obligatoria"),
});

export const updateDireccionSchema = createDireccionSchema.partial();