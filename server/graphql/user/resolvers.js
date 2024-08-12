import { createUser, loginUser } from "../../services/authentication.js";

const queries = {
  login: async (_, { email, password }) => {
    const token = await loginUser({ email, password });
    return token;
  },
};

const mutations = {
  User: async (_, { userName, displayImg, email, password }) => {
    const newUser = await createUser({
      userName,
      displayImg,
      email,
      password,
    });
    return newUser.id;
  },
};

export const resolvers = { queries, mutations };
