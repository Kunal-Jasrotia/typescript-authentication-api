import cookieParser from 'cookie-parser'
import cors from "cors"
import 'dotenv/config'
import express from "express"
import session from 'express-session'
import passport from 'passport'
import { auth } from './middleware/passport'
import { userRouter } from './routes/user'
import { isLoggedIn } from './middleware/auth'
import { readFileSync } from 'fs'
import https from 'https'
const app = express()

const key = readFileSync('./cert/CA/private.key');
const cert = readFileSync('./cert/CA/certificate.crt');
const server = https.createServer({ key, cert }, app);
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser());
app.use(cors({
  origin: 'https://localhost:3000',
  methods: "GET, POST, PATCH, DELETE, PUT",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
}))
app.all('/*', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "https://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
auth()
app.use(session({
  secret: 'dftgyhujikooijhgfhjk',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', userRouter)

app.use('/success', (req, res) => {
  console.log(req.user, '-----', req.isAuthenticated());
  res.send('success')
})
app.use('/failed', (req, res) => {
  res.send('failed')
})


app.get('/home', isLoggedIn, async (req, res) => {
  res.send(req.user)
})
app.post('/login', function (req, res) {
  console.log("here in login")
  console.log(req.body)
  passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/fai led',
  })(req, res);
});

app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) console.log(err)
  })
})

server.listen(5000, () => {
  console.log('listening')
})