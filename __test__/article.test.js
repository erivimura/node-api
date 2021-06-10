const request = require("supertest");
const app = require('../app');
const mongoose = require("mongoose");

let testServer;
beforeAll(() => {
    
    mongoose.set('useFindAndModify', false);
    mongoose.Promise = global.Promise;
    
    mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        testServer = app.listen(8000);
    });
    
});

afterAll((done) => {
    mongoose.connection.close();
    testServer.close(done);
});

describe('GET /articles/:last?', () => {

    it('Should return all articles', async () => {

        const response = await request(app).get('/api/articles/3');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');

    });

});