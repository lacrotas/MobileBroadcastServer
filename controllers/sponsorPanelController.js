const { Sponsor_Panel } = require('../models/models');
const uuid = require('uuid');
const path = require('path');

class SponsorPanelController {
    async addSponsorStatement(req, res) {
        const { name, link } = req.body;
        const { image } = req.files;
        let fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, '..', 'static', fileName));
        const expertStatement = await Sponsor_Panel.create({ name, link, image: fileName });
        return res.json({ expertStatement });
    }
    async getAllSponsorStatement(req, res) {
        const meating = await Sponsor_Panel.findAll()
        return res.json(meating);
    }
    async getSponsorsStatementById(req, res) {
        const { id } = req.params
        const expertStatement = await Sponsor_Panel.findOne(
            {
                where: { id }
            },
        )
        return res.json(expertStatement)
    }
    async deleteSponsorStatementById(req, res) {
        const { id } = req.params;
        try {
            const deletedRows = await Sponsor_Panel.destroy({
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

module.exports = new SponsorPanelController();