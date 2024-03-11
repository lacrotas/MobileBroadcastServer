const { GallaryImage } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class GallaryImageController {
    async addGallaryImage(req, res) {
        const { cityId } = req.body;
        let fileName;
        const { file } = req.files;
        fileName = uuid.v4() + path.extname(file.name);
        file.mv(path.resolve(__dirname, '..', 'static', fileName));
        const article = await GallaryImage.create({ cityId, file: fileName });
        return res.json({ article });
    }

    async deleteGallaryImageById(req, res) {
        const { id } = req.params;
        try {
            // const filePath = path.resolve(__dirname, '..', 'static', file);
            // // Удаление файла
            // fs.unlink(filePath, (err) => {
            //     if (err) {
            //         console.error(err);
            //         return;
            //     }
            //     console.log('Файл успешно удален');
            // });
            const deletedRows = await GallaryImage.destroy({
                where: { id }
            });

            if (deletedRows > 0) {
                // Объект успешно удален
                res.status(200).json({ message: 'Объект успешно удален' });
            } else {
                // Объект не найден
                res.status(404).json({ message: 'Объект не найден' });
            }
        } catch (error) {
            console.error('Ошибка при удалении объекта:', error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }

    }
    async deleteAllGallaryImageByCityId(req, res) {
        const { cityId } = req.params;
        try {
            const deletedRows = await GallaryImage.destroy({
                where: { cityId }
            });

            if (deletedRows > 0) {
                // Объект успешно удален
                res.status(200).json({ message: 'Объект успешно удален' });
            } else {
                // Объект не найден
                res.status(404).json({ message: 'Объект не найден' });
            }
        } catch (error) {
            console.error('Ошибка при удалении объекта:', error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }

    }
    async getAllGallaryImageByCityId(req, res) {
        const { cityId } = req.params
        const expertStatement = await GallaryImage.findAll(
            {
                where: { cityId }
            },
        )
        return res.json(expertStatement || [])
    }
}

module.exports = new GallaryImageController();