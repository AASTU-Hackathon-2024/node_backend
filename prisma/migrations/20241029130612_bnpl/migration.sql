/*
  Warnings:

  - You are about to drop the column `order_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('BTB', 'BNPL', 'CHAPPA', 'OTHER');

-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'SHIPPED';

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_order_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "order_id",
ADD COLUMN     "type" "OrderType" NOT NULL DEFAULT 'CHAPPA',
ADD COLUMN     "user_id" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Payment";

-- DropEnum
DROP TYPE "PaymentStatus";

-- CreateTable
CREATE TABLE "bnpl" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "installement" DOUBLE PRECISION NOT NULL,
    "base" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "bnpl_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
