/*
  Warnings:

  - Made the column `created_at` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image_user` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `level` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_name` on table `comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `comment` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `image_user` VARCHAR(191) NOT NULL,
    MODIFY `level` INTEGER NOT NULL,
    MODIFY `user_name` VARCHAR(191) NOT NULL;
