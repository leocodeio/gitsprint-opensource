/*
  Warnings:

  - The `role` column on the `organization_members` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `team_members` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrganizationMemberRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "TeamMemberRole" AS ENUM ('LEAD', 'MEMBER');

-- AlterEnum
ALTER TYPE "SprintStatus" ADD VALUE 'DRAFT';

-- AlterTable
ALTER TABLE "organization_members" DROP COLUMN "role",
ADD COLUMN     "role" "OrganizationMemberRole" NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "team_members" DROP COLUMN "role",
ADD COLUMN     "role" "TeamMemberRole" NOT NULL DEFAULT 'MEMBER';

-- DropEnum
DROP TYPE "OrganizationRole";

-- DropEnum
DROP TYPE "TeamRole";
