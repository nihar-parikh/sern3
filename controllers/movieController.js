const e = require("express")
const { Op } = require("sequelize")
const db = require("../models")
const Movie = db.movie

const createMovie = async (req, res) => {
    const { name } = req.body;
    const messages = {};
    let data = {};
    try {
        const [newMovie, created] = await Movie.findOrCreate({
            where: { name },
            defaults: { name },
        });

        if (!created) {
            // Movie already exists
            messages['error'] = 'Movie already exists!';
        } else {
            // Movie was created successfully
            data = newMovie;
        }
    } catch (error) {
        switch (error.name) {
            case 'SequelizeUniqueConstraintError':
                // Handle unique constraint violation error
                messages['email'] = 'Movie already exists!';
                break;
            case 'SequelizeValidationError':
                // Handle validation errors
                error.errors.forEach((validationError) => {
                    messages[validationError.path] = validationError.message;
                });
                break;
            default:
                // Handle other unexpected errors
                console.error(error);
                messages['error'] = 'An unexpected error occurred.';
        }
    }

    res.status(200).json({ data, messages });
};



// const getAllUsers = async (req, res) => {
//     // const users = await User.findAll({
//     //     order: [['createdAt', 'DESC']], // Order by createdAt in descending order
//     //     attributes: {
//     //         exclude: ["createdAt", "updatedAt"]
//     //     }
//     // })

//     const { count, rows: users } = await User.findAndCountAll({
//         order: [['createdAt', 'DESC']], // Order by createdAt in descending order
//         attributes: {
//             exclude: ['createdAt', 'updatedAt']
//         },
//         include: [{
//             model: Contact,
//             as: 'contact_details',
//             required: true,
//             attributes: {
//                 exclude: "user_id"
//             }
//         },
//         {
//             model: Hobbies,
//             as: 'hobbies',
//             required: true,
//             attributes: {
//                 exclude: "user_id"
//             }
//         }
//         ]
//     });
//     res.status(200).json({ count, users })
// }

// const getUser = async (req, res) => {
//     const { userId } = req.params
//     const user = await User.findOne({
//         where: {
//             id: userId
//         },
//         include: [{
//             model: Contact,
//             as: 'contact_details',
//             attributes: {
//                 exclude: "user_id"
//             }
//         },
//         {
//             model: Hobbies,
//             as: 'hobbies',
//             attributes: {
//                 exclude: "user_id"
//             }
//         }]
//     })
//     res.status(200).json(user)
// }

// const updateUser = async (req, res) => {
//     const { userId } = req.params
//     const updatedUserInfo = req.body
//     const isUserUpdated = await User.update(updatedUserInfo, {
//         where: {
//             id: userId
//         }
//     })
//     if (isUserUpdated) {
//         const user = await User.findOne({
//             where: {
//                 id: userId
//             }
//         })

//         res.status(200).json(user)
//     }

// }

// const addUserHobbies = async (req, res) => {
//     const { userId, hobby } = req.body

//     const newHobby = await Hobbies.create({ user_id: userId, hobby }, {
//         where: {
//             id: userId
//         }
//     })
//     if (newHobby) {
//         const user = await User.findOne({
//             where: {
//                 id: userId
//             },
//             include: [{
//                 model: Hobbies,
//                 as: "hobbies"
//             }]
//         })

//         res.status(200).json(user)
//     }

// }

// const getUserHobbies = async (req, res) => {
//     const { userId } = req.body;
//     try {
//         const hobbies = await Hobbies.findAll({
//             where: {
//                 user_id: userId,
//             },
//             include: [
//                 {
//                     model: User,
//                     as: "user_details"
//                 },
//             ],
//         });

//         res.status(200).json(hobbies);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error retrieving user hobbies.' });
//     }
// };


module.exports = {
    createMovie,

}