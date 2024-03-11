const Router = require('express');
const router = new Router();
const ArticlesController = require('../controllers/articlesController');

router.post('/addArticle', ArticlesController.addArticle);
router.put('/update/:id', ArticlesController.updateArticle);
router.delete('/deleteArticle/:id', ArticlesController.deleteArticleById);
router.get('/getAll/:expertId', ArticlesController.getAllArticlesByExpertId);

module.exports = router;