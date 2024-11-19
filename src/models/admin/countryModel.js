const { PrismaClient } = require('../../generated/client');
const prisma = new PrismaClient();

const getCountry = async (id) => {     
    if(id){
        return await prisma.country.findUnique({
            where: 
            {
                id: id
            }
        })
    } 
    return await prisma.country.findMany();
};

const create = async(data) => {
    return await prisma.country.create({data})
}

const deleteCountry = async(id) => {
    return await prisma.country.delete({
        where: 
        {
            id:id
        }
    })
}

const editCountry = async (id, data) => {  
    const result = await prisma.country.update({ 
            where: {
                id :id
            },
            data: data
        });

    return result;
};

module.exports = {
    getCountry,
    create,
    deleteCountry,
    editCountry
};