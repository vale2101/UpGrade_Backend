import { Router } from "express";
import {
  getTrabajadores,
  getTrabajadorById,
  createTrabajador,
  updateTrabajador,
  deleteTrabajador,
  logoutUser,
  loginTrabajador,
} from "../controller/trabajador.controller";
import {
  createTrabajadorSchema,
  updateTrabajadorSchema,
  loginTrabajadorSchema
} from "../schemas/trabajador.schemas";
import { validateSchema } from "../middleware/validateSchemas.middleware";

const router = Router();

router.get("/trabajadores", getTrabajadores);

router.post("/trabajadores/logout",logoutUser ); 

router.get("/trabajadores/:id", getTrabajadorById);

router.post("/trabajadores/login", validateSchema(loginTrabajadorSchema), loginTrabajador);

router.post("/trabajadores", validateSchema(createTrabajadorSchema), createTrabajador);

router.put("/trabajadores/:id", validateSchema(updateTrabajadorSchema), updateTrabajador);

router.delete("/trabajadores/:id", deleteTrabajador);

export default router;