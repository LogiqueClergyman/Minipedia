export const queries = `#graphql
    groups: [Group]
    group(id: ID!): Group
    groupPosts(groupId: ID!): [Post]
    groupMembers(groupId: ID!): [User]
`