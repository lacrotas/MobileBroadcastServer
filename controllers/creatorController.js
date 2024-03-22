const { Creators } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class CreatorController {
    async addCreator(req, res, next) {
        try {
            const { name, telegram, mail, cityId } = req.body
            const { image } = req.files;
            let fileName = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
            const creator = await Creators.create({ name, image: fileName, cityId, telegram, mail })
            return res.json(creator);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAllCreatorByCityId(req, res) {
        const { cityId } = req.params
        const creators = await Creators.findAll(
            {
                where: { cityId }
            },
        )
        return res.json(creators);
    }
    async getCreatorById(req, res) {
        const { id } = req.params
        const creators = await Creators.findAll(
            {
                where: { id }
            },
        )
        return res.json(creators);
    }
    async deleteCreatorById(req, res) {
        const { id } = req.params
        const creator = await Creators.findOne(
            { where: { id } }
        )
        await creator.destroy();
        return res.json('deleted');
    }
    async deleteAllCreatorByCityId(req, res) {
        const { cityId } = req.params
        const creator = await Creators.destroy(
            { where: { cityId } }
        )
        return res.json('deleted');
    }
    async updateCreatorById(req, res) {
        const { id } = req.params;
        const { name, cityId, telegram, mail } = req.body;
        let fileName;
        try {
            const { image } = req.files;
            fileName = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
        } catch (error) {
            const { image } = req.body;
            fileName = image;
        }
        try {
            const [updatedRowsCount, updatedRows] = await Creators.update(
                {
                    name: name,
                    cityId: cityId,
                    telegram: telegram,
                    mail: mail,
                    image: fileName
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
}

module.exports = new CreatorController();