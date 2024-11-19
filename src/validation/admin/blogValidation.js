const validateUser = (data, file) => {
    const errors = {};
    if (!data.title) {
        errors.title = 'Vui lòng nhập tiêu đề';
    }
    
    if (!data.content) {
        errors.content = 'Vui lòng nhập nội dung';
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

module.exports = validateUser;