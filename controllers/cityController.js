const { City } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class CityController {
    async addCity(req, res, next) {
        try {
            const { name, link, countryId } = req.body;
            const { image } = req.files;
            const gallaryFiles = req.files['gallary'];
            let fileName = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
            const city = await City.create({ name, link, countryId, image: fileName });
            return res.json(city);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAllCity(req, res) {
        const cityes = await City.findAll()
        return res.json(cityes);
    }
    async getAllCityByCountryId(req, res) {
        const { countryId } = req.params
        const expertStatement = await City.findAll(
            {
                where: { countryId }
            },
        )
        return res.json(expertStatement)
    }
    async getCityById(req, res) {
        const { id } = req.params
        const expertStatement = await City.findOne(
            {
                where: { id }
            },
        )
        return res.json(expertStatement)
    }
    async deleteCityById(req, res) {
        const { id } = req.params;
        try {
            const deletedRows = await City.destroy({
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
    async updateCityById(req, res) {
        const { id } = req.params;
        const { name, link, countryId } = req.body;
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
            const [updatedRowsCount, updatedRows] = await City.update(
                {
                    name: name,
                    link: link,
                    countryId: countryId,
                    image: fileName,
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

module.exports = new CityController();