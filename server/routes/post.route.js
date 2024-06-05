const PostController = require('../controllers/post.controller');
module.exports = (app) => {
    // app.get('/api', PostController.index);
    app.post('/api/posts', PostController.CreatePost);     /* This is new */
    app.get('/api/posts',PostController.getAllPosts);
    app.get('/api/posts/:id',PostController.getPerson);
    app.put('/api/posts/:id',PostController.updatePerson);
    app.delete('/api/posts/:id',PostController.deletePerson)
}