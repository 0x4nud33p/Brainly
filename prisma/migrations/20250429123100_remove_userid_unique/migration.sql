/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "link_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");
