const PostController = require('../controllers/post.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = (app) => {
    // app.get('/api', PostController.index);
    app.post('/api/posts',authenticate, PostController.CreatePost);     /* This is new */
    app.get('/api/posts',authenticate,PostController.getAllPosts);
    app.get('/api/posts/:id',authenticate,PostController.getPerson);
    app.put('/api/posts/:id',authenticate,PostController.updatePerson);
    app.delete('/api/posts/:id',authenticate,PostController.deletePerson)
}