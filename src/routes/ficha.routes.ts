import { Router } from "express";
import {
  getFichas,
  getFichaById,
  createFicha,
  updateFicha,
  deleteFicha,
} from "../controller/ficha.controller";
import {
  createFichaSchema,
  updateFichaSchema,
} from "../schemas/fichas.schemas";
import { validateSchema } from "../middleware/validateSchemas.middleware";

const router = Router();

router.get("/fichas", getFichas);

router.get("/fichas/:id", getFichaById);

router.post("/fichas", validateSchema(createFichaSchema), createFicha);

router.put("/fichas/:id", validateSchema(updateFichaSchema), updateFicha);

router.delete("/fichas/:id", deleteFicha);

export default router;