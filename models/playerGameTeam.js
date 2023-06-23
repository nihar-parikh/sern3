
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {

    const PlayerGameTeam = sequelize.define('player_game_teams', {
        // Model attributes are defined here
        // Add UUID as primary key
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
    }, {
        // Other model options go here
        tableName: "player_game_teams",
        freezeTableName: false,
        paranoid: true, //for soft delete
        deletedAt: 'soft_delete' //column name soft_delete is added in table
    });


    // `sequelize.define` also returns the model
    console.log(PlayerGameTeam === sequelize.models.PlayerGameTeam); // true
    return PlayerGameTeam
}