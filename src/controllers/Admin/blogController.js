const blogModel = require('../../models/admin/blogModel');
const userModel = require('../../models/admin/userModel');
const validateBlog = require('../../validation/admin/blogValidation');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'public/upload/admin/blog');
    },    
    filename : (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({storage}).array('image', 5);

const create = async(req, res) => {
    data = req.body;
    
    const dataFiles = req.files;
    data.user_id = parseInt(data.user_id);
    
    const errors = validateBlog(data, dataFiles);
    
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    data.image = dataFiles ? dataFiles.map(file => file.path): [];
    data.image = JSON.stringify(data.image)

    const blog = await blogModel.createBlog(data);

    return res.status(200).json(blog);
}

const list = async(req, res) => {
    let blog = await blogModel.getBlog();
    if (!blog) {
        return res.status(400).json({
            message: 'Blog không tồn tại',
        });
    } else {
        return res.status(200).json({
            data : blog
        });
    }  
}

const deleteBlog = async(req, res) => {
    const {id} = req.params;
    const blog = await blogModel.getBlog(parseInt(id));
    if (!blog) {
        return res.status(400).json({
            message: 'Blog không tồn tại',
        });
    } else {
        await blogModel.deleteBlog(parseInt(id))
        return res.status(200).json({
            message: 'Xóa Blog thành công',
        });
    }  
}

const edit = async(req, res) => {
    const { id } = req.params;
    const data = req.body;
    const dataFiles = req.files;
     
    const errors = validateBlog(data, dataFiles);

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    data.image = dataFiles ? dataFiles.map(file => file.path): [];
    data.image = JSON.stringify(data.image)
    const blog = await blogModel.getBlogDetail(parseInt(id));
    let result;
    if(blog) {
        result = await blogModel.updateBlog(parseInt(id), data)
    } else {
        result = "Blog K ton tai";
    }
    return res.json(result);
}

module.exports = {
    create,
    list,
    deleteBlog,
    upload,
    edit
};
