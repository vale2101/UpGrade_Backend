import { Request, Response } from "express";
import { HttpStatusCode } from "axios";
import {
  getUsers_get,
  getUserById_get,
  createUser_post,
  updateUser_put,
  deleteUser_delete,
  getUserWithDireccion_get,
} from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secretKey = "clave-secreta";

// 🔹 LOGIN
export async function loginUser(req: Request, res: Response): Promise<Response> {
  try {
    const { correo, contrasena } = req.body;
    const users = await getUsers_get();
    const user = users.find((u) => u.correo === correo);

    if (!user) {
      return res.status(HttpStatusCode.Unauthorized).json({ success: false, message: "Usuario no encontrado" });
    }

    const validPassword = user.contrasena.startsWith("$2b$")
      ? await bcrypt.compare(contrasena, user.contrasena)
      : contrasena === user.contrasena;

    if (!validPassword) {
      return res.status(HttpStatusCode.Unauthorized).json({ success: false, message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ userId: user.id_user }, secretKey, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    return res.status(HttpStatusCode.Ok).json({
      success: true,
      message: "Login exitoso",
      data: {
        user: {
          id_user: user.id_user,
          nombre: user.nombre,
          apellido: user.apellido,
          correo: user.correo,
          telefono: user.telefono,
          id_direccion: user.id_direccion,
          fecha_registro: user.fecha_registro,
        },
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ success: false, message: "Error en el servidor" });
  }
}


// 🔹 GET all
export async function getUsers(req: Request, res: Response): Promise<Response> {
  try {
    const users = await getUsers_get();
    return res.status(HttpStatusCode.Ok).json({ data: users });
  } catch (error) {
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error al obtener usuarios" });
  }
}

// 🔹 GET by ID
export async function getUserById(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const user = await getUserById_get(Number(id));
    if (!user) {
      return res.status(HttpStatusCode.NotFound).json({ message: "Usuario no encontrado" });
    }
    return res.status(HttpStatusCode.Ok).json({ data: user });
  } catch (error) {
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}

// 🔹 POST create
export async function createUser(req: Request, res: Response): Promise<Response> {
  try {
    const { nombre, apellido, correo, contrasena, telefono, id_direccion } = req.body;

    const passSalt = bcrypt.genSaltSync(10);
    const encryptedPass = bcrypt.hashSync(contrasena, passSalt);

    const success = await createUser_post({
      nombre,
      apellido,
      correo,
      contrasena: encryptedPass,
      telefono,
      id_direccion,
    });

    if (!success) {
      return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo crear el usuario" });
    }
    return res.status(HttpStatusCode.Ok).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}

// 🔹 PUT update
export async function updateUser(req: Request, res: Response): Promise<Response> {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(HttpStatusCode.Unauthorized).json({ message: "No hay token" });
    }

    const decoded: any = jwt.verify(token, secretKey);
    console.log(decoded);

    const { id } = req.params;
    const { nombre, apellido, correo, contrasena, telefono, id_direccion } = req.body;

    const encryptedPass = contrasena ? bcrypt.hashSync(contrasena, 10) : undefined;

    const success = await updateUser_put({
      id_user: Number(id),
      nombre,
      apellido,
      correo,
      contrasena: encryptedPass || contrasena,
      telefono,
      id_direccion,
    });

    if (!success) {
      return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo actualizar el usuario" });
    }

    return res.status(HttpStatusCode.Ok).json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}

// 🔹 DELETE eliminar
export async function deleteUser(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const success = await deleteUser_delete(Number(id));

    if (!success) {
      return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo eliminar el usuario" });
    }
    return res.status(HttpStatusCode.Ok).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}
// 🔹 Obtener usuario con su dirección
export async function getUserWithDireccion(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const direcciones = await getUserWithDireccion_get(Number(id));

    if (!direcciones) {
      return res.status(HttpStatusCode.NotFound).json({ message: "Usuario no encontrado o sin direcciones" });
    }

    return res.status(HttpStatusCode.Ok).json({ data: direcciones }); // ✅ devuelve array de direcciones
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}
export async function logoutUser(req: Request, res: Response): Promise<Response> {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(HttpStatusCode.Ok).json({ success: true, message: "Logout exitoso" });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ success: false, message: "Error en el servidor" });
  }
}

