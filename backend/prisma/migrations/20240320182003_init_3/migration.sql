/*
  Warnings:

  - Added the required column `output` to the `Codestore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Codestore` ADD COLUMN `output` VARCHAR(191) NOT NULL;
