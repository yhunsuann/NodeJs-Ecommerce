const express = require('express');
const router = express.Router();
const memberController = require('../../controllers/Client/memberController');
const blogController = require('../../controllers/Client/blogController');
const productController = require('../../controllers/Client/productController');

//User
router.post('/member/register',memberController.upload, memberController.register);
router.post('/member/login', memberController.login);
router.put('/member/update/:id',memberController.upload, memberController.update);
//Blog
router.get('/blog/list', blogController.list);
router.get('/blog/deltail/:id', blogController.getDetail);
router.post('/blog/deltail/comment/:id',blogController.comment);

//Product
router.post('/account/product/add', productController.upload, productController.create);
router.get('/account/product/list', productController.list);
router.put('/account/product/edit/:id', productController.upload, productController.update);
router.delete('/account/product/delete/:id', productController.deleteProduct);

//Home 
router.get('/product/list', productController.listHome);
router.get('/product/detail/:id', productController.getDetailProduct);
router.get('/product/cart', productController.cart);
module.exports = router;