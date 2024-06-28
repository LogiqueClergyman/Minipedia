import { createUser ,loginUser } from '../../routes.js/authentication.js'; 

const queries = {
  login : async (_, {UserName, password}) =>{
    const token = await loginUser({UserName,password});
    return token;
  }
};

const mutations = {
    
  User: async (_, { Name,UserName, displayImg, email, level, password }) => {
 
    const newUser = await createUser({ Name,UserName, displayImg, email, level, password });
    return newUser;
  },
};

export const resolvers = { queries, mutations };
