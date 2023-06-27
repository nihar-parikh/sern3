
module.exports = (sequelize, DataTypes) => {

    const Video = sequelize.define('video', {
        // Model attributes are defined here
        title: DataTypes.STRING,
        text: DataTypes.STRING
    }, {
        // Other model options go here
        freezeTableName: false
    });

    // `sequelize.define` also returns the model
    console.log(Video === sequelize.models.Video); // true
    return Video
}