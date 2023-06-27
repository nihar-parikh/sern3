
module.exports = (sequelize, DataTypes) => {

    const Tag = sequelize.define('tag', {
        // Model attributes are defined here
        name: DataTypes.STRING
    }, {
        // Other model options go here
        freezeTableName: false
    });

    // `sequelize.define` also returns the model
    console.log(Tag === sequelize.models.Tag); // true
    return Tag
}