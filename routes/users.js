const express = require('express')
const { Post, User, Comment } = require('../models')

const router = express.Router()

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Post,
            include: [Comment],
          },
        ],
      })

      res.json(users)
    } catch (err) {
      console.error(err)
      next(err)
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      })
      console.log(user)
      res.status(201).json(user)
    } catch (err) {
      console.error(err)
      next(err)
    }
  })
// params 쓰는 라우터는 맨 마지막에
router.get('/:id/comments', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
      },
    })
    console.log(comments)
    res.json(comments)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

module.exports = router
