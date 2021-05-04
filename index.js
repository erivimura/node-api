'use strict'

var mongoose = require("mongoose");
var app = require('./app');
var port = 3900;

//Mongoose configuration
mongoose.set('useFindAndModify', false); //Disables old Mongoose methods
mongoose.Promise = global.Promise;

//MongoDB Connection
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Database Connected...!!!");

            //Create server and listen http
            app.listen(port, () => {
                console.log("Server running in http://localhost:" + port);
            })
    });