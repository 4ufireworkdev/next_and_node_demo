-- CreateTable
CREATE TABLE "SaleTemp" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tableNo" TEXT NOT NULL,

    CONSTRAINT "SaleTemp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleTempDetails" (
    "id" SERIAL NOT NULL,
    "saleTempId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    "tasteId" INTEGER NOT NULL,
    "foodSizeId" INTEGER NOT NULL,

    CONSTRAINT "SaleTempDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaleTempDetails" ADD CONSTRAINT "SaleTempDetails_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTempDetails" ADD CONSTRAINT "SaleTempDetails_tasteId_fkey" FOREIGN KEY ("tasteId") REFERENCES "Taste"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTempDetails" ADD CONSTRAINT "SaleTempDetails_foodSizeId_fkey" FOREIGN KEY ("foodSizeId") REFERENCES "FoodSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTempDetails" ADD CONSTRAINT "SaleTempDetails_saleTempId_fkey" FOREIGN KEY ("saleTempId") REFERENCES "SaleTemp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
