import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();
import EditPoint from "../models/EditPoint.js";
import { throwError } from "./validations.js";
const getPosts = async () => {
  try {
    const posts = await prismaClient.post.findMany();
    return posts;
  } catch (error) {
    throwError(error, "INTERNAL_SERVER_ERROR", 500);
  }
};

const getPost = async (id) => {
  try {
    const post = await prismaClient.post.findUnique({
      where: {
        id,
      },
    });
    return post;
  } catch (error) {
    throwError(error, "INTERNAL_SERVER_ERROR", 500);
  }
};

const createPost = async (title, body, tags, postedBy) => {
  // console.log(postedBy);
  try {
    const post = await prismaClient.post.create({
      data: {
        title,
        body,
        tags,
        postedBy
      },
      include: {
        User: true
      }
    });
    return post;
  } catch (error) {
    throwError(error, "INTERNAL_SERVER_ERROR", 500);
  }
};

const updatePost = async (id, title, body, tags, updatedBy) => {
  try {
    const post = await getPost(id);
    const edits = post.EditHistory;
    const editPoint = new EditPoint({
      post_id: id,
      previousVersion: post.body,
      newVersion: body,
      modifiedBy: updatedBy,
    });
    await editPoint.save();
    edits.push(editPoint);
    const updatedPost = await prismaClient.post.update({
      where: {
        id,
      },
      data: {
        title,
        body,
        tags,
        EditHistory: edits,
      },
    });
    return updatedPost;
  } catch (error) {
    throwError(error, "INTERNAL_SERVER_ERROR", 500);
  }
};

const deletePost = async (id, deleter) => {
  try {
    const post = await getPost(id);
    if(post.postedBy !== deleter){
      throwError("User is not the owner.", "UNAUTHORIZED", 403);
    }
    return true;
  } catch (error) {
    throwError(error, "INTERNAL_SERVER_ERROR", 500);
  }
};

const verifyPost = async (id, verifier) => {
  try {
    const post = await prismaClient.post.update({
      where: {
        id,
      },
      data: {
        verified: true,
      },
    });
    return post;
  } catch (error) {
    throwError(error, "INTERNAL_SERVER_ERROR", 500);
  }
};

const likePost = async (postId, userId) => {
  try {
    const post = await prismaClient.postLike.create({
      data: {
        postId,
        userId,
      },
    });
    return true;
  } catch (error) {
    throwError(error, "INTERNAL_SERVER_ERROR", 500);
  }
};

const unlikePost = async (postId, userId) => {
  try {
    const post = await prismaClient.postLike.delete({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
    return true;
  } catch (error) {
    throwError(error, "INTERNAL_SERVER_ERROR", 500);
  }
};

const addToGroup = async (postId, groupId) => {
  try {
    const post = await prismaClient.postGroup.create({
      data: {
        postId,
        groupId,
      },
    });
    return true;
  } catch (error) {
    throwError(error, "INTERNAL_SERVER_ERROR", 500);
  }
};

const removeFromGroup = async (postId, groupId) => {
  try {
    const post = await prismaClient.postGroup.delete({
      where: {
        postId_groupId: {
          postId,
          groupId,
        },
      },
    });
    return true;
  } catch (error) {
    throwError(error, "INTERNAL_SERVER_ERROR", 500);
  }
};

export {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  verifyPost,
  likePost,
  unlikePost,
  addToGroup,
  removeFromGroup,
};
