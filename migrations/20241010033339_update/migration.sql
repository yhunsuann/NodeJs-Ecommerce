/*
  Warnings:

  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `remember_token` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `created_at`,
    DROP COLUMN `email_verified_at`,
    DROP COLUMN `remember_token`,
    DROP COLUMN `update_at`;
