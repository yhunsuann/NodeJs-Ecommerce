const validateUser = (data) => {
    const errors = {};
    if (!data.content) {
        errors.content = 'Vui lòng nhập noi dung';
    }
    return errors;
};
module.exports = validateUser;