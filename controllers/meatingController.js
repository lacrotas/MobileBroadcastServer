const { Meatings } = require('../models/models');

class MeatingsController {
    async addMeating(req, res) {
        const { location, data, time, cityId } = req.body;
        const expert = await Meatings.create({ location, data, time, cityId });
        return res.json({ expert });
    }

    async getAllMeating(req, res) {
        const meating = await Meatings.findAll()
        return res.json(meating);
    }
    async getMeatingById(req, res) {
        const { id } = req.params
        const expertStatement = await Meatings.findOne(
            {
                where: { id }
            },
        )
        return res.json(expertStatement)
    }

    async deleteMeatingById(req, res) {
        const { id } = req.params;
        try {
            const deletedRows = await Meatings.destroy({
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
    async deleteMeatingByCityId(req, res) {
        const { cityId } = req.params;
        try {
            const deletedRows = await Meatings.destroy({
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

    async updateMeetingById(req, res) {
        const { id } = req.params;
        const {location, data, time, cityId } = req.body;
    
        try {
            const [updatedRowsCount, updatedRows] = await Meatings.update(
                { 
                    location: location,
                    data: data,
                    time: time,
                    cityId: cityId,
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

    async getMeatingByExpert(req, res) {
        const { expertsId } = req.params
        const expertStatement = await Meatings.findAll(
            {
                where: { expertsId }
            },
        )
        return res.json(expertStatement)
    }
}

module.exports = new MeatingsController();