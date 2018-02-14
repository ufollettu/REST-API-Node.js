const express = require('express');
const router = express.Router();
const upload = require('../../config/multer');
const middleware = require('../middleware');
const products = require('../controllers/products.server.controller');

router.get('/', products.productsGetAll);
router.post('/', middleware.checkAuth, upload.single('productImage'), products.productPost);
router.get('/:productId', products.productGetOne);
router.patch('/:productId', middleware.checkAuth, products.productPatch);
router.delete('/:productId', middleware.checkAuth, products.productDelete);

module.exports = router;