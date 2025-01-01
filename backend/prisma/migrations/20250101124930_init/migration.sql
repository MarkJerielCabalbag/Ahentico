/*
  Warnings:

  - Made the column `contact` on table `ahente` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Ahente_userId_fkey` ON `ahente`;

-- DropIndex
DROP INDEX `Product_ahenteId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `ahente` MODIFY `contact` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Ahente` ADD CONSTRAINT `Ahente_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_ahenteId_fkey` FOREIGN KEY (`ahenteId`) REFERENCES `Ahente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
