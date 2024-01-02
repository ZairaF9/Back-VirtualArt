-- AlterTable
ALTER TABLE `categorias` MODIFY `imagen` MEDIUMBLOB NULL;

-- AlterTable
ALTER TABLE `tablero` ADD COLUMN `imagen` MEDIUMBLOB NULL;

-- AlterTable
ALTER TABLE `usuario` MODIFY `userpassword` VARCHAR(30) NULL;
