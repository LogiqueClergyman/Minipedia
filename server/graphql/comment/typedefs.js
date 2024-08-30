export const typeDefs = `#graphql
    type Comment {
        id: ID!
        body: String!
        user: User!
        post: Post!
    }
`;