-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_country_fkey` FOREIGN KEY (`id_country`) REFERENCES `country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
