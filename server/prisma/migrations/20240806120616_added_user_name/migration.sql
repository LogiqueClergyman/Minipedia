/*
  Warnings:

  - You are about to drop the column `Gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `UserName` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_UserName_key";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "editHistory" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "tags" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "verified" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Gender",
DROP COLUMN "Name",
DROP COLUMN "UserName",
ADD COLUMN     "gender" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name" TEXT DEFAULT '',
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'user',
ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PostComment" (
    "postId" INTEGER NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "PostComment_pkey" PRIMARY KEY ("postId","commentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
