
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CustomerProfile = sequelize.define(
        'customer_profiles',
        {
            self_granted: DataTypes.BOOLEAN
        },
        {
            tableName: 'customer_profiles',
            timestamps: false,
            underscored: true,
        }
    );

    return CustomerProfile;
};
