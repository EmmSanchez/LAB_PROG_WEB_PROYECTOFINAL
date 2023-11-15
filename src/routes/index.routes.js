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

// RUTAS ADMIN
router.post('/login', async (req, res) => {
  try {
    const user = await users.findOne({ name: req.body.name }).lean()
    if (user.password === req.body.password) {
      res.render('admin', { user })
    } else {
      res.send('Contraseña incorrecta')
    }
  } catch {
    res.send('Detalles incorrectos')
  }
})
router.get('/admin_deportes', (req, res) => {
  res.render('admin_deportes')
})
router.get('/adminarco', (req, res) => {
  res.render('admin/adminarco')
})
router.get('/adminatletismo', (req, res) => {
  res.render('admin/adminatletismo')
})
router.get('/adminbaseball', (req, res) => {
  res.render('admin/adminbaseball')
})
router.get('/adminbasketball', (req, res) => {
  res.render('admin/adminbasketball')
})
router.get('/adminboxeo', (req, res) => {
  res.render('admin/adminboxeo')
})
router.get('/adminvoleyball', (req, res) => {
  res.render('admin/adminvoleyball')
})

export default router
