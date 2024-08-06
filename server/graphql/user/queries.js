export const queries = `#graphql
        users: [User]
        user(id: ID!): User
        login(email: String!, password: String!): String
`;
