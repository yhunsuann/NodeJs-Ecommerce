const { PrismaClient } = require('../../generated/client');
const prisma = new PrismaClient();

const list = async (id) => {     
    if(id){
        return await prisma.brand.findUnique({
            where: 
            {
                id: id
            }
        })
    } 
    return await prisma.brand.findMany();
};

const create = async(data) => { 
    return await prisma.brand.create({data})
}

const deleteBrand = async(id) => {
    return await prisma.brand.delete({
        where: 
        {
            id:id
        }
    })
}

const edit = async (id, data) => {  
    const result = await prisma.brand.update({ 
            where: {
                id :id
            },
            data: data
        });

    return result;
};

module.exports = {
    list,
    create,
    deleteBrand,
    edit
};