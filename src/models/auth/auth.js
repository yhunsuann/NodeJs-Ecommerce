const { PrismaClient } = require('../../generated/client');
const prisma = new PrismaClient();

const checkToken = async(data) => {
    if(!data) {
        return false;
    }
    return data;
}

module.exports = {
    checkToken,
 };