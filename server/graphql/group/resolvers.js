import {
  isAuthenticated,
  isMemberOf,
  isModOf,
} from "../../services/validations.js";
const queries = {
  groups: async () => {
    return await getGroups();
  },
  group: async (_, { id }) => {
    return await getGroupById(id);
  },
  groupPosts: async (_, { id }) => {
    return await getGroupPosts(id);
  },
  groupMembers: isAuthenticated(
    isModOf(async (_, { id }) => {
      return await getGroupMembers(id);
    })
  ),
  groupMods: isAuthenticated(async (_, { id }) => {
    return await getGroupMods(id);
  }),
};
const mutations = {
  createGroup: isAuthenticated(
    async (_, { name, desc, displayImg }, context) => {
      const user = context.user.id;
      const newGroup = await createGroup(name, desc, displayImg);
      return newGroup;
    }
  ),
  updateGroup: isAuthenticated(
    isModOf(async (_, { id, name, desc, displayImg }, context) => {
      const groups = context.groups;
      const group = groups.find((group) => group.id === id);
      if (!group) {
        throwError("User not the mod.", "UNAUTHORIZED", 403);
      }
      return await updateGroup(id, name, desc, displayImg);
    })
  ),
  deleteGroup: isAuthenticated(
    isModOf(async (_, { id }, context) => {
      const groups = context.groups;
      const group = groups.find((group) => group.id === id);
      if (!group) {
        throwError("User not the mod.", "UNAUTHORIZED", 403);
      }
      return await deleteGroup(id);
    })
  ),
  addMember: isAuthenticated(
    isModOf(async (_, { groupId, userId }) => {
      return await addMember(groupId, userId);
    })
  ),
  removeMember: isAuthenticated(
    isModOf(async (_, { groupId, userId }) => {
      return await removeMember(groupId, userId);
    })
  ),
  addPost: isAuthenticated(
    isMemberOf(async (_, { groupId, postId }) => {
      return await addPost(groupId, postId);
    })
  ),
  removePost: isAuthenticated(
    isMemberOf(async (_, { groupId, postId }) => {
      return await removePost(groupId, postId);
    })
  ),
  updateRole: isAuthenticated(
    isModOf(async (_, { groupId, userId, role }) => {
      return await updateRole(groupId, userId, role);
    })
  ),
};
export const resolvers = { queries, mutations };
