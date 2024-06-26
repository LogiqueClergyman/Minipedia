import { createUser } from '../../routes.js/authentication.js'; 

const queries = {};

const mutations = {
    
  User: async (_, { displayName, displayImg, email, type, password }) => {
    console.log("hiiii");
    const newUser = await createUser({ displayName, displayImg, email, type, password });
    return "bn gya";
  },
};

export const resolvers = { queries, mutations };
