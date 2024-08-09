export const mutations = `#graphql
    createGroup(name: String!, desc: String, displayImg: String): Group
    updateGroup(id: ID!, name: String, desc: String, displayImg: String): Group
    deleteGroup(id: ID!): Group
    addMember(groupId: ID!, userId: ID!): User
    removeMember(groupId: ID!, userId: ID!): User
    addMyself(groupId: ID!): User
    removeMyself(groupId: ID!): User
    addPost(groupId: ID!, postId: ID!): Post
    removePost(groupId: ID!, postId: ID!): Post
    updateRole(groupId: ID!, userId: ID!, role: String): User
`;
