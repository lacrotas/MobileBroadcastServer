const sequelize = require("../db");
const { DataTypes } = require("sequelize")

const Creators = sequelize.define('creators', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    link: { type: DataTypes.STRING, },
    image: { type: DataTypes.STRING },
})

const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
})

const City = sequelize.define('cities', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    link: { type: DataTypes.STRING, },
    image: { type: DataTypes.STRING },
    gallary: { type: DataTypes.STRING },
    creatorsId: { type: DataTypes.STRING },
    countryId: { type: DataTypes.INTEGER },
})

const Country = sequelize.define('countries', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    bgColor: { type: DataTypes.STRING },
    strokeColor: { type: DataTypes.STRING },
    countryIndex: { type: DataTypes.INTEGER }
})
const Experts = sequelize.define('experts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    aboutText: { type: DataTypes.STRING },
    sex: { type: DataTypes.STRING },
    articles: { type: DataTypes.STRING },
    technologies: { type: DataTypes.STRING },
    cityId: { type: DataTypes.INTEGER },
    link: { type: DataTypes.STRING },
    meatingId: { type: DataTypes.STRING },
})

const Meatings = sequelize.define('meatings', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    location: { type: DataTypes.STRING },
    data: { type: DataTypes.STRING },
    time: { type: DataTypes.STRING },
    cityId: { type: DataTypes.STRING },
    expertsId: { type: DataTypes.STRING }
})


const Expert_Statement = sequelize.define('expertStatement', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    aboutText: { type: DataTypes.STRING },
    sex: { type: DataTypes.STRING },
    technologies: { type: DataTypes.STRING },
    cityId: { type: DataTypes.STRING },
    links: { type: DataTypes.STRING },
})

// Country.hasMany(City);
// City.belongsTo(Country);

module.exports = {
    Creators,
    Country,
    City,
    Experts,
    Meatings,
    User,
    Expert_Statement
}
