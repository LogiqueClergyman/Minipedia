export const typeDefs = `#graphql
type User {
     id: ID!
     type: Int
     email: String!
     displayName: String
     displayImg: String
     about: String
     Posts: [Post]
     PostLikes: [Post]
     GroupMemberships: [Group]
     darkMode: Boolean
     lastLogin: String
     streak: Int
     notifications: [String]
}
`;
