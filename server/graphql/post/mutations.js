export const mutations = `#graphql
        createPost(title: String!, body: String!, tags: [String]): Post
        updatePost(id: ID!, title: String, body: String, tags: [String]): Post
        deletePost(id: ID!): Boolean
        verifyPost(id: ID!): Post
        likePost(id: ID!): Post
        unlikePost(id: ID!): Post
        commentPost(id: ID!, body: String!): Post
        deleteComment(id: ID!, commentId: ID!): Post
`;
