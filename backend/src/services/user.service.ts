import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken, generateRefreshToken } from "../utils/jwt.util";
import { UserAttributes } from "../types/user"; // Optional: for reusable types

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error("User already exists");

  const password_hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username: name,
    email,
    password_hash,
    role_id: 2, // Set a default role_id as needed
  });

  const accessToken = generateToken({ id: user.id, name: user.username });
  const refreshToken = generateRefreshToken({
    id: user.id,
    name: user.username,
  });

  return { user, accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateToken({ id: user.id, name: user.username });
  const refreshToken = generateRefreshToken({
    id: user.id,
    name: user.username,
  });

  return { user, accessToken, refreshToken };
};

export const updateUserService = async (
  id: string,
  updateData: Partial<{ name: string; email: string; password: string }>
) => {
  const updates: Partial<UserAttributes> = {};

  if (updateData.name) updates.username = updateData.name;
  if (updateData.email) updates.email = updateData.email;
  if (updateData.password) {
    updates.password_hash = await bcrypt.hash(updateData.password, 10);
  }

  const [updatedCount, [updatedUser]] = await User.update(updates, {
    where: { id },
    returning: true,
  });

  return updatedCount === 0 ? null : updatedUser;
};

export const deleteUserService = async (id: string): Promise<boolean> => {
  const deletedCount = await User.destroy({ where: { id } });
  return deletedCount > 0;
};

export const getUserService = async (id: string) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password_hash"] },
  });
  return user;
};
