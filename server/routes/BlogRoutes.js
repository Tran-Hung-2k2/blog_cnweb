const express = require('express');

const blogController = require('../controllers/BlogController');

const router = express.Router();

router.route('/').get(blogController.getAllBlogs).post(blogController.createBlog);
router.route('/:id').get(blogController.getBlogById).put(blogController.updateBlog).delete(blogController.deleteBlog);

module.exports = router;
