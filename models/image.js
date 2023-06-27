
module.exports = (sequelize, DataTypes) => {

    const Image = sequelize.define('image', {
        // Model attributes are defined here
        title: DataTypes.STRING,
        url: DataTypes.STRING
    }, {
        // Other model options go here
        freezeTableName: false
    });

    // `sequelize.define` also returns the model
    console.log(Image === sequelize.models.Image); // true
    return Image
}