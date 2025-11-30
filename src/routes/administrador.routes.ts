import { Router } from "express";
import {
  loginAdministrador,
  logoutAdministrador,
  getAdministradores,
  getAdministradorById,
  createAdministrador,
  updateAdministrador,
  deleteAdministrador,
} from "../controller/administrador.controller";

import {
  createAdministradorSchema,
  updateAdministradorSchema,
  loginAdministradorSchema,
} from "../schemas/administrador.schemas";

import { validateSchema } from "../middleware/validateSchemas.middleware";

const router = Router();

// 🔹 Login y Logout
router.post("/administradores/login", validateSchema(loginAdministradorSchema), loginAdministrador);
router.post("/administradores/logout", logoutAdministrador);

// 🔹 CRUD básico
router.get("/administradores", getAdministradores);                  // Obtener todos
router.get("/administradores/:id", getAdministradorById);            // Obtener por ID
router.post("/administradores", validateSchema(createAdministradorSchema), createAdministrador); // Crear
router.put("/administradores/:id", validateSchema(updateAdministradorSchema), updateAdministrador); // Actualizar
router.delete("/administradores/:id", deleteAdministrador);          // Eliminar

export default router;
