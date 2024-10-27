/*
  Warnings:

  - You are about to drop the column `variationId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,product_id,variation_id]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[variation_id]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id,variation_id]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[variation_id]` on the table `Variation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id,variation_id]` on the table `Variation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `variation_id` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variation_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variation_id` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variation_id` to the `Variation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('COMPLETE', 'INCOMPLETE');

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_variationId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropIndex
DROP INDEX "Cart_user_id_product_id_variationId_key";

-- DropIndex
DROP INDEX "Stock_product_id_key";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "variationId",
ADD COLUMN     "variation_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "address",
DROP COLUMN "productId",
DROP COLUMN "userId",
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "shipping_address" TEXT NOT NULL,
ADD COLUMN     "variation_id" TEXT NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "location" TEXT NOT NULL DEFAULT '123 Main St.',
ADD COLUMN     "variation_id" TEXT NOT NULL,
ALTER COLUMN "product_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Variation" ADD COLUMN     "variation_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "paymentId" TEXT NOT NULL DEFAULT 'payment_id',
    "order_id" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'INCOMPLETE',

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_user_id_product_id_variation_id_key" ON "Cart"("user_id", "product_id", "variation_id");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_variation_id_key" ON "Stock"("variation_id");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_product_id_variation_id_key" ON "Stock"("product_id", "variation_id");

-- CreateIndex
CREATE UNIQUE INDEX "Variation_variation_id_key" ON "Variation"("variation_id");

-- CreateIndex
CREATE UNIQUE INDEX "Variation_product_id_variation_id_key" ON "Variation"("product_id", "variation_id");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_variation_id_fkey" FOREIGN KEY ("variation_id") REFERENCES "Variation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_variation_id_fkey" FOREIGN KEY ("variation_id") REFERENCES "Variation"("variation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_variation_id_fkey" FOREIGN KEY ("variation_id") REFERENCES "Variation"("variation_id") ON DELETE CASCADE ON UPDATE CASCADE;
