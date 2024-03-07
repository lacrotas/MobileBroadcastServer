const { City } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class CityController {
    async addCity(req, res, next) {
        try {
            const { name, link, countryId } = req.body;
            const { image } = req.files;
            let fileName = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
            // const { gallary } = req.files;
            // let fileArray = "";
            // for (let i = 0; i < gallary.length; i++) {
            //     let fileGallaryName = uuid.v4() + ".jpg";
            //     gallary[i].mv(path.resolve(__dirname, '..', 'static', fileGallaryName));
            //     fileArray += fileGallaryName + "/";
            // }
            // gallary: fileArray
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

    }
}

module.exports = new CityController();