
module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define('comment', {
        // Model attributes are defined here
        title: DataTypes.STRING,
        commentableId: DataTypes.INTEGER,
        commentableType: DataTypes.STRING
    }, {
        // Other model options go here
        freezeTableName: false
    });

    // `sequelize.define` also returns the model
    console.log(Comment === sequelize.models.Comment); // true
    return Comment
}