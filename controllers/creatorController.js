const { Creators } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class CreatorController {
    async addCreator(req, res, next) {
        try {
            const { name, link } = req.body
            const { image } = req.files;
            let fileName = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
            const creator = await Creators.create({ name, link, image: fileName })
            return res.json(creator);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAllCreator(req, res) {
        const creators = await Creators.findAll()
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
}

module.exports = new CreatorController();