import {
  createPost,
  deletePost,
  updatePost,
  verifyPost,
  getPosts,
  getPost,
} from "../../services/posts.js";
import { isAuthenticated, isVerifier } from "../../services/validations.js";
import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();
const queries = {
  posts: async () => {
    return await getPosts();
  },
  post: async (_, { id }) => {
    return await getPost(id);
  },
};

const mutations = {
  createPost: isAuthenticated(async (_, { title, body, tags }, context) => {
    console.log(context.user.id);
    const newPost = await createPost(title, body, tags, context.user.id);
    return newPost;
  }),
  updatePost: isVerifier(async (_, { id, title, body, tags }, context) => {
    const updatedPost = await updatePost(
      id,
      title,
      body,
      tags,
      context.user.id
    );
    return updatedPost;
  }),
  deletePost: isAuthenticated(async (_, { id }, context) => {
    const deleted = await deletePost(id, context.user.id);
    return deleted;
  }),
  verifyPost: isVerifier(async (_, { id }, context) => {
    const verifiedPost = await verifyPost(id, context.user.id);
    return verifiedPost;
  }),
};
const Post = {
  postedBy: async (post, _, context) => {
    try {
      return await prismaClient.user.findUnique({
        where: { id: post.postedBy },
      });
    } catch (error) {
      return null;
    }
  },
  PostLikes: async (post, _, context) => {
    return await prismaClient.postLike
      .findMany({
        where: { postId: post.id },
        include: { user: true },
      })
      .map((postLike) => postLike.user);
  },
  // PostComment: async (post, _, context) => {
  //   return await prismaClient.postComment
  //     .findMany({
  //       where: { postId: post.id },
  //       include: { user: true },
  //     })
  //     .map((postComment) => postComment.user);
  // },
  GroupPost: async (post, _, context) => {
    return await prismaClient.groupPost
      .findMany({
        where: { postId: post.id },
        include: { group: true },
      })
      .map((groupPost) => groupPost.group);
  },
};
export const resolvers = { queries, mutations, Post };
