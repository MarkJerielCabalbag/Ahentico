-- DropIndex
DROP INDEX `Ahente_userId_fkey` ON `ahente`;

-- DropIndex
DROP INDEX `Product_ahenteId_fkey` ON `product`;

-- CreateTable
CREATE TABLE `ProductCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ahente` ADD CONSTRAINT `Ahente_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductCategory` ADD CONSTRAINT `ProductCategory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_ahenteId_fkey` FOREIGN KEY (`ahenteId`) REFERENCES `Ahente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
