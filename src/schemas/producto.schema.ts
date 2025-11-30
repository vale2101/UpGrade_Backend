import { z } from "zod";

export const createProductoSchema = z.object({
  nombre: z.string().min(2, "El nombre es obligatorio"),
  precio: z.number().positive("El precio debe ser mayor que 0"),
  categoria: z.string().min(2, "La categoría es obligatoria"),
  stock: z.number().int().nonnegative("El stock no puede ser negativo"),
  tipo: z.string().min(2, "El tipo es obligatorio").refine(
    (val) => ["Nuevo", "SemiNuevo", "Reacondicionado"].includes(val),
    { message: "El tipo debe ser 'Nuevo', 'SemiNuevo' o 'Reacondicionado'" }
  ),
  color: z.string().min(2, "El color es obligatorio"),
  capacidad: z.string().min(1, "La capacidad es obligatoria"),
  id_ficha: z.number().int().positive("El id_ficha debe ser válido"),
  foto: z.string().min(2, "La foto es obligatoria"), // obligatorio
  foto2: z.string().optional(), // opcional
  foto3: z.string().optional(), // opcional
});

export const updateProductoSchema = createProductoSchema.partial();
