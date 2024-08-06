import { PrismaClient } from "@prisma/client";
import { createHmac, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
const prismaClient = new PrismaClient();

const generateHash = (salt, password) => {
  return createHmac("sha256", salt).update(password).digest("hex");
};
// let[]arr = [];
const createUser = async (data) => {
  const { userName, displayImg, email, password } = data;
  const salt = randomBytes(32).toString("hex");
  const hashedPassword = generateHash(salt, password);
  console.log(
    userName + " " + displayImg + " " + email + " " + password
  );
  console.log("hii");
  const res = await prismaClient.user.create({
    data: {
      userName,
      displayImg,
      email,
      password: hashedPassword,
      salt,
    },
  });
  console.log(res);
  return res;
};

const getUser = async (id) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

const isOwner = (user, id) => {
  return user.id === id;
};

const isVerifier = (user) => {
  return user.type == "verifier";
};

const decodeUser = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUser(decoded.id);
    return {user};
  } catch (error) {
    return {};
  }
};

const loginUser = async (data) => {
  const { email, password } = data;
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const hashedPassword = generateHash(user.salt, password);
  if (hashedPassword !== user.password) {
    throw new Error("Incorrect password");
  }
  return getUserToken(user.id);
};

const getUserToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET);
};
export { createUser, decodeUser, loginUser, isOwner, isVerifier };
