import { PrismaClient } from "@prisma/client";
import { createHmac, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
const prismaClient = new PrismaClient({
  // log: ["query", "info", "warn", "error"],
});

const generateHash = (salt, password) => {
  return createHmac("sha256", salt).update(password).digest("hex");
};
// let[]arr = [];
const createUser = async (data) => {
  const { userName, displayImg, email, password } = data;
  const salt = randomBytes(32).toString("hex");
  const hashedPassword = generateHash(salt, password);
  // console.log(
  //   userName + " " + displayImg + " " + email + " " + password
  // );
  // console.log("hii");
  const res = await prismaClient.user.create({
    data: {
      userName,
      displayImg,
      email,
      password: hashedPassword,
      salt,
    },
  });
  // console.log(res);
  return res;
};

const getUser = async (id) => {
  // console.log("id: ",id)
  const userId = parseInt(id, 10);
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });
    // console.log("user: ",user);
    return user;
  } catch (error) {
    return null;
  }
};

const decodeUser = async (token) => {
  try {
    // console.log("decoding: ",token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded: ",decoded);
    const user = await getUser(decoded);
    // console.log(user);
    return user ;
  } catch (error) {
    return null;
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
export { createUser, decodeUser, loginUser };
