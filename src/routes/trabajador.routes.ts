import { Router } from "express";
import {
  getTrabajadores,
  getTrabajadorById,
  createTrabajador,
  updateTrabajador,
  deleteTrabajador,
} from "../controller/trabajador.controller";
import {
  createTrabajadorSchema,
  updateTrabajadorSchema,
} from "../schemas/trabajador.schemas";
import { validateSchema } from "../middleware/validateSchemas.middleware";

const router = Router();

router.get("/trabajadores", getTrabajadores);

router.get("/trabajadores/:id", getTrabajadorById);

router.post("/trabajadores", validateSchema(createTrabajadorSchema), createTrabajador);

router.put("/trabajadores/:id", validateSchema(updateTrabajadorSchema), updateTrabajador);

router.delete("/trabajadores/:id", deleteTrabajador);

export default router;