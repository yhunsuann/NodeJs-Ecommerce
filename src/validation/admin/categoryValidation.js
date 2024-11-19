const categoryValidation = (data) => {
    const errors = {};
    if (!data.name) {
        errors.name = 'Vui lòng nhập danh mục';
    }
    return errors;
};
module.exports = categoryValidation;