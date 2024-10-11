/*
  Warnings:

  - Changed the type of `tableNo` on the `SaleTemp` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SaleTemp" DROP COLUMN "tableNo",
ADD COLUMN     "tableNo" INTEGER NOT NULL;
