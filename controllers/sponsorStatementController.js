const { Sponsor_Statement } = require('../models/models');

class SponsorStatementController {
    async addSponsorStatement(req, res) {
        const { name, link } = req.body;
        const expertStatement = await Sponsor_Statement.create({ name, link });
        return res.json({ expertStatement });
    }
    async getAllSponsorStatement(req, res) {
        const meating = await Sponsor_Statement.findAll()
        return res.json(meating);
    }
    async getSponsorsStatementById(req, res) {
        const { id } = req.params
        const expertStatement = await Sponsor_Statement.findOne(
            {
                where: { id }
            },
        )
        return res.json(expertStatement)
    }
    async deleteSponsorStatementById(req, res) {
        const { id } = req.params;
        try {
            const deletedRows = await Sponsor_Statement.destroy({
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
}

module.exports = new SponsorStatementController();