'use strict'

var validator = require('validator');

var Article = require('../models/article');

var controller = {
    
    save: (req, res) => {
        //Get post parameters
        var params = req.body;

        //Validate data (validator)
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch(err) {
            return res.status(500).send({
                status: 'error',
                mensaje: 'Missing data!!!'
            });
        }

        if (validate_title && validate_content) {

            //Create object
            var article = new Article();

            //Set values
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //Save
            article.save((err, articleStored) => {
                if (err || !articleStored) {
                    return res.status(500).send({
                        status: 'error',
                        mensaje: 'Article not saved!!!'
                    });
                }

                //Response
                return res.status(201).send({
                    status: 'success',
                    article: articleStored
                });
            });
            
        } else {
            return res.status(400).send({
                status: 'error',
                mensaje: 'Wrong data!!!'
            });
        }
    },

    getArticles: (req, res) => {
        //Variable query
        var query = Article.find({});

        var last = req.params.last;
        
        if (last || last != undefined) {
            query.limit(parseInt(last));
        }

        //search articles
        query.sort('-_id').exec((err, articles) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    mensaje: 'Error on retrieving articles'
                });
            }

            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    mensaje: 'No articles'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });

        });        
    }
}

module.exports = controller;