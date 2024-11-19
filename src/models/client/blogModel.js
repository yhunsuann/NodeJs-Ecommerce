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
            },
        include : {
            comment :true
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

const checkToken = async(data) => {
    if(!data) {
        return false;
    }
    return data;
}

const updateBlog = async (id, data) => {  
    const result = await prisma.blog.update({ 
            where: {
                id :id
            },
            data: data
        });

    return result;
};

const checkComment = async (id, id_user) => { 
    const existingComment = await prisma.comment.findMany({
        where:{ 
            blog_id : id
        }
    });    
    const errors = {};
    if(existingComment){
        existingComment.map(comment => {            
            if(comment.user_id == id_user) {
                errors.comment = 'Ban da binh luan bai viet nay roi';
            }
        });   
    };

    return errors;
}; 


module.exports = {
   createBlog,
   getBlog,
   deleteBlog,
   updateBlog,
   checkComment,
   checkToken,
   getBlogDetail
};