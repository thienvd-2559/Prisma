import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();
import { Users } from "../controllers/User";

/* GET home page. */
router.get("/", async (req, res, next) => {
  // const allUsers = await prisma.user.findMany()
  // console.log(allUsers)
  // return allUsers;
  const allUsers = Users();
  return res.json({ 
    Users: allUsers
  })
});

export default router;
