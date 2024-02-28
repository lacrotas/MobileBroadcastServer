const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
const ApiError = require("../error/ApiError");

const generateJwt = (id, login) => {
    return jwt.sign(
        {id, login},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const { login, password } = req.body;
        if (!login || !password) {
            return next.json(ApiError.badRequest("Некорректный логин или пароль"));
        }
        const candidat = await User.findOne({ where: { login } });
        if (candidat) {
            return next.json(ApiError.badRequest("Пользователь с таким логином уже существует"));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ login, password: hashPassword });
        const token = jwt.sign(
            { id: user.id, login },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
        );
        return res.json({ token });

    }
    async login(req, res, next) {
        const { login, password } = req.body;
        const user = await User.findOne({ where: { login } });
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.badRequest('Указан неверный пароль'));
        }
        const token = jwt.sign(
            { id: user.id, login },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
        );
        return res.json({ token });
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login)
        return res.json({token})
    }
}

module.exports = new UserController();