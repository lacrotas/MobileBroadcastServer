const { Country } = require('../models/models');

class CountryController {

    async addCountry(req, res) {
        const { name, bgColor, strokeColor, countryIndex } = req.body;
        const expert = await Country.create({ name, bgColor, strokeColor, countryIndex });
        return res.json({ expert });
    }

    async getAllCountry(req, res) {
        const cityes = await Country.findAll()
        return res.json(cityes);
    }
    async deleteCountryById(req, res) {
        const { id } = req.params;
        try {
            const deletedRows = await Country.destroy({
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

    async updateCountryById(req, res) {
        const { id } = req.params;
        const {name, bgColor, strokeColor, countryIndex } = req.body;
    
        try {
            const [updatedRowsCount, updatedRows] = await Country.update(
                { 
                    name: name,
                    bgColor: bgColor,
                    strokeColor: strokeColor,
                    countryIndex: countryIndex,
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

module.exports = new CountryController();