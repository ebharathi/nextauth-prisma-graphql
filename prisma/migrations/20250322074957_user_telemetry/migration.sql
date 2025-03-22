-- AlterTable
ALTER TABLE `User` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `lastLoginAt` DATETIME(3) NULL,
    ADD COLUMN `lastLogoutAt` DATETIME(3) NULL,
    ADD COLUMN `utmSource` VARCHAR(191) NULL;
