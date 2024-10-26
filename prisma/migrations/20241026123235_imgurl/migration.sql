/*
  Warnings:

  - Made the column `size` on table `Variation` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `img_url` on the `Variation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Variation" ALTER COLUMN "size" SET NOT NULL,
DROP COLUMN "img_url",
ADD COLUMN     "img_url" JSONB NOT NULL;
