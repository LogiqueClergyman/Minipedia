export const typeDefs = `
type User {
     id: Int
     type: Int
     email: String
     displayName: String
     displayImg: String
     about: String
     Posts: [Post]
     PostLikes: [PostLike]
     GroupMemberships: [GroupMembership]
     darkMode: Boolean
     lastLogin: Date
     streak: Int
     notifications: [String]
   }


`;