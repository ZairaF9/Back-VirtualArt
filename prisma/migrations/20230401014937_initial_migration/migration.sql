-- CreateTable
CREATE TABLE `categorias` (
    `idcategorias` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `idcategorias`(`idcategorias`),
    PRIMARY KEY (`idcategorias`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comentarios` (
    `idcomentarios` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(350) NOT NULL,
    `fecha` DATE NOT NULL,
    `idusuario` INTEGER NOT NULL,
    `idpublicacion` INTEGER NOT NULL,

    UNIQUE INDEX `idcomentarios`(`idcomentarios`),
    INDEX `idpublicacion`(`idpublicacion`),
    INDEX `idusuario`(`idusuario`),
    PRIMARY KEY (`idcomentarios`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imagen` (
    `idimagen` INTEGER NOT NULL AUTO_INCREMENT,
    `imagen` MEDIUMBLOB NOT NULL,
    `idpublicacion` INTEGER NOT NULL,

    UNIQUE INDEX `idimagen`(`idimagen`),
    INDEX `idpublicacion`(`idpublicacion`),
    PRIMARY KEY (`idimagen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publicaciones` (
    `idpublicaciones` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(45) NOT NULL,
    `descripcion` VARCHAR(250) NOT NULL,
    `idcategoria` INTEGER NOT NULL,
    `idusuario` INTEGER NOT NULL,

    UNIQUE INDEX `idpublicaciones`(`idpublicaciones`),
    INDEX `idcategoria`(`idcategoria`),
    INDEX `idusuario`(`idusuario`),
    PRIMARY KEY (`idpublicaciones`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publicacionesguardadas` (
    `idpublicacionesguardadas` INTEGER NOT NULL AUTO_INCREMENT,
    `idpublicacion` INTEGER NOT NULL,
    `idusuario` INTEGER NOT NULL,

    UNIQUE INDEX `idpublicacionesguardadas`(`idpublicacionesguardadas`),
    INDEX `idpublicacion`(`idpublicacion`),
    INDEX `idusuario`(`idusuario`),
    PRIMARY KEY (`idpublicacionesguardadas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publicacionestablero` (
    `idpublicacionestablero` INTEGER NOT NULL AUTO_INCREMENT,
    `idtablero` INTEGER NOT NULL,
    `idpublicacion` INTEGER NOT NULL,

    UNIQUE INDEX `idpublicacionestablero`(`idpublicacionestablero`),
    INDEX `idpublicacion`(`idpublicacion`),
    INDEX `idtablero`(`idtablero`),
    PRIMARY KEY (`idpublicacionestablero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tablero` (
    `idtablero` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `privacidad` TINYINT NOT NULL,
    `idusuario` INTEGER NOT NULL,

    UNIQUE INDEX `idtablero`(`idtablero`),
    INDEX `idusuario`(`idusuario`),
    PRIMARY KEY (`idtablero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `idusuario` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `userpassword` VARCHAR(8) NOT NULL,
    `fotoperfil` MEDIUMBLOB NOT NULL,

    UNIQUE INDEX `idusuario`(`idusuario`),
    PRIMARY KEY (`idusuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario`(`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`idpublicacion`) REFERENCES `publicaciones`(`idpublicaciones`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `imagen` ADD CONSTRAINT `imagen_ibfk_1` FOREIGN KEY (`idpublicacion`) REFERENCES `publicaciones`(`idpublicaciones`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `publicaciones` ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`idcategoria`) REFERENCES `categorias`(`idcategorias`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `publicaciones` ADD CONSTRAINT `publicaciones_ibfk_2` FOREIGN KEY (`idusuario`) REFERENCES `usuario`(`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `publicacionesguardadas` ADD CONSTRAINT `publicacionesguardadas_ibfk_1` FOREIGN KEY (`idpublicacion`) REFERENCES `publicaciones`(`idpublicaciones`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `publicacionesguardadas` ADD CONSTRAINT `publicacionesguardadas_ibfk_2` FOREIGN KEY (`idusuario`) REFERENCES `usuario`(`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `publicacionestablero` ADD CONSTRAINT `publicacionestablero_ibfk_1` FOREIGN KEY (`idtablero`) REFERENCES `tablero`(`idtablero`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `publicacionestablero` ADD CONSTRAINT `publicacionestablero_ibfk_2` FOREIGN KEY (`idpublicacion`) REFERENCES `publicaciones`(`idpublicaciones`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tablero` ADD CONSTRAINT `tablero_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario`(`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
