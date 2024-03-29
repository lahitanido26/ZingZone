const fileURLToPath = require('url')
const dirname = require('path')
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express()
const authController = require('./controllers/authController')
const propertyController = require('./controllers/propertyController')
const uploadController = require('./controllers/uploadController')
const yachtController = require('./controllers/yachtController')
const userController = require('./controllers/userController')
const commentController = require('./controllers/commentController')

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('NOT CONNECTED TO NETWORK', err))

// middlewares
app.use(
  express.json({
    limit: '10mb',
  })
)
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static('public/images'))

app.use('/auth', authController)
app.use('/property', propertyController)
app.use('/yacht', yachtController)
app.use('/upload', uploadController)
app.use('/user', userController)
app.use('/comment', commentController)

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'build')))
// For any other route, serve the "index.html" file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// starting server
const port = process.env.PORT || 5000
app.listen(port, () => console.log('Server has been started'))
