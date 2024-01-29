import express, { Router } from 'express'
import activePrisons from '../utils/activePrisons'

export default function setUpProductInfo(): Router {
  const router = express.Router()

  router.get('/info', (req, res) => {
    res.json({
      activeAgencies: activePrisons,
    })
  })

  return router
}
