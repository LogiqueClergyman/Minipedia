
export const queries = `#graphql
    type Query {
        posts: [Post]
        post(id: ID!): Post
    }
`;