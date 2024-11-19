const { PrismaClient } = require('../../generated/client');
const prisma = new PrismaClient();

const createBlog = async(data) => {
    return prisma.blog.create({ data });
}

const getBlog = async () => {     
    return await prisma.blog.findMany();
};

const getBlogDetail = async (id) => {     
    const blog = await prisma.blog.findUnique({
        where: 
            {
                id : id
            }
    });

    if(!blog) {
        return false
    }

    return blog;
};


const deleteBlog = async (id) => {         
    const blog = await prisma.blog.delete({ 
        where: {
            id :id
        },
    });
    return blog;
};

const updateBlog = async (id, data) => {  
    const result = await prisma.blog.update({ 
            where: {
                id :id
            },
            data: data
        });

    return result;
};

module.exports = {
   createBlog,
   getBlog,
   deleteBlog,
   updateBlog,
   getBlogDetail
};