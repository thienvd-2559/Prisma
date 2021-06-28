import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const UserServices = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};

export { UserServices };
