import { PrismaClient } from '@prisma/client';
import { createHmac, randomBytes } from 'node:crypto';
import JWT from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const prismaClient = new PrismaClient();

const generateHash = (salt, password) => {
  return createHmac('sha256', salt).update(password).digest('hex');
};

const createUser = async (data) => {
  const { Name, UserName, displayImg, email, level, password } = data;
  const user = await prismaClient.user.findUnique({ where: { UserName } });
  if (user) {
    return "User already exists";
  }
  const salt = randomBytes(32).toString('hex');
  const hashedPassword = generateHash(salt, password);
  const person = await prismaClient.user.create({
    data: {
      Name,
      UserName,
      displayImg,
      email,
      level,
      password: hashedPassword,
      salt,
    },
  });

  return person.UserName;
};


const loginUser = async(data) =>{
  const {UserName , password} = data;
  const user = await prismaClient.user.findUnique({ where: { UserName } });
  if (!user) return "user not found";

  const userSalt = user.salt;
  const usersHashPassword = generateHash(userSalt, password);
  if (usersHashPassword !== user.password)
    return "Incorrect Password";

  const token = JWT.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
  return token;
}



export { createUser ,loginUser };
