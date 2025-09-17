import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";
import { updateUserById, deleteUserById } from "../services/user.service.js";

export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export function getPrivateProfile(req, res) {
  const user = req.user;

  handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
    message: `¡Hola, ${user.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
    userData: user,
  });
}



export async function updatePrivateProfile(req, res) {
  try {
    const userId = req.user.id; // ID desde el JWT
    const { email, password } = req.body;

    if (!email && !password) {
      return handleErrorClient(res, 400, "Debes enviar al menos email o password para actualizar");
    }

    const updatedUser = await updateUserById(userId, { email, password });
    delete updatedUser.password; // Nunca enviar la contraseña
    handleSuccess(res, 200, "Perfil actualizado exitosamente", updatedUser);
  } catch (error) {
    handleErrorServer(res, 500, "Error al actualizar perfil", error.message);
  }
}

export async function deletePrivateProfile(req, res) {
  try {
    const userId = req.user.id; // ID desde el JWT

    const result = await deleteUserById(userId);
    handleSuccess(res, 200, result.message, {});
  } catch (error) {
    handleErrorServer(res, 500, "Error al eliminar perfil", error.message);
  }
}

