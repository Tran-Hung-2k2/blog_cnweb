const BlogModel = require('../models/Blog');

function isValidImageUrl(url) {
    // Sử dụng biểu thức chính quy để kiểm tra URL ảnh
    const imageUrlPattern = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)$/;
    return imageUrlPattern.test(url);
}

function isValidBase64(base64Data) {
    // Sử dụng biểu thức chính quy để kiểm tra chuỗi Base64
    const base64Pattern = /^data:image\/(png|jpeg|jpg|gif);base64,/;
    return base64Pattern.test(base64Data);
}

function isValidImage(imageData) {
    if (isValidImageUrl(imageData) || isValidBase64(imageData)) {
        return true;
    }
    return false;
}

exports.getAllBlogs = async (req, res) => {
    try {
        const queryTitle = req.query.title;
        let blogs;
        if (!queryTitle) {
            blogs = await BlogModel.find();
        } else {
            const regex = new RegExp(queryTitle, 'i');
            blogs = await BlogModel.find({ title: regex });
        }
        res.status(200).json({ data: blogs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createBlog = async (req, res) => {
    try {
        if (isValidImage(req.body.image)) {
            const createdBlog = await BlogModel.create(req.body);
            res.status(200).json({ data: createdBlog });
        } else {
            res.status(400).json({ error: 'Vui lòng nhập ảnh đúng định dạng' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json({ data: blog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const updatedBlog = await BlogModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ data: updatedBlog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findByIdAndDelete(req.params.id);
        res.status(204).json({ data: blog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
