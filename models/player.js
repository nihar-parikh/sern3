
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {

    const Player = sequelize.define('player', {
        // Model attributes are defined here
        // Add UUID as primary key
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                const rawValue = this.getDataValue('user_name');
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
    console.log(Player === sequelize.models.Player); // true
    return Player
}