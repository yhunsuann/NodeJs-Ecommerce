const categoryModel = require('../../models/admin/categoryModel');
const categoryValidation = require('../../validation/admin/categoryValidation');

const list = async(req, res) => {      
    const category  = await categoryModel.list();
    if(!category) {
        return res.status(400).json({message: 'Không có danh mục nào tồn tại'})
    }

    return res.status(200).json({data: category})
}

const create = async(req, res) => {
    const data = req.body;
    
    const errors = await categoryValidation(data);
    
    if(Object.keys(errors).length > 0) {
        return res.status(400).json({message: errors})
    }    
    const category = await categoryModel.create(data)
    
    return res.status(200).json({message: 'Tao Thanh Cong !', data : category})
}

const deleteCountry = async(req, res) =>{
    const {id} = req.params;
    const existingContry = await countryModel.list(parseInt(id));
    if(!existingContry) {
        return res.status(400).json({message: "Dat Nuoc k ton tai"})
    }

    await countryModel.deleteCountry(parseInt(id))
    return res.status(400).json({message: "Xoa thanh cong"})
}

const editCountry = async(req, res) => {
    const data = req.body;
    const {id} = req.params;
    const errors = await countryValidation(data);
    
    if(Object.keys(errors).length > 0) {
        return res.status(400).json({message: errors})
    }

    const existingContry = await countryModel.list(parseInt(id));
    if(!existingContry) {
        return res.status(400).json({message: "Dat Nuoc k ton tai"})
    }

    const country = await countryModel.edit(parseInt(id), data)
    
    return res.status(200).json({message: 'Cap nhat Thanh Cong !', data : country})
}

module.exports = {
    list,
    create,
    deleteCountry,
    editCountry
};
