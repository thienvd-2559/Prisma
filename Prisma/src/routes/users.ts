import express from 'express'
import { PrismaClient } from '@prisma/client'
const router = express.Router()
const prisma = new PrismaClient()

/* GET home page. */
router.get('/', async(req, res, next) =>{
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
  return allUsers;
})

export default router