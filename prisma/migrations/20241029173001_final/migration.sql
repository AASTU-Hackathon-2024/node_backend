/*
  Warnings:

  - You are about to drop the column `type` on the `Order` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "type",
ADD COLUMN     "PaymentMethod" "OrderType" NOT NULL DEFAULT 'CHAPPA',
ADD COLUMN     "orderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "bnpl" ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 3,
ALTER COLUMN "installement" SET DEFAULT 0;
