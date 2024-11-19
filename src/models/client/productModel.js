const { PrismaClient } = require('../../generated/client');
const prisma = new PrismaClient();

const create = async (data) => {
    return prisma.product.create({ data });
};

const list = async(id) => {
    return prisma.product.findMany({
        where : 
        {
            user_id : id
        }
    })
}

const update = async (id, data) => {
    const user = await prisma.product.update({ 
            where: {
                id :id
            },
            data: data
        });
   
    return {data :user};
};

const deleteProduct = async(id) => {
    return prisma.product.delete({
        where : 
        { id : id}
    })
}

const listHome = async() => {
    return prisma.product.findMany({
        take: 6,
    })
}

const getDetailProduct = async(id) => {
    return prisma.product.findUnique({
        where : 
        {
            id : id
        }
    })
}



module.exports = {
    create,
    list,
    update,
    deleteProduct,
    listHome,
    getDetailProduct,
};
