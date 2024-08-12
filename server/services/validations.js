import { GraphQLError } from "graphql";
import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();
const throwError = (message, code, status) => {
  throw new GraphQLError(message, {
    extensions: {
      code,
      http: { status },
    },
  });
};

const isAuthenticated = (resolver) => async (parent, args, context, info) => {
  console.log(context)
  if (!context.user) {
    throwError("User is not authenticated", "UNAUTHENTICATED", 401);
  }
  return resolver(parent, args, context, info);
};
const isVerifier = (resolver) => async (parent, args, context, info) => {
  if (context.user.type !== "verifier") {
    throwError("User is not a verifier", "UNAUTHORIZED", 403);
  }
  return resolver(parent, args, context, info);
};
const isModOf = (resolver) => async (parent, args, context, info) => {
  const groups = await prismaClient.groupMembership.findMany({
    where: {
      userId: context.user.id,
      role: "mod",
    },
  });
  if (groups.length === 0) throwError("User is not a mod", "UNAUTHORIZED", 403);
  const modifiedContext = { ...context, groups };
  return resolver(parent, args, modifiedContext, info);
};
const isMemberOf = (resolver) => async (parent, args, context, info) => {
  const groups = await prismaClient.groupMembership.findMany({
    where: {
      userId: context.user.id,
    },
  });
  if (groups.length === 0)
    throwError("User is not a member", "UNAUTHORIZED", 403);
  const modifiedContext = { ...context, groups };
  return resolver(parent, args, modifiedContext, info);
};
export { isAuthenticated, isVerifier, isModOf, isMemberOf, throwError };
