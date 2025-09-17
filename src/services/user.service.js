import { AppDataSource } from "../config/configDB.js";
import { Usuario } from "../entities/user.entity.js";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(Usuario);

export async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = userRepository.create({
    email: data.email,
    password: hashedPassword,
  });

  return await userRepository.save(newUser);
}

export async function findUserByEmail(email) {
  return await userRepository.findOneBy({ email });
}

// NUEVAS FUNCIONES

export async function updateUserById(userId, data) {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) throw new Error("Usuario no encontrado");

  if (data.email) user.email = data.email;
  if (data.password) user.password = await bcrypt.hash(data.password, 10);

  return await userRepository.save(user);
}

export async function deleteUserById(userId) {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) throw new Error("Usuario no encontrado");

  await userRepository.remove(user);
  return { message: "Usuario eliminado exitosamente" };
}
