const { PrismaClient } = require('../../generated/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const register = async (data) => {
    return prisma.user.create({ data });
};

const getUser = async(id) => {
    const user  = await prisma.user.findUnique({
        where: 
        {
            id:id
        }
    })
    if(!user){
        return false;
    }
    return user;
}
const checkEmail = async (data, id) => {
    const existingEmail = await prisma.user.findUnique({
        where:{ 
            email : data
        }
    });
    
    const errors = {};
    if(existingEmail){
        if(id) {
            if (id != existingEmail.id) {
                errors.email = 'Email da ton tai';
            }
        }
        errors.email = 'Email da ton tai';
    }
    return errors;
};    

const login = async(data) => {
    const errors = "";
    const existingUser = await prisma.user.findFirst({
        where : 
        {
            email : data.email
        }
    })

    if(!existingUser) {
        return false
    }
    
    const passwordMatch = await bcrypt.compare(data.password, existingUser.password);
    if(data.level != 0){
        return {
            errors: 'Ban k có quyen dang nhap',
            data : false
        }
    }
    if(!passwordMatch){
        return {
            errors: 'Sai tai khoang mat khau',
            data : false
        }
    }
    return {
        data : existingUser
    };
}

const update = async (id, data) => {
    if(!data.token){
        return {
                errors : 'Vui Long Dang Nhap',
                data: false
        }
    }
    delete data.token;
    const user = await prisma.user.update({ 
            where: {
                id :id
            },
            data: data
        });
    if(!user){
        return {
            errors : 'User k ton tai',
            data: false
        }
    }
      
    return {data :user};
};

module.exports = {
    register,
    checkEmail,
    login,
    update,
    getUser
};
