/*
  Warnings:

  - Added the required column `stock` to the `Variation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_product_id_fkey";

-- AlterTable
ALTER TABLE "Variation" ADD COLUMN     "stock" INTEGER NOT NULL;
