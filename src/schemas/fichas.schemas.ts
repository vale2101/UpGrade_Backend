import { z } from "zod";

export const createFichaSchema = z.object({
  pantalla: z.string().min(2, "La pantalla es obligatoria"),
  procesador: z.string().min(2, "El procesador es obligatorio"),
  camara: z.string().min(2, "La cámara es obligatoria"),
  memoria: z.string().min(2, "La memoria es obligatoria"),
  sistemaO: z.string().min(2, "El sistema operativo es obligatorio"),
  garantia: z.string().min(2, "La garantía es obligatoria"),
  estado: z.string().min(2, "El estado es obligatorio"),
});

export const updateFichaSchema = createFichaSchema.partial();