const queries = {}

const mutations = {
    createPost: async (_, {title, body, tags,}) =>{
        const newPost = await createPost({title, body, tags});
        return newPost.id;
    }
}

export const resolvers = {queries, mutations};