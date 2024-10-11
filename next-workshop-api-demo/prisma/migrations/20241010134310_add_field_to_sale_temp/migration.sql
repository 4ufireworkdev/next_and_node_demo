/*
  Warnings:

  - You are about to drop the `SaleTempDetails` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `foodId` to the `SaleTemp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SaleTempDetails" DROP CONSTRAINT "SaleTempDetails_foodId_fkey";

-- DropForeignKey
ALTER TABLE "SaleTempDetails" DROP CONSTRAINT "SaleTempDetails_foodSizeId_fkey";

-- DropForeignKey
ALTER TABLE "SaleTempDetails" DROP CONSTRAINT "SaleTempDetails_saleTempId_fkey";

-- DropForeignKey
ALTER TABLE "SaleTempDetails" DROP CONSTRAINT "SaleTempDetails_tasteId_fkey";

-- AlterTable
ALTER TABLE "SaleTemp" ADD COLUMN     "foodId" INTEGER NOT NULL,
ADD COLUMN     "qty" INTEGER;

-- DropTable
DROP TABLE "SaleTempDetails";

-- CreateTable
CREATE TABLE "SaleTempDetail" (
    "id" SERIAL NOT NULL,
    "saleTempId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    "tasteId" INTEGER,
    "foodSizeId" INTEGER,

    CONSTRAINT "SaleTempDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaleTemp" ADD CONSTRAINT "SaleTemp_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTempDetail" ADD CONSTRAINT "SaleTempDetail_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTempDetail" ADD CONSTRAINT "SaleTempDetail_tasteId_fkey" FOREIGN KEY ("tasteId") REFERENCES "Taste"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTempDetail" ADD CONSTRAINT "SaleTempDetail_foodSizeId_fkey" FOREIGN KEY ("foodSizeId") REFERENCES "FoodSize"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTempDetail" ADD CONSTRAINT "SaleTempDetail_saleTempId_fkey" FOREIGN KEY ("saleTempId") REFERENCES "SaleTemp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
