import { Request, Response } from "express";
import { HttpStatusCode } from "axios";
import {
  getTrabajadores_get,
  getTrabajadorById_get,
  createTrabajador_post,
  updateTrabajador_put,
  deleteTrabajador_delete,
} from "../models/trabajador.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secretKey = "clave-secreta";

// 🔹 LOGIN trabajador
export async function loginTrabajador(req: Request, res: Response): Promise<Response> {
  try {
    const { correo, contrasena } = req.body;
    const trabajadores = await getTrabajadores_get();
    const trabajador = trabajadores.find((t) => t.correo === correo);

    if (!trabajador) {
      return res
        .status(HttpStatusCode.Unauthorized)
        .json({ success: false, message: "Trabajador no encontrado" });
    }

    // Validar contraseña (hash bcrypt o texto plano)
    const validPassword = trabajador.contrasena.startsWith("$2b$")
      ? await bcrypt.compare(contrasena, trabajador.contrasena)
      : contrasena === trabajador.contrasena;

    if (!validPassword) {
      return res
        .status(HttpStatusCode.Unauthorized)
        .json({ success: false, message: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign({ trabajadorId: trabajador.id_trabajador }, secretKey, { expiresIn: "1h" });

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
        trabajador: {
          id_trabajador: trabajador.id_trabajador,
          nombre: trabajador.nombre,
          apellido: trabajador.apellido,
          correo: trabajador.correo,
          telefono: trabajador.telefono,
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
export async function getTrabajadores(req: Request, res: Response): Promise<Response> {
  try {
    const trabajadores = await getTrabajadores_get();
    return res.status(HttpStatusCode.Ok).json({ data: trabajadores });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error al obtener trabajadores" });
  }
}

// 🔹 GET by ID
export async function getTrabajadorById(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const trabajador = await getTrabajadorById_get(Number(id));
    if (!trabajador) {
      return res.status(HttpStatusCode.NotFound).json({ message: "Trabajador no encontrado" });
    }
    return res.status(HttpStatusCode.Ok).json({ data: trabajador });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}

// 🔹 POST create
export async function createTrabajador(req: Request, res: Response): Promise<Response> {
  try {
    const { nombre, apellido, correo, contrasena, telefono, producto } = req.body;

    const passSalt = bcrypt.genSaltSync(10);
    const encryptedPass = bcrypt.hashSync(contrasena, passSalt);

    const success = await createTrabajador_post({
      nombre,
      apellido,
      correo,
      contrasena: encryptedPass,
      telefono,
    });

    if (!success) {
      return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo crear el trabajador" });
    }
    return res.status(HttpStatusCode.Ok).json({ message: "Trabajador creado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}

// 🔹 PUT update
export async function updateTrabajador(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { nombre, apellido, correo, contrasena, telefono, producto } = req.body;

    const encryptedPass = contrasena ? bcrypt.hashSync(contrasena, 10) : undefined;

    const success = await updateTrabajador_put({
      id_trabajador: Number(id),
      nombre,
      apellido,
      correo,
      contrasena: encryptedPass || contrasena,
      telefono,
    });

    if (!success) {
      return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo actualizar el trabajador" });
    }

    return res.status(HttpStatusCode.Ok).json({ message: "Trabajador actualizado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}

// 🔹 DELETE eliminar
export async function deleteTrabajador(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const success = await deleteTrabajador_delete(Number(id));

    if (!success) {
      return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo eliminar el trabajador" });
    }
    return res.status(HttpStatusCode.Ok).json({ message: "Trabajador eliminado correctamente" });
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