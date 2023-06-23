
// const { v4: uuidv4 } = require('uuid');

// module.exports = (sequelize, DataTypes) => {

//     const ActorMovie = sequelize.define('actor_movie', {
//         // Model attributes are defined here
//         // Add UUID as primary key
//         movie_id: {
//             field: 'movie_id',
//             type: DataTypes.UUID,
//             references: {
//                 model: "movies",
//                 key: 'id'
//             }
//         },
//         actor_id: {
//             field: 'actor_id',
//             type: DataTypes.UUID,
//             references: {
//                 model: "actors",
//                 key: 'id'
//             }
//         }
//     }, {
//         // Other model options go here
//         freezeTableName: false,
//         timestamps: false, // Disable automatic timestamp fields (createdAt, updatedAt)
//         createdAt: false,
//         updatedAt: false,
//         underscored: true, // Use underscored naming convention for columns (e.g., permanent_address, current_address)
//         primaryKey: false, // Disable the default 'id' primary key column
//     });

//     ActorMovie.removeAttribute('id'); // Remove the 'id' attribute


//     // `sequelize.define` also returns the model
//     console.log(ActorMovie === sequelize.models.ActorMovie); // true
//     return ActorMovie
// }


const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ActorMovie = sequelize.define(
        'ActorMovie',
        {
            actor_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'actors',
                    key: 'id',
                },
            },
            movie_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'movies',
                    key: 'id',
                },
            },
        },
        {
            tableName: 'actor_movies',
            timestamps: false,
            underscored: true,
        }
    );

    return ActorMovie;
};
