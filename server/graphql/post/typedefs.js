export const typeDefs = `#graphql
    type Post {
        id: ID!
        title: String!
        body: String!
        tags: [String]
        verified: Int
        postedBy: User!
        PostLikes: [User]
        GroupPost: [Group]
    }
`;