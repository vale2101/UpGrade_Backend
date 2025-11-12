import { Router } from "express";
import {
  getDirecciones,
  getDireccionById,
  createDireccion,
  updateDireccion,
  deleteDireccion,
} from "../controller/direccion.controller";
import {
  createDireccionSchema,
  updateDireccionSchema,
} from "../schemas/direccion.schemas";
import { validateSchema } from "../middleware/validateSchemas.middleware";

const router = Router();

router.get("/direcciones", getDirecciones);

router.get("/direcciones/:id", getDireccionById);

router.post("/direcciones", validateSchema(createDireccionSchema), createDireccion);

router.put("/direcciones/:id", validateSchema(updateDireccionSchema), updateDireccion);

router.delete("/direcciones/:id", deleteDireccion);

export default router;