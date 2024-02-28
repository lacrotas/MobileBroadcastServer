const { Expert_Statement } = require('../models/models');

class ExpertStatementController {
    async addExpertStatement(req, res) {
        const { aboutText, sex, technologies, cityId, links } = req.body;
        const expertStatement = await Expert_Statement.create({ aboutText, sex, technologies, cityId, links });
        return res.json({ expertStatement });
    }
    async getAllExpertStatement(req, res) {
        const meating = await Expert_Statement.findAll()
        return res.json(meating);
    }
    async getExpertStatementById(req, res) {
        const { id } = req.params
        const expertStatement = await Expert_Statement.findOne(
            {
                where: { id }
            },
        )
        return res.json(expertStatement)
    }
}

module.exports = new ExpertStatementController();