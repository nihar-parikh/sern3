const { Sequelize, DataTypes } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('world', 'root', 'RadhaKrishna@512', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require("./user")(sequelize, DataTypes)
db.contact = require("./contact")(sequelize, DataTypes)
db.hobbies = require("./hobbies")(sequelize, DataTypes)
db.actor = require("./actor")(sequelize, DataTypes)
db.movie = require("./movie")(sequelize, DataTypes)
db.actorMovie = require("./actorMovie")(sequelize, DataTypes)


db.user.hasOne(db.contact, { foreignKey: 'user_id', as: 'contact_details' })
db.contact.belongsTo(db.user, { foreignKey: 'user_id' })

db.user.hasMany(db.hobbies, { foreignKey: 'user_id', as: 'hobbies' })
db.hobbies.belongsTo(db.user, { foreignKey: 'user_id', as: 'user_details' })


db.movie.belongsToMany(db.actor, { through: 'actor_movies' });
db.actor.belongsToMany(db.movie, { through: 'actor_movies' });

db.sequelize.sync({ force: false })

module.exports = db