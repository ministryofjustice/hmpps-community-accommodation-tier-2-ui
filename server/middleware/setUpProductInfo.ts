import express, { Router } from 'express'

export default function setUpProductInfo(): Router {
  const router = express.Router()

  router.get('/info', (req, res) => {
    res.json({
      activeAgencies: [],
    })
  })

  return router
}
