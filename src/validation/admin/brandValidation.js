const brandValidation = (data) => {
    const errors = {};
    if (!data.name) {
        errors.name = 'Vui lòng nhập nhãn hàng';
    }
    return errors;
};
module.exports = brandValidation;