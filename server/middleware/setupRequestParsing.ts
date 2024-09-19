import express, { Router } from 'express'
import trimInput from './trimInput'

export default function setUpWebRequestParsing(): Router {
  const router = express.Router()
  router.use(express.json())
  router.use(express.urlencoded({ extended: true }))
  router.use(trimInput())
  return router
}
