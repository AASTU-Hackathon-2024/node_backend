/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Variation` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `WishList` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `WishList` table. All the data in the column will be lost.
  - You are about to drop the column `variationId` on the `WishList` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,product_id]` on the table `WishList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Variation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `WishList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `WishList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variation_id` to the `WishList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Variation" DROP CONSTRAINT "Variation_productId_fkey";

-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_productId_fkey";

-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_userId_fkey";

-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_variationId_fkey";

-- DropIndex
DROP INDEX "WishList_userId_productId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Variation" DROP COLUMN "productId",
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WishList" DROP COLUMN "productId",
DROP COLUMN "userId",
DROP COLUMN "variationId",
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "variation_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WishList_user_id_product_id_key" ON "WishList"("user_id", "product_id");

-- AddForeignKey
ALTER TABLE "Variation" ADD CONSTRAINT "Variation_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_variation_id_fkey" FOREIGN KEY ("variation_id") REFERENCES "Variation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
