export const typeDefs = `#graphql
    type Group {
        id: ID!
        name: String!
        description: String!
        members: [User]
        posts: [Post]
        dp: String
    }
`;
