const { v4: uuidv4 } = require('uuid');
const db = require("../models");

module.exports = (sequelize, DataTypes) => {
    const Hobbies = sequelize.define(
        'hobbies',
        {
            // Model attributes are defined here
            //by default it will take userId as foreign key
            //so in associations write alias as user_id
            user_id: {
                type: DataTypes.UUID,
            },
            hobby: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            // Other model options go here
            freezeTableName: true,
            timestamps: false, // Disable automatic timestamp fields (createdAt, updatedAt)
            createdAt: false,
            updatedAt: false,
            underscored: true, // Use underscored naming convention for columns (e.g., permanent_address, current_address)
            primaryKey: false, // Disable the default 'id' primary key column
        }
    );

    Hobbies.removeAttribute('id'); // Remove the 'id' attribute

    // `sequelize.define` also returns the model
    console.log(Hobbies === sequelize.models.Hobbies); // true
    return Hobbies;
};
