/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Link_id_key" ON "Link"("id");
