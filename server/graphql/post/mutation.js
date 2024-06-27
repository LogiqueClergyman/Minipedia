
export const mutations = `#graphql
    type Mutation {
        createPost(title: String!, body: String!, tags: [String]): Post
        updatePost(id: ID!, title: String, body: String, tags: [String]): Post
        deletePost(id: ID!): boolean
        verifyPost(id: ID!): Post
    }
`;

