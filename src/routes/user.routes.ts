import { Router } from "express";
import { validateSchema } from "../middleware/validateSchemas.middleware";
import {
  createUserSchema,
  updateUserSchema,
  loginUserSchema,
} from "../schemas/user.schemas";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserWithDireccion,
} from "../controller/user.controller";

const router = Router();

router.get("/usuarios", getUsers);

router.get("/usuarios/:id", getUserById);

router.post("/usuarios", validateSchema(createUserSchema), createUser);

router.put("/usuarios/:id", validateSchema(updateUserSchema), updateUser);

router.delete("/usuarios/:id", deleteUser);

router.post("/user/login", validateSchema(loginUserSchema), loginUser);
router.get("/usuarios/:id/direccion", getUserWithDireccion);

export default router;