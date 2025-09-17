import {
  findNotas,
  findNotaById,
  createNota,
  updateNota,
  deleteNota,
} from "../services/notas.services.js";
import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";

export class NotasController {
  async getAllNotas(req, res) {
    try {
      const notas = await findNotas();
      handleSuccess(res, 200, "Notas obtenidas exitosamente", notas);
    } catch (error) {
      handleErrorServer(res, 500, "Error al obtener las notas", error.message);
    }
  }

  async getNotaById(req, res) {
    try {
      const { notaId } = req.params;
      
      if (!notaId || isNaN(notaId)) {
        return handleErrorClient(res, 400, "ID de nota inválido");
      }
      
      const nota = await findNotaById(notaId);
      handleSuccess(res, 200, "Nota obtenida exitosamente", nota);
    } catch (error) {
      handleErrorClient(res, 404, error.message);
    }
  }

  async createNota(req, res) {
    try {
      const notaData = req.body;
      
      if (!notaData || Object.keys(notaData).length === 0) {
        return handleErrorClient(res, 400, "Datos de la nota son requeridos");
      }
      
      const nuevaNota = await createNota(notaData);
      handleSuccess(res, 201, "Nota creada exitosamente", nuevaNota);
    } catch (error) {
      handleErrorServer(res, 500, "Error al crear la nota", error.message);
    }
  }

  async updateNota(req, res) {
    try {
      const { notaId } = req.params;
      const notaData = req.body;
      
      if (!notaId || isNaN(notaId)) {
        return handleErrorClient(res, 400, "ID de nota inválido");
      }
      
      if (!notaData || Object.keys(notaData).length === 0) {
        return handleErrorClient(res, 400, "Datos para actualizar son requeridos");
      }
      
      const notaActualizada = await updateNota(notaId, notaData);
      handleSuccess(res, 200, "Nota actualizada exitosamente", notaActualizada);
    } catch (error) {
      handleErrorClient(res, 404, error.message);
    }
  }

  async deleteNota(req, res) {
    try {
      const { notaId } = req.params;
      
      if (!notaId || isNaN(notaId)) {
        return handleErrorClient(res, 400, "ID de nota inválido");
      }
      
      await deleteNota(notaId);
      handleSuccess(res, 200, "Nota eliminada exitosamente", { notaId });
    } catch (error) {
      handleErrorClient(res, 404, error.message);
    }
  }
}
