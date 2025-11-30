import { Router } from "express";
import {
  getFichas,
  getFichaById,
  createFicha,
  updateFicha,
  deleteFicha,
  getFichaByProductoId, 
} from "../controller/ficha.controller";
import {
  createFichaSchema,
  updateFichaSchema,
} from "../schemas/fichas.schemas";
import { validateSchema } from "../middleware/validateSchemas.middleware";

const router = Router();

router.get("/fichas", getFichas);

router.get("/fichas/:id", getFichaById);

router.get("/productos/:id_producto/ficha", getFichaByProductoId);

router.post("/fichas", validateSchema(createFichaSchema), createFicha);

router.put("/fichas/:id", validateSchema(updateFichaSchema), updateFicha);

router.delete("/fichas/:id", deleteFicha);

export default router;
