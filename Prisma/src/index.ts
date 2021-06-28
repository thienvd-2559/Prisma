import express from 'express'
import * as path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'

import indexRouter from './routes/index'
import usersRouter from './routes/users'

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const prisma = new PrismaClient()

async function main () {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

// HOST + PORT
const host = 'localhost'
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening at ${host}:${port}`)
})

// Route
app.use('/', indexRouter)
app.use('/users', usersRouter)

// Error handlers

app.use(( req, res, next) => {
  const error: any = new Error('not found')
  error.status = 400
  next(error)
})

app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
