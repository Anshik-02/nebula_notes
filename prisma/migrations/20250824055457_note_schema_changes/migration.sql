/*
  Warnings:

  - You are about to drop the column `isArchived` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "isArchived",
ADD COLUMN     "isStarred" BOOLEAN NOT NULL DEFAULT false;
