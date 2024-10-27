-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_variation_id_fkey";

-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_variation_id_fkey";

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "variation_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "WishList" ALTER COLUMN "variation_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_variation_id_fkey" FOREIGN KEY ("variation_id") REFERENCES "Variation"("variation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_variation_id_fkey" FOREIGN KEY ("variation_id") REFERENCES "Variation"("variation_id") ON DELETE CASCADE ON UPDATE CASCADE;
