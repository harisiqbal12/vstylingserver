/*
  Warnings:

  - You are about to drop the column `subCategory_id` on the `Item` table. All the data in the column will be lost.
  - Added the required column `subcategory_id` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_subCategory_id_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "subCategory_id",
ADD COLUMN     "subcategory_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
