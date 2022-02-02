require('dotenv').config('./.env')

const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const app = express()

const User = require('./schemas/User')
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.json({ status: 'error', message: 'Fill required fields' })

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  try {
    await User.create({
      email,
      password: hashedPassword,
    })

    return res.json({ status: 'ok', message: 'User created' })
  } catch (e) {
    return res.json({ status: 'error', message: e.message })
  }
})

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.json({ status: 'error', message: 'No user found' })

  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        email,
      },
      'hellooooo1234'
    )
    return res.json({ status: 'ok', message: 'okay', user: token })
  } else {
    return res.json({ status: 'error', message: 'Invalid credentials' })
  }
})

app.post('/auth/setbio', async (req, res) => {
  const token = req.headers['x-access-token']
  const userEmail = jwt.decode(token).email

  if (!token || !req.body.bio)
    return res.json({ status: 'error', message: 'fill required fields' })

  const user = await User.findOneAndUpdate(
    { email: userEmail },
    {
      $set: {
        bio: req.body.bio,
      },
    }
  )
  if (!user) return res.json({ status: 'error', message: 'No user found' })

  res.json({ status: 'ok', mesage: 'Updated Scucessfuly' })
})

app.get('/auth/getbio', async (req, res) => {
  const token = req.headers['x-access-token']
  const userEmail = jwt.decode(token).email

  if (!token)
    return res.json({ status: 'error', message: 'fill required fields' })

  const user = await User.findOne({ email: userEmail })
  if (!user) return res.json({ status: 'error', message: 'No user found' })

  res.json({ status: 'ok', mesage: 'okay', bio: user.bio })
})

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log('MongoDB Connected..'))
  .catch(err => console.log(err))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
