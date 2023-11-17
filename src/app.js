import express from 'express'
import IndexRoutes from './routes/index.routes'
import { create } from 'express-handlebars'
import path from 'path'
import morgan from 'morgan'
import multer from 'multer'

const app = express()

// Settings
app.set('port', 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine(
  '.hbs',
  create({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: false,
    extname: '.hbs'
  }).engine
)
app.set('view engine', '.hbs')

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
// Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/deportistas'),
  filename: (req, file, cb) => {
    if (file !== null) {
      const ext = file.originalname.split('.').pop()
      cb(null, Date.now() + '.' + ext)
    }
  }
})

app.use(multer({
  storage,
  dest: path.join(__dirname, 'public/img/deportistas'),
  limits: { fileSize: 1000000 }, // 1,000,000 bytes = 1mb máx
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|webp|jpg|png|jfif|gif/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname))
    if (mimetype && extname) {
      return cb(null, true)
    }
    cb('Error: Archivo debe ser una iamgen válida')
  }
}).single('image'))

// Routes
app.use(IndexRoutes)

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

export default app
