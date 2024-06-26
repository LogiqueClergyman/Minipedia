/*
  Warnings:

  - You are about to drop the column `displayName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UserName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "displayName",
DROP COLUMN "type",
ADD COLUMN     "Gender" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "Name" TEXT DEFAULT '',
ADD COLUMN     "UserName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "User_UserName_key" ON "User"("UserName");
