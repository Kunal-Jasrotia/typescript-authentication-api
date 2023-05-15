import cookieParser from 'cookie-parser'
import cors from "cors"
import 'dotenv/config'
import express from "express"
import session from 'express-session'
import passport from 'passport'

import { auth } from './middleware/passport'
import { userRouter } from './routes/user'
import { isLoggedIn } from './middleware/auth'

const app = express()
app.use(express.json())
app.use(express.urlencoded())
auth()
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(session({
  secret: 'dftgyhujikooijhgfhjk',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', userRouter)

app.post('/home', isLoggedIn, async (req, res) => {
  res.send(req.user)
})
app.post('/login', function (req, res) {
  console.log("here in login")
  console.log(req.body)
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/home',
  })(req, res);
});

app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) console.log(err)
  })
})

app.listen(5000, () => {
  console.log('listening')
})