const brandModel = require('../../models/admin/brandModel');
const brandValidation = require('../../validation/admin/brandValidation');

const list = async(req, res) => {
    const brand  = await brandModel.list();
    if(!brand) {
        return res.status(400).json({message: 'Không có nhãn hàng nào tồn tại'})
    }

    return res.status(200).json({data: brand})
}

const create = async(req, res) => {
    const data = req.body;
    const errors = await brandValidation(data);
    
    if(Object.keys(errors).length > 0) {
        return res.status(400).json({message: errors})
    }    
    const brand = await brandModel.create(data)
    
    return res.status(200).json({message: 'Tao Thanh Cong !', data : brand})
}

const deleteCountry = async(req, res) =>{
    const {id} = req.params;
    const existingContry = await brandModel.list(parseInt(id));
    if(!existingContry) {
        return res.status(400).json({message: "Dat Nuoc k ton tai"})
    }

    await brandModel.deleteBrand(parseInt(id))
    return res.status(400).json({message: "Xoa thanh cong"})
}

const editCountry = async(req, res) => {
    const data = req.body;
    const {id} = req.params;
    const errors = await countryValidation(data);
    
    if(Object.keys(errors).length > 0) {
        return res.status(400).json({message: errors})
    }

    const existingContry = await brandModel.list(parseInt(id));
    if(!existingContry) {
        return res.status(400).json({message: "Dat Nuoc k ton tai"})
    }

    const country = await brandModel.edit(parseInt(id), data)
    
    return res.status(200).json({message: 'Cap nhat Thanh Cong !', data : country})
}

module.exports = {
    list,
    create,
    deleteCountry,
    editCountry
};
