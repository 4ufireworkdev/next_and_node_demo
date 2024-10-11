-- DropForeignKey
ALTER TABLE "SaleTempDetails" DROP CONSTRAINT "SaleTempDetails_foodSizeId_fkey";

-- DropForeignKey
ALTER TABLE "SaleTempDetails" DROP CONSTRAINT "SaleTempDetails_tasteId_fkey";

-- AlterTable
ALTER TABLE "SaleTempDetails" ALTER COLUMN "tasteId" DROP NOT NULL,
ALTER COLUMN "foodSizeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SaleTempDetails" ADD CONSTRAINT "SaleTempDetails_tasteId_fkey" FOREIGN KEY ("tasteId") REFERENCES "Taste"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTempDetails" ADD CONSTRAINT "SaleTempDetails_foodSizeId_fkey" FOREIGN KEY ("foodSizeId") REFERENCES "FoodSize"("id") ON DELETE SET NULL ON UPDATE CASCADE;
