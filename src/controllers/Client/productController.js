const { PrismaClient } = require('../../generated/client');
const prisma = new PrismaClient();
const productModel = require('../../models/client/productModel');
const authModel = require('../../models/auth/auth');
const multer = require('multer');
const path = require('path');
const productValidation = require('../../validation/client/productValidation');

const storage = multer.diskStorage({    
    destination : (req, file, cb) => {
        cb(null, 'public/upload/client/product');
    },    
    filename : (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({storage}).array('image', 5);


const create = async(req, res) => {    
    const data = req.body;
    const datafile = req.files;
    const parseIntValue = (key) => {
        if (key in data) {
            data[key] = parseInt(data[key]);
        }
    };
    
    value = ['brand_id', 'category_id', 'user_id', 'active', 'price'];
    value.forEach(parseIntValue);

    const checkToken = await authModel.checkToken(data.token);
    if(!checkToken) {
        return res.status(400).json({
            message : "Vui lòng đăng nhập"
        });
    }
        
    const erros = productValidation(data, datafile);
    if(Object.keys(erros).length > 0){
        return res.status(400).json(erros)
    }

    // Object.entries(erros).map(([key, value]) => {

    // })
  
    data.image = datafile ? datafile.map(file => file.path): [];
    data.image = JSON.stringify(data.image)
    delete data.token
    const product = await productModel.create(data);
    return res.status(200).json({
        data : product
    })
}

const list  = async(req, res) => {
    const {user_id} = req.body;
    const {token} = req.body;
    const checkToken = await authModel.checkToken(token);
    if(!checkToken) {
        return res.status(400).json({
            message : "Vui lòng đăng nhập"
        });
    }

    const product  = await productModel.list(parseInt(user_id))
    
    return res.status(200).json({
        data : product
    })
}

const update = async(req, res) => {    
    const data = req.body;
    const {id} = req.params;
    const datafile = req.files;
    const parseIntValue = (value) => {
        data[value] = parseInt(data[value]);
    };
    
    value = ['brand_id', 'category_id', 'user_id', 'active', 'price'];
    value.forEach(parseIntValue);

    const checkToken = await authModel.checkToken(data.token);
    if(!checkToken) {
        return res.status(400).json({
            message : "Vui lòng đăng nhập"
        });
    }

    data.image = datafile ? datafile.map(file => file.path): [];
    data.image = JSON.stringify(data.image)
    delete data.token
    const product = await productModel.update(parseInt(id), data);
    return res.status(200).json({
        data : product
    })
}

const deleteProduct = async(req, res) => {
    const {id} = req.params;
    const {token} = req.body;    
    const checkToken = await authModel.checkToken(token);
    if(!checkToken) {
        return res.status(400).json({
            message : "Vui lòng đăng nhập"
        });
    }

    await productModel.deleteProduct(parseInt(id))
    return res.status(200).json({
        message: 'Xóa product thành công',
    });

}

const listHome  = async(req, res) => {
    const product  = await productModel.listHome();
    
    return res.status(200).json({
        data : product
    })
}

const getDetailProduct = async(req, res) => {
    const {id} = req.params;
    const product = await productModel.getDetailProduct(parseInt(id));
    if(!product){
        return res.status(400).json({message: 'Sản phẩm không tồn tại'})
    }

    return res.status(200).json({data:product})
}

const cart = async(req, res) =>{
    const dataProduct = req.body;

    const listProductUpdated = [];
    for (const value of dataProduct) {
        const product = await productModel.getDetailProduct(value.id);
        product.qty = value.qty;
        listProductUpdated.push(product);   
    }
    return res.status(200).json({data: listProductUpdated});
}

module.exports = {
    create,
    upload,
    list,
    update,
    deleteProduct,
    listHome,
    getDetailProduct,
    cart
};
