const passport = require('passport')
const local = require('./localStrategy')
const User = require('../models/user')

module.exports = () => {
  // serializeUser : 사용자 정보를 세션에 아이디로 저장
  // 로그인시 실행되며 req.session 객체에 어떤 데이터를 저장할 지 결정
  passport.serializeUser((user, done) => {
    // 세션에 사용자 id 만 저장
    done(null, user.id) // 첫번째 인자는 error , 두번째 인자는 저장하고자 하는 data
  })
  // deserializeUser: 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러옴
  // serializeUser 의 done (1,2) 2번째 인자가
  // deserializeUser 의 parameter 가 됨
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user)) //done(null, user) => req.user 에 저장
      .catch((err) => done(err))
  })

  local()
}
