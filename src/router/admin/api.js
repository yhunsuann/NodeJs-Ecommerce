const express = require('express');
const router = express.Router();
const userController = require('../../controllers/Admin/userController');
const blogController = require('../../controllers/Admin/blogController');
const countryController = require('../../controllers/Admin/countryController');
const categoryController = require('../../controllers/Admin/categoryController');
const brandController = require('../../controllers/Admin/brandController');

//User
router.post('/admin/user/register',userController.upload, userController.register)
router.post('/admin/user/login', userController.login)
router.put('/admin/user/update/:id',userController.upload, userController.update)

//Blog
router.post('/admin/blog/add',blogController.upload, blogController.create);
router.put('/admin/blog/edit/:id',blogController.upload, blogController.edit);
router.delete('/admin/blog/delete/:id', blogController.deleteBlog);
router.get('/admin/blog/list', blogController.list);

//Country
router.get('/admin/country/list', countryController.list);
router.post('/admin/country/add', countryController.create);
router.delete('/admin/country/delete/:id', countryController.deleteCountry);
router.put('/admin/country/edit/:id', countryController.editCountry);

//Category
router.get('/admin/category/list', categoryController.list);
router.post('/admin/category/add', categoryController.create);

//Brand
router.get('/admin/brand/list', brandController.list);
router.post('/admin/brand/add', brandController.create);
module.exports = router;