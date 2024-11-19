const { PrismaClient } = require('../../generated/client');
const prisma = new PrismaClient();

const create = async(data) => {
    delete data.token;
    return await prisma.comment.create({ data })
}

module.exports = {
    create
};
