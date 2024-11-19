const { PrismaClient } = require('../../generated/client');
const prisma = new PrismaClient();
const userModel = require('../../models/admin/userModel');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userValidation = require('../../validation/admin/userValidation')

const storage = multer.diskStorage({    
    destination : (req, file, cb) => {
        cb(null, 'public/upload/admin/user');
    },    
    filename : (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const createJWT = async(userId, username) =>{
    const token = jwt.sign({userId, username}, 'bui-phuoc', {expiresIn:'5h'});
    return token;
}

const upload = multer({storage}).array('avatar', 5);


const register = async(req, res) => {
    const data = req.body;
    const datafile = req.files;
    data.id_country = parseInt(data.id_country);
    data.level = parseInt(data.level);
    
    const erros = userValidation(data, datafile);
    if(Object.keys(erros).length > 0){
        return res.status(400).json(erros)
    }

    const existingEmail = await userModel.checkEmail(data.email);
    if(Object.keys(existingEmail).length > 0){
        return res.status(400).json(existingEmail)
    }
    
    data.avatar = datafile ? datafile.map(file => file.path): [];
    data.avatar = JSON.stringify(data.avatar)
    data.password = await bcrypt.hash(data.password, 10);

    const user = await userModel.register(data);
    return res.status(200).json({
        data : user
    })
}

const login = async(req, res) => {
    data = req.body;
    const checkLogin = await userModel.login(data);
    data.id_country = parseInt(data.id_country);
    data.level = parseInt(data.level);
    
    if (!checkLogin.data) {
        return res.status(400).json({ message: checkLogin.errors });
    }
    const token = await createJWT(checkLogin.data.id, checkLogin.data.name);

    return res.status(200).json({message:'Dang nhap thanh cong',token: token, user: checkLogin.data});
}

const update = async(req, res) => {
    const data = req.body;
    const {id} = req.params;
    const dataFiles = req.files;
    data.id_country = parseInt(data.id_country);
    data.level = parseInt(data.level);

    const erros = userValidation(data, dataFiles);
    if(Object.keys(erros).length > 0){
        return res.status(400).json(erros)
    }

    const existingEmail = await userModel.checkEmail(data.email);
    if(Object.keys(existingEmail).length > 0){
        return res.status(400).json(existingEmail)
    }
    
    data.avatar = dataFiles ? dataFiles.map(file => file.path): [];
    data.avatar = JSON.stringify(data.avatar)
    const existingUser = await userModel.getUser(parseInt(id));
    console.log(existingUser);
    
    if(!existingUser){
        return res.status(200).json({message:'Nguoi dung k ton tai'});
    }

    const user = await userModel.update(parseInt(id), data);
  
    return res.status(200).json({message:'Cap nhat thanh cong',user: user});
}

module.exports = {
    register,
    upload,
    login,
    update
};
