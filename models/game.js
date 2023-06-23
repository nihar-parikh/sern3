
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {

    const Game = sequelize.define('game', {
        // Model attributes are defined here
        // Add UUID as primary key
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                const rawValue = this.getDataValue('name');
                return rawValue ? rawValue.toUpperCase() : null;
            }
        },
    }, {
        // Other model options go here
        freezeTableName: false,
        paranoid: true, //for soft delete
        deletedAt: 'soft_delete' //column name soft_delete is added in table
    });


    // `sequelize.define` also returns the model
    console.log(Game === sequelize.models.Game); // true
    return Game
}