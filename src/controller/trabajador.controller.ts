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
      producto,
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
      producto,
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