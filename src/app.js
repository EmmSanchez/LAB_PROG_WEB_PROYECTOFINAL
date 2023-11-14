import express from 'express'
import IndexRoutes from './routes/index.routes'
import { create } from 'express-handlebars'
import path from 'path'
import morgan from 'morgan'

const app = express()

// Settings
app.set('port', 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine(
  '.hbs',
  create({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname: '.hbs'
  }).engine
)
app.set('view engine', '.hbs')

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))

// Routes
app.use(IndexRoutes)

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

export default app
