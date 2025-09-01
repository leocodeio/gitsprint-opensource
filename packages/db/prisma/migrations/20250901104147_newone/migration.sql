/*
  Warnings:

  - You are about to drop the column `githubId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `githubUsername` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `googleId` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "githubId",
DROP COLUMN "githubUsername",
DROP COLUMN "googleId";
