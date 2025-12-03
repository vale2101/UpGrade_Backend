import { Router } from "express";
import {
  getReparaciones,
  getReparacionById,
  createReparacionByUserName,
  updateReparacion,
  deleteReparacion,
  getReparacionesByUser,
  getReparacionesByTrabajador,
  updateEstadoReparacion,
} from "../controller/reparacion.controller";

const router = Router();

// 🔹 CRUD básico
router.get("/reparaciones", getReparaciones);              // Obtener todas las reparaciones
router.get("/reparaciones/:id", getReparacionById);        // Obtener reparación por ID
router.post("/reparaciones", createReparacionByUserName);            // Crear reparación
router.put("/reparaciones/:id", updateReparacion);         // Actualizar reparación
router.delete("/reparaciones/:id", deleteReparacion);      // Eliminar reparación

// 🔹 Reparaciones por usuario
router.get("/usuarios/:id_user/reparaciones", getReparacionesByUser);

// 🔹 Reparaciones por trabajador
router.get("/trabajadores/:id_trabajador/reparaciones", getReparacionesByTrabajador);

// 🔹 Cambiar estado de reparación
router.put("/reparaciones/:id/estado", updateEstadoReparacion);

export default router;
