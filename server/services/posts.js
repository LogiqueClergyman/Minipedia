import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();
import EditPoint from "../models/EditPoint";
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
    const post = await getPost(id);
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

const verifyPost = async (id) => {
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
}

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
}

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
}

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
}

export { getPosts, getPost, createPost, updatePost, deletePost, verifyPost, likePost, unlikePost, addToGroup, removeFromGroup};
