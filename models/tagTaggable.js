
module.exports = (sequelize, DataTypes) => {

    //By setting the unique option to 'tt_unique_constraint', it indicates that the combination of values for these three attributes must be unique within the table. This means that no two rows in the table can have the same values for tagId, taggableId, and taggableType.

    //The purpose of this unique constraint is to enforce data integrity and prevent duplicates in the TagTaggable table. It ensures that each combination of tag, taggable ID, and taggable type is unique, allowing efficient querying and avoiding inconsistencies in the data.

    const TagTaggable = sequelize.define('tag_taggable', {
        // Model attributes are defined here
        tagId: {
            type: DataTypes.INTEGER,
            unique: 'tt_unique_constraint'
        },
        taggableId: {
            type: DataTypes.INTEGER,
            unique: 'tt_unique_constraint',
            references: null
        },
        taggableType: {
            type: DataTypes.STRING,
            unique: 'tt_unique_constraint'
        }
    }, {
        // Other model options go here
        freezeTableName: false
    });

    // `sequelize.define` also returns the model
    console.log(TagTaggable === sequelize.models.TagTaggable); // true
    return TagTaggable
}