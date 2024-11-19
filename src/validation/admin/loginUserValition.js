const userValidation = (data, file) => {
    if (!data.email) {
        errors.email = 'Vui lòng nhập email';
    }
    if (!data.password) {
        errors.password = 'Vui long nhap mat khau';
    }
    if (!data.level) {
        errors.address = 'Vui long nhap level';
    }
    if (typeof data.level !== 'number') {
        errors.phone = 'level phải là số';
    }
};
module.exports = userValidation;