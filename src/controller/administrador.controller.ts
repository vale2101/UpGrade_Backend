import { Request, Response } from "express";
import { HttpStatusCode } from "axios";
import {
  getAdministradores_get,
  getAdministradorById_get,
  createAdministrador_post,
  updateAdministrador_put,
  deleteAdministrador_delete,
} from "../models/administrador.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secretKey = "clave-secreta";

// 🔹 LOGIN administrador
export async function loginAdministrador(req: Request, res: Response): Promise<Response> {
  try {
    const { correo, contrasena } = req.body;
    const administradores = await getAdministradores_get();
    const administrador = administradores.find((a) => a.correo === correo);

    if (!administrador) {
      return res
        .status(HttpStatusCode.Unauthorized)
        .json({ success: false, message: "Administrador no encontrado" });
    }

    // Validar contraseña (hash bcrypt o texto plano)
    const validPassword = administrador.contrasena.startsWith("$2b$")
      ? await bcrypt.compare(contrasena, administrador.contrasena)
      : contrasena === administrador.contrasena;

    if (!validPassword) {
      return res
        .status(HttpStatusCode.Unauthorized)
        .json({ success: false, message: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign({ administradorId: administrador.id_administrador }, secretKey, { expiresIn: "1h" });

    // Guardar token en cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hora
    });

    return res.status(HttpStatusCode.Ok).json({
      success: true,
      message: "Login exitoso",
      data: {
        administrador: {
          id_administrador: administrador.id_administrador,
          nombre: administrador.nombre,
          apellido: administrador.apellido,
          correo: administrador.correo,
          telefono: administrador.telefono,
        },
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ success: false, message: "Error en el servidor" });
  }
}

// 🔹 GET all
export async function getAdministradores(req: Request, res: Response): Promise<Response> {
  try {
    const administradores = await getAdministradores_get();
    return res.status(HttpStatusCode.Ok).json({ data: administradores });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error al obtener administradores" });
  }
}

// 🔹 GET by ID
export async function getAdministradorById(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const administrador = await getAdministradorById_get(Number(id));
    if (!administrador) {
      return res.status(HttpStatusCode.NotFound).json({ message: "Administrador no encontrado" });
    }
    return res.status(HttpStatusCode.Ok).json({ data: administrador });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}

// 🔹 POST create
export async function createAdministrador(req: Request, res: Response): Promise<Response> {
  try {
    const { nombre, apellido, correo, contrasena, telefono } = req.body;

    const passSalt = bcrypt.genSaltSync(10);
    const encryptedPass = bcrypt.hashSync(contrasena, passSalt);

    const success = await createAdministrador_post({
      nombre,
      apellido,
      correo,
      contrasena: encryptedPass,
      telefono,
    });

    if (!success) {
      return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo crear el administrador" });
    }
    return res.status(HttpStatusCode.Ok).json({ message: "Administrador creado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}

// 🔹 PUT update
export async function updateAdministrador(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { nombre, apellido, correo, contrasena, telefono } = req.body;

    const encryptedPass = contrasena ? bcrypt.hashSync(contrasena, 10) : undefined;

    const success = await updateAdministrador_put({
      id_administrador: Number(id),
      nombre,
      apellido,
      correo,
      contrasena: encryptedPass || contrasena,
      telefono,
    });

    if (!success) {
      return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo actualizar el administrador" });
    }

    return res.status(HttpStatusCode.Ok).json({ message: "Administrador actualizado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}

// 🔹 DELETE eliminar
export async function deleteAdministrador(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const success = await deleteAdministrador_delete(Number(id));

    if (!success) {
      return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo eliminar el administrador" });
    }
    return res.status(HttpStatusCode.Ok).json({ message: "Administrador eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}

// 🔹 LOGOUT administrador
export async function logoutAdministrador(req: Request, res: Response): Promise<Response> {
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
