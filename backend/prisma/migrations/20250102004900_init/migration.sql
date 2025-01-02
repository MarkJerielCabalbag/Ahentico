/*
  Warnings:

  - Added the required column `productUnit` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Ahente_userId_fkey` ON `ahente`;

-- DropIndex
DROP INDEX `Product_ahenteId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `productUnit` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Ahente` ADD CONSTRAINT `Ahente_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_ahenteId_fkey` FOREIGN KEY (`ahenteId`) REFERENCES `Ahente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
