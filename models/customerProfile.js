
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CustomerProfile = sequelize.define(
        'customer_profiles',
        {},
        {
            tableName: 'customer_profiles',
            timestamps: false,
            underscored: true,
        }
    );

    return CustomerProfile;
};
