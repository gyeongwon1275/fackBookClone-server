// 로그인한 사용자와 하지 않은 사용자를 분리해기 위한
// 접근 권한을 제어하는 미들웨어
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(403).send('로그인필요')
  }
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next()
  } else {
    res.redirect(`/?error=${'로그인함'}`)
  }
}
