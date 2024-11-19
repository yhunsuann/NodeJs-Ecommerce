const { PrismaClient } = require('../../generated/client');
const prisma = new PrismaClient();

const list = async (id) => {     
    if(id){
        return await prisma.category.findUnique({
            where: 
            {
                id: id
            }
        })
    } 
    return await prisma.category.findMany();
};

const create = async(data) => { 
    return await prisma.category.create({data})
}

const deleteCountry = async(id) => {
    return await prisma.category.delete({
        where: 
        {
            id:id
        }
    })
}

const edit = async (id, data) => {  
    const result = await prisma.category.update({ 
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
    deleteCountry,
    edit
};