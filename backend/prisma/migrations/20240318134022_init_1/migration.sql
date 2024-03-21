-- CreateTable
CREATE TABLE `Codestore` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `stdin` VARCHAR(191) NOT NULL,
    `sourceCode` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Codestore_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
