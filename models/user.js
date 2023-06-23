
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {
        // Model attributes are defined here
        // Add UUID as primary key
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4(), // Generate UUID automatically
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                const rawValue = this.getDataValue('first_name');
                return rawValue ? rawValue.toUpperCase() : null;
            }
        },
        last_name: {
            type: DataTypes.STRING,
            get() {
                const rawValue = this.getDataValue('last_name');
                return rawValue ? rawValue.toUpperCase() : null;
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true,
        },
        // password: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     set(value) {
        //         // Storing passwords in plaintext in the database is terrible.
        //         // Hashing the value with an appropriate cryptographic hash function is better.
        //         this.setDataValue('password', hash(value));
        //     }
        // },
        full_name: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.first_name} ${this.last_name}`;
            },
            set(value) {
                throw new Error('Do not try to set the `fullName` value!');
            }
        }
    }, {
        // Other model options go here
        freezeTableName: false,
        paranoid: true, //for soft delete
        deletedAt: 'soft_delete' //column name soft_delete is added in table
    });


    // `sequelize.define` also returns the model
    console.log(User === sequelize.models.User); // true
    return User
}