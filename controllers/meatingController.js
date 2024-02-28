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