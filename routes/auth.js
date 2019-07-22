'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

const saltRounds = 10;

router.get('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.redirect('/auth/singup');
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      username,
      password: hashedPassword
    });
    req.session.currentUser = newUser;
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/login', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  res.render('login');
});

router.post('/login', async (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  const { username, password } = req.body;
  if (!username || !password) {
    return res.redirect('/auth/login');
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.redirect('/auth/login');
    }
    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect('/');
    } else {
      res.redirect('/auth/login');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/logout', (req, res, next) => {
  if (req.session.currentUser) {
    delete req.session.currentUser;
    return res.redirect('/auth/login');
  }
  res.redirect('/');
});

module.exports = router;
