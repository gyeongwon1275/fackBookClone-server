const express = require('express')
const { Post, Comment } = require('../models')

const router = express.Router()

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const posts = await Post.findAll({ include: [Comment] })
      console.log(posts)
      res.status(201).json(posts)
    } catch (err) {
      console.error(err)
      next(err)
    }
  })
  .post(async (req, res, next) => {
    const { userId, contents } = req.body
    try {
      const post = await Post.create({
        UserId: userId,
        contents: contents,
      })
      console.log(post)
      res.status(201).json(post)
    } catch (err) {
      console.error(err)
      next(err)
    }
  })

router
  .route('/:id')
  .patch(async (req, res, next) => {
    try {
      const result = await Post.update(
        {
          content: req.body.content,
        },
        {
          where: { id: req.params.id },
        }
      )
      res.json(result)
    } catch (err) {
      console.error(err)
      next(err)
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Post.destroy({ where: { id: req.params.id } })
      res.json(result)
    } catch (err) {
      console.error(err)
      next(err)
    }
  })

module.exports = router
