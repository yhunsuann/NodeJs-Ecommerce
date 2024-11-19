const emailValidator = require('email-validator');
const productValidation = (data, file) => {
    const phoneRegex = /^\+?[0-9]+$/;
    const errors = {};
    if (!data.category_id) {
        errors.category_id = 'Vui lòng chọn loại danh mục';
    }
    if (!data.brand_id) {
        errors.brand_id = 'Vui lòng chọn loại nhãn hàng';
    }
    if (!data.user_id) {
        errors.user_id = 'Vui long dang nhap';
    }
    if (!data.name) {
        errors.name = 'Vui long nhap ten san pham';
    }
    if (!data.price) {
        errors.price = 'Vui long nhap giá';
    }
    if (typeof data.price !== 'number') {
        errors.price = 'Vui lòng nhập giá đúng định dạng';
    }
    if (!data.detail) {
        errors.detail = 'Vui long nhap chi tiết sản phẩm';
    }
    if (!data.company_profile) {
        errors.id_country = 'Vui lòng nhập hồ sơ công ty';
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
module.exports = productValidation;