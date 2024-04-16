const { Experts, Meatings } = require('../models/models');
const uuid = require('uuid');
const path = require('path');

class ExpertController {
    async addExpert(req, res) {
        const { name, aboutText, sex, technologies, cityId, linkTelegram, linkMail, linkGitHab, linkLinkedIn, meatingId, cityWithoutList } = req.body;
        let fileName;
        try {
            const { image } = req.files;
            fileName = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
        } catch (error) {
            if (sex == "men") {
                fileName = "menAvatar.png"
            } else {
                fileName = "womenAvatar.png"
            }
        }
        const expert = await Experts.create({ name, image: fileName, aboutText, sex, technologies, cityId, linkTelegram, linkMail, linkGitHab, linkLinkedIn, meatingId, cityWithoutList });
        return res.json({ expert });
    }

    async updateExpert(req, res) {
        const { id } = req.params;
        const { name, aboutText, sex, technologies, cityId, linkTelegram, linkMail, meatingId, articles, linkGitHab, linkLinkedIn, cityWithoutList } = req.body;
        let fileName;
        try {
            const { image } = req.files;
            fileName = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
        } catch (error) {
            const { image } = req.body;
            if (image) {
                fileName = image;
            }
            else {
                if (sex == "men") {
                    fileName = "menAvatar.png"
                } else {
                    fileName = "womenAvatar.png"
                }
            }
        }
        let newCityId, newCityWithoutList;

        if(cityId != "undefined"){
            newCityId = cityId;
            newCityWithoutList = null;
        }else{
            newCityId = null;
            newCityWithoutList = cityWithoutList;
        } 
        /*updating */
        try {
            const [updatedRowsCount, updatedRows] = await Experts.update(
                {
                    name: name,
                    image: fileName,
                    aboutText: aboutText,
                    sex: sex,
                    technologies: technologies,
                    cityId: newCityId,
                    linkTelegram: linkTelegram,
                    linkMail: linkMail,
                    linkGitHab:linkGitHab,
                    linkLinkedIn: linkLinkedIn,
                    meatingId: meatingId,
                    articles: articles,
                    cityWithoutList: newCityWithoutList,
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
    async deleteExpertById(req, res) {
        const { id } = req.params;
        try {
            const deletedRows = await Experts.destroy({
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

    async deleteExpertByCityId(req, res) {
        const { cityId } = req.params
        const expertStatement = await Experts.destroy(
            {
                where: { cityId }
            },
        )
        return res.json(expertStatement)
    }
    async getExpertsForMeeting(req, res) {
        const { meatingId } = req.params;
        try {

            // Разделяем строку в поле ExpertId на отдельные идентификаторы экспертов
            const meatingIds = meatingId.split('.');
            console.log(meatingIds);
            // Запрашиваем экспертные записи из базы данных по идентификаторам1
            const experts = await Meatings.findAll({
                where: { id: meatingIds }
            });
            return res.json(experts);
        } catch (error) {
            console.error("Error fetching experts:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

module.exports = new ExpertController();