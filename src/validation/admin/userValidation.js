const emailValidator = require('email-validator');
const userValidation = (data, file) => {
    const phoneRegex = /^\+?[0-9]+$/;
    const errors = {};
    if (!data.name) {
        errors.name = 'Vui lòng nhập tên';
    }
    if (!data.email) {
        errors.email = 'Vui lòng nhập email';
    }
    if (!data.phone) {
        errors.phone = 'Vui long nhap phone';
    }
    if (!phoneRegex.test(data.phone)) {
        errors.phone = 'Vui long nhap đúng định dạng';
    }
    if (!data.password) {
        errors.password = 'Vui long nhap mat khau';
    }
    if (!data.address) {
        errors.address = 'Vui long nhap dia chi';
    }
    if (!data.id_country) {
        errors.id_country = 'Vui long nhap id_country';
    }
    if (typeof data.id_country !== 'number') {
        errors.id_country = 'id đất nuoc phải là số';
    }
    if (!emailValidator.validate(data.email)) {
        errors.email = 'Email K hop le';
    }
    if (!data.level) {
        errors.level = 'Vui long nhap level';
    }
 
    if (typeof data.level !== 'number') {
        errors.level = 'level phải là số';
    }
    if(file.length == 0) {
        errors.file ='Vui long upload avatar'
    } else {
        file.map((value, key) => {
            const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedFormats.includes(value.mimetype)) {
                errors.avatar = 'Dinh Dang file khong hop le, Chi chap nhan JPEG , PNG hoac GIF';
            } else {
                const maxSize  = 1024 * 1024; // 1MB
                if (value.size > maxSize) {
                    errors.avatar = 'Kich co qua lon. Vui long upload file co dung luong duoi 1MB';
                }
            }
        })
    }
    return errors;
};
module.exports = userValidation;