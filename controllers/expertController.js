const { Experts } = require('../models/models');
const uuid = require('uuid');
const path = require('path');

class ExpertController {
    async addExpert(req, res) {
        const { name, aboutText, sex, technologies, cityId, link, meatingId, articles } = req.body;
        const { image } = req.files;
        let fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, '..', 'static', fileName));
        const expert = await Experts.create({ name, image: fileName, aboutText, sex, technologies, cityId, link, meatingId, articles });
        return res.json({ expert });
    }
    async getAllExpert(req, res) {
        const creators = await Experts.findAll()
        return res.json(creators);
    }
    async getExpertById(req, res) {
        const { id } = req.params
        const expertStatement = await Experts.findOne(
            {
                where: { id }
            },
        )
        return res.json(expertStatement)
    }
}

module.exports = new ExpertController();