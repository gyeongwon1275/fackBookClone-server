const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
const dotenv = require('dotenv')
const pageRouter = require('./routes/page')

dotenv.config()

const app = express()

app.set('port', process.env.PORT || 8001)

app.use(morgan('dev'))
// express.static()
// 정적파일을 클라이언트에 전달하는 미들웨어
app.use(express.static(path.join(__dirname, 'public')))
// express.json()
// json 형태 문자열을 클라이언트로 받았을 때
// 객체로 parsing 해주는 미들웨어
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// cookie-parser
// 클라이언트에서 문자열 형태로 넘어온 쿠키정보를
// parsing 해주는 미들웨어
app.use(cookieParser(process.env.COOKIE_SECRET))
// express-session (https://github.com/expressjs/session#readme)
// 세션관리하는 미들웨어
app.use(
  session({
    resave: false, // 요청이 올 떄 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지 여부
    saveUninitialized: false, // 초기화 되지 않은 세션이 세션저장소에 저장하도록 할지 설정
    secret: process.env.COOKIE_SECRET, // 세션쿠키암호 키 설정
    cookie: {
      // 클라이언트에 보낼 쿠키에 대한 설정
      httpOnly: true,
      secure: false,
    },
  })
)

app.use('/', pageRouter)

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
  error.status = 404
  next(error)
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중')
})
