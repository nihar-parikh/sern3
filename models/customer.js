
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {

    const Customer = sequelize.define('customer', {
        // Model attributes are defined here
        // Add UUID as primary key
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4(), // Generate UUID automatically
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
        points: {
            type: DataTypes.INTEGER,
        },

    }, {
        // Other model options go here
        freezeTableName: false,
        paranoid: true, //for soft delete
        deletedAt: 'soft_delete' //column name soft_delete is added in table
    });


    // `sequelize.define` also returns the model
    console.log(Customer === sequelize.models.Customer); // true
    return Customer
}