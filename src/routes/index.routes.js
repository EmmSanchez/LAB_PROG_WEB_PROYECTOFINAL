import { Router } from 'express'
import { users, players } from '../mongodb'

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
router.get('/arco', async (req, res) => {
  let player = await players.find().lean()
  player = player.filter((e) => {
    return e.sport === 'arco'
  })
  res.render('deportes/arco', { player })
})
router.get('/atletismo', async (req, res) => {
  let player = await players.find().lean()
  player = player.filter((e) => {
    return e.sport === 'atletismo'
  })
  res.render('deportes/atletismo', { player })
})
router.get('/baseball', async (req, res) => {
  let player = await players.find().lean()
  player = player.filter((e) => {
    return e.sport === 'baseball'
  })
  res.render('deportes/baseball', { player })
})
router.get('/basketball', async (req, res) => {
  let player = await players.find().lean()
  player = player.filter((e) => {
    return e.sport === 'basketball'
  })
  res.render('deportes/basketball', { player })
})
router.get('/boxeo', async (req, res) => {
  let player = await players.find().lean()
  player = player.filter((e) => {
    return e.sport === 'box'
  })
  res.render('deportes/boxeo', { player })
})
router.get('/voleyball', async (req, res) => {
  let player = await players.find().lean()
  player = player.filter((e) => {
    return e.sport === 'volleyball'
  })
  res.render('deportes/voleyball', { player })
})

// RUTAS ADMIN
router.post('/login', async (req, res) => {
  try {
    const user = await users.findOne({ name: req.body.name }).lean()
    console.log(users)
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

// ADMIN ARCO
router.get('/adminarco', async (req, res) => {
  let player = await players.find().lean()
  player = player.filter((e) => {
    return e.sport === 'arco'
  })
  res.render('admin/adminarco', { player })
})
// ADMIN ATLETISMO
router.get('/adminatletismo', async (req, res) => {
  let player = await players.find().lean()
  player = player.filter((e) => {
    return e.sport === 'atletismo'
  })
  res.render('admin/adminatletismo', { player })
})
router.get('/adminbaseball', async (req, res) => {
  let player = await players.find().lean()
  player = player.filter((e) => {
    return e.sport === 'baseball'
  })
  res.render('admin/adminbaseball', { player })
})
router.get('/adminbasketball', async (req, res) => {
  let player = await players.find().lean()
  player = player.filter((e) => {
    return e.sport === 'basketball'
  })
  res.render('admin/adminbasketball', { player })
})
router.get('/adminboxeo', async (req, res) => {
  let player = await players.find().lean()
  player = player.filter((e) => {
    return e.sport === 'box'
  })
  res.render('admin/adminboxeo', { player })
})
router.get('/adminvoleyball', async (req, res) => {
  let player = await players.find().lean()
  player = player.filter((e) => {
    return e.sport === 'volleyball'
  })
  res.render('admin/adminvoleyball', { player })
})

// SUBIR ATLETA
router.post('/player/add', async (req, res) => {
  try {
    const { name, description, sport } = (req.body)
    const player = new players({
      name,
      description,
      sport,
      image: req.file.filename
    })
    await player.save()
    // DECIRLE QUE SE RECARGUE EN LA PÁGINA ACTUAL
    const referer = req.headers.referer || '/'
    res.redirect(referer)
  } catch (error) {
    console.log(error)
  }
})
// BORRAR ATLETA
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params
  await players.findByIdAndDelete(id)
  const referer = req.headers.referer || '/' // DECIRLE QUE SE RECARGUE EN LA PÁGINA ACTUAL
  res.redirect(referer)
})

export default router
