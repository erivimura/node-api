'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles); //The '?' indicates an optional value
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.update);
router.delete('/article/:id', ArticleController.delete);

module.exports = router;