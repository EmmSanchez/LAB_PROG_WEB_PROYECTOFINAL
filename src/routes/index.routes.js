import { Router } from 'express'
const users = require('../mongodb')

const router = Router()

// RUTAS DE NAVEGADOR
router.get('/', (req, res) => {
  res.render('index')
})
router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/deportes', (req, res) => {
  res.render('deportes')
})
router.get('/contacto', (req, res) => {
  res.render('contacto')
})

// RUTAS DE DEPORTES
router.get('/arco', (req, res) => {
  res.render('deportes/arco')
})
router.get('/atletismo', (req, res) => {
  res.render('deportes/atletismo')
})
router.get('/baseball', (req, res) => {
  res.render('deportes/baseball')
})
router.get('/basketball', (req, res) => {
  res.render('deportes/basketball')
})
router.get('/boxeo', (req, res) => {
  res.render('deportes/boxeo')
})
router.get('/voleyball', (req, res) => {
  res.render('deportes/voleyball')
})

// Login
router.post('/login', async (req, res) => {
  try {
    const check = await users.findOne({ name: req.body.name })
    if (check.password === req.body.password) {
      res.render('admin')
    } else {
      res.send('Contraseña incorrecta')
    }
  } catch {
    res.send('Detalles incorrectos')
  }
})

export default router
