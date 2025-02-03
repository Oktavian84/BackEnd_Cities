-- CreateTable
CREATE TABLE `phones` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `img_url` VARCHAR(191) NOT NULL,
    `city_name` VARCHAR(191) NOT NULL,
    `city_location` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
