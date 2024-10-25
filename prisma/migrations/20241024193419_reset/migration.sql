/*
  Warnings:

  - You are about to drop the column `img_url` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,product_id,variationId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,productId]` on the table `WishList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `variationId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variationId` to the `WishList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_user_id_fkey";

-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_productId_fkey";

-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_userId_fkey";

-- DropIndex
DROP INDEX "Cart_user_id_product_id_key";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "variationId" INTEGER NOT NULL,
ALTER COLUMN "quantity" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "img_url",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gender" VARCHAR(1),
ADD COLUMN     "img_url" TEXT,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "WishList" ADD COLUMN     "variationId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Variation" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "size" JSONB,
    "img_url" TEXT NOT NULL,

    CONSTRAINT "Variation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kyc" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "id_no" TEXT NOT NULL,
    "id_url" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipcode" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Kyc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "zipcode" TEXT,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "threshold" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kyc_user_id_key" ON "Kyc"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_product_id_key" ON "Stock"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_user_id_product_id_variationId_key" ON "Cart"("user_id", "product_id", "variationId");

-- CreateIndex
CREATE UNIQUE INDEX "WishList_userId_productId_key" ON "WishList"("userId", "productId");

-- AddForeignKey
ALTER TABLE "Variation" ADD CONSTRAINT "Variation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "Variation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "Variation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kyc" ADD CONSTRAINT "Kyc_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Variation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
