const { Articles } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class ArticlesController {
    async addArticle(req, res) {
        const { name, expertId } = req.body;
        let fileName;
        const { file } = req.files;
        fileName = uuid.v4() + path.extname(file.name);
        file.mv(path.resolve(__dirname, '..', 'static', fileName));
        const article = await Articles.create({ name, expertId, file: fileName });
        return res.json({ article });
    }

    async updateArticle(req, res) {
        const { id } = req.params;
        const { name, expertId } = req.body;
        let fileName;
        const { file } = req.files;
        fileName = uuid.v4() + path.extname(file.name);
        file.mv(path.resolve(__dirname, '..', 'static', fileName));

        /*updating */
        try {
            const [updatedRowsCount, updatedRows] = await Articles.update(
                {
                    name: name,
                    expertId: expertId,
                    file: fileName
                },
                {
                    returning: true,
                    where: { id }
                }
            );

            if (updatedRowsCount > 0) {
                // Данные успешно обновлены, возвращаем обновленные данные
                res.status(200).json({ message: 'Данные успешно обновлены', updatedRows });
            } else {
                // Запись с указанным id не найдена
                res.status(404).json({ message: 'Запись не найдена' });
            }
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async deleteArticleById(req, res) {
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
            const deletedRows = await Articles.destroy({
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

    async getAllArticlesByExpertId(req, res) {
        const { expertId } = req.params
        const expertStatement = await Articles.findAll(
            {
                where: { expertId }
            },
        )
        return res.json(expertStatement || [])
    }
}

module.exports = new ArticlesController();