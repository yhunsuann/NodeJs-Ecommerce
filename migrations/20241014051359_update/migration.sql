/*
  Warnings:

  - Made the column `user_id` on table `blog` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `blog` DROP FOREIGN KEY `blog_user_id_fkey`;

-- AlterTable
ALTER TABLE `blog` MODIFY `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `blog` ADD CONSTRAINT `blog_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
