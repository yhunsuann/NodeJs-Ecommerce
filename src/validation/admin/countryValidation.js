const countryValidation = (data) => {
    const errors = {};
    if (!data.name) {
        errors.name = 'Vui lòng nhập ten nuoc';
    }
    return errors;
};
module.exports = countryValidation;