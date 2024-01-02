/*
  Warnings:

  - You are about to alter the column `fotoperfil` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `MediumBlob` to `VarChar(350)`.
  - Added the required column `imagen` to the `categorias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categorias` ADD COLUMN `imagen` MEDIUMBLOB NOT NULL;

-- AlterTable
ALTER TABLE `usuario` MODIFY `fotoperfil` VARCHAR(350) NULL;
