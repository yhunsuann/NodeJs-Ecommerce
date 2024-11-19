const countryModel = require('../../models/admin/countryModel');
const countryValidation = require('../../validation/admin/countryValidation');

const list = async(req, res) => {
    const allCountry  = await countryModel.getCountry();
    if(!allCountry) {
        return res.status(400).json({message: 'Không có nước nào tồn tại'})
    }

    return res.status(200).json({data: allCountry})
}

const create = async(req, res) => {
    const data = req.body;
    const errors = await countryValidation(data);
    
    if(Object.keys(errors).length > 0) {
        return res.status(400).json({message: errors})
    }

    const country = await countryModel.create(data)
    
    return res.status(200).json({message: 'Tao Thanh Cong !', data : country})
}

const deleteCountry = async(req, res) =>{
    const {id} = req.params;
    const existingContry = await countryModel.getCountry(parseInt(id));
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

    const existingContry = await countryModel.getCountry(parseInt(id));
    if(!existingContry) {
        return res.status(400).json({message: "Dat Nuoc k ton tai"})
    }

    const country = await countryModel.editCountry(parseInt(id), data)
    
    return res.status(200).json({message: 'Cap nhat Thanh Cong !', data : country})
}

module.exports = {
    list,
    create,
    deleteCountry,
    editCountry
};
