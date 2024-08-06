import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();
import EditPoint from "../models/EditPoint";
import { isOwner, isVerifier } from "./authentication";
const getPosts = async () => {
  try {
    const posts = await prismaClient.post.findMany();
    return posts;
  } catch (error) {
    return error;
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
    return error;
  }
};

const createPost = async (title, body, tags) => {
  try {
    const post = await prismaClient.post.create({
      data: {
        title,
        body,
        tags,
      },
    });
    return post;
  } catch (error) {
    return error;
  }
};

const updatePost = async (id, title, body, tags, updater) => {
  try {
    if (!updater) {
      throw new Error("You must be logged in to update a post");
    }
    const post = await getPost(id);
    if (!isOwner(updater, id)) {
      throw new Error(
        "You are not the owner of this post. Please message the owner to update this post."
      );
    }
    const edits = post.EditHistory;
    const editPoint = new EditPoint({
      post_id: id,
      previousVersion: post.body,
      newVersion: body,
      modifiedBy: updater,
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
    return error;
  }
};

const deletePost = async (id) => {
  try {
    if (!isOwner(updater, id)) {
      throw new Error(
        "You are not the owner of this post. Please message the owner to delete this post."
      );
    }
    const post = await prismaClient.post.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (error) {
    return error;
  }
};

const verifyPost = async (id, verifier) => {
  
  try {
    if(!isVerifier(verifier)){
      throw new Error("You must be a verifier to verify a post");
    }
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
    return error;
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
    return error;
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
    return error;
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
    return error;
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
    return error;
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
