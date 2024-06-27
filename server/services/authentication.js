import { PrismaClient } from "@prisma/client";
import { createHmac, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
const prismaClient = new PrismaClient();

const generateHash = (salt, password) => {
  return createHmac("sha256", salt).update(password).digest("hex");
};
// let[]arr = [];
const createUser = async (data) => {
  const { displayName, displayImg, email, type, password } = data;
  const salt = randomBytes(32).toString("hex");
  const hashedPassword = generateHash(salt, password);
  console.log(
    displayName + " " + displayImg + " " + email + " " + type + " " + password
  );
  console.log("hii");
  const res = await prismaClient.user.create({
    data: {
      displayName,
      displayImg,
      email,
      type,
      password: hashedPassword,
      salt,
    },
  });
  console.log(res);
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

const decodeUser = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const user = await getUser(decoded.id);
    return user;
  } catch (error) {
    return null;
  }
};

export { createUser, decodeUser };
