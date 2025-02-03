/*
  Warnings:

  - You are about to drop the `phones` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `phones`;

-- CreateTable
CREATE TABLE `cities` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `img_url` VARCHAR(191) NOT NULL,
    `city_name` VARCHAR(191) NOT NULL,
    `city_location` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
