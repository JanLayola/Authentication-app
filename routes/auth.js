'use strict';

const express = require('express');
const router = express.Router();

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {

});

router.get('/login', (req, res, next) => {

});

router.post('/login', (req, res, next) => {

});

router.post('/logout', (req, res, next) => {

});

module.exports = router;
