const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');

const router = express.Router();

// res.locals에 user정보 저장
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// user profile 조회
router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '60175054' });
});

// 회원가입
router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '60175054' });
});


// 포스트 전체 목록 조회
router.get('/', isLoggedIn,async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('main', {
      title: '60175054',
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 내가 작성한 포스트 목록 조회
router.get('/writer', isLoggedIn, async (req, res) => {
  try {
    const posts = await Post.findByPk({
      where: {id: req.path.id},
      include: {
        model: User,
        attributes : ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('myPost', {
      title: 'MyPostList',
      twits : posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
})


module.exports = router;