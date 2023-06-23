
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {

    const Actor = sequelize.define('actor', {
        // Model attributes are defined here
        // Add UUID as primary key
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4(), // Generate UUID automatically
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        // Other model options go here
        freezeTableName: false
    });


    // `sequelize.define` also returns the model
    console.log(Actor === sequelize.models.Actor); // true
    return Actor
}