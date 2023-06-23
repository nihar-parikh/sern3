const e = require("express")
const { Op } = require("sequelize")
const db = require("../models")
const User = db.user
const Contact = db.contact
const Hobbies = db.hobbies

// const addUser = async (req, res) => {
//     const { first_name, last_name, email } = req.body
//     const messages = {}
//     let data = {}
//     try {
//         const [newUser, created] = await User.findOrCreate({
//             where: { email },
//             defaults: { first_name, last_name }
//         });
//         data = newUser
//     } catch (error) {
//         let message;
//         error.errors.forEach(error => {
//             switch (error.validatorKey) {
//                 case 'unique':
//                     message = 'User already exist!!!'
//                     break;
//             }
//             messages[error.path] = message
//         })

//     }
//     return res.status(200).json({ data: data, messages })
// }

const addUser = async (req, res) => {
    const { first_name, last_name, email, permanent_address, current_address } = req.body;
    const messages = {};
    let data = {};
    try {
        const [newUser, created] = await User.findOrCreate({
            where: { email },
            defaults: { first_name, last_name, email },
        });

        if (!created) {
            // User already exists
            messages['error'] = 'User already exists!';
        } else {
            // User was created successfully
            data = newUser;
            const userContact = await Contact.create({
                user_id: data.id,
                permanent_address,
                current_address
            })
        }
    } catch (error) {
        switch (error.name) {
            case 'SequelizeUniqueConstraintError':
                // Handle unique constraint violation error
                messages['email'] = 'User already exists!';
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



const getAllUsers = async (req, res) => {
    // const users = await User.findAll({
    //     order: [['createdAt', 'DESC']], // Order by createdAt in descending order
    //     attributes: {
    //         exclude: ["createdAt", "updatedAt"]
    //     }
    // })


    //********DEFAULT INNER JOIN******************//
    // const { count, rows: users } = await User.findAndCountAll({
    //     order: [['createdAt', 'DESC']], // Order by createdAt in descending order
    //     attributes: {
    //         exclude: ['createdAt', 'updatedAt']
    //     },
    //     include: [{
    //         model: Contact,
    //         as: 'contact_details',
    //         required: true,
    //         attributes: {
    //             exclude: "user_id"
    //         }
    //     },
    //     {
    //         model: Hobbies,
    //         as: 'hobbies',
    //         required: true,
    //         attributes: {
    //             exclude: "user_id"
    //         }
    //     }
    //     ]
    // });


    //********RIGHT OUTER JOIN*************//
    // const { count, rows: users } = await User.findAndCountAll({
    //     order: [['createdAt', 'DESC']], // Order by createdAt in descending order
    //     attributes: {
    //         exclude: ['createdAt', 'updatedAt']
    //     },
    //     include: [{
    //         model: Contact,
    //         as: 'contact_details',
    //         required: false,
    //         right: true,
    //         attributes: {
    //             exclude: "user_id"
    //         }
    //     },
    //     {
    //         model: Hobbies,
    //         as: 'hobbies',
    //         required: false,
    //         right: true,
    //         attributes: {
    //             exclude: "user_id"
    //         }
    //     }
    //     ]
    // });


    //*************ALL INNER JOINS***************//
    const { count, rows: users } = await User.findAndCountAll({
        order: [['createdAt', 'DESC']], // Order by createdAt in descending order
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: { all: true, nested: true }
    });

    res.status(200).json({ count, users })
}

const getUser = async (req, res) => {
    const { userId } = req.params
    const user = await User.findOne({
        where: {
            id: userId
        },
        include: [{
            model: Contact,
            as: 'contact_details',
            attributes: {
                exclude: "user_id"
            }
        },
        {
            model: Hobbies,
            as: 'hobbies',
            attributes: {
                exclude: "user_id"
            }
        }]
    })
    res.status(200).json(user)
}

const updateUser = async (req, res) => {
    const { userId } = req.params
    const updatedUserInfo = req.body
    const isUserUpdated = await User.update(updatedUserInfo, {
        where: {
            id: userId
        }
    })
    if (isUserUpdated) {
        const user = await User.findOne({
            where: {
                id: userId
            }
        })

        res.status(200).json(user)
    }

}

const addUserHobbies = async (req, res) => {
    const { userId, hobby } = req.body

    const newHobby = await Hobbies.create({ user_id: userId, hobby }, {
        where: {
            id: userId
        }
    })
    if (newHobby) {
        const user = await User.findOne({
            where: {
                id: userId
            },
            include: [{
                model: Hobbies,
                as: "hobbies"
            }]
        })

        res.status(200).json(user)
    }

}

const getUserHobbies = async (req, res) => {
    const { userId } = req.body;
    try {
        const hobbies = await Hobbies.findAll({
            where: {
                user_id: userId,
            },
            include: [
                {
                    model: User,
                    as: "user_details"
                },
            ],
        });
        res.status(200).json(hobbies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user hobbies.' });
    }
};

// const getUserHobbies = async (req, res) => {
//     const { userId } = req.body;
//     try {
//         const hobbies = await Hobbies.findAll({
//             where: {
//                 user_id: userId,
//             },
//             include: [
//                 {
//                     association: 'user_details', // Use the association name
//                     lazy: true, // Enable lazy loading
//                 },
//             ],
//         });

//         // Load the user_details for each hobby
//         await Promise.all(hobbies.map(hobby => hobby.user_details.load()));

//         res.status(200).json(hobbies);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error retrieving user hobbies.' });
//     }
// };


const deleteUser = async (req, res) => {
    const { user_id } = req.body
    const isDeleted = await User.destroy({
        where: {
            id: user_id
        }
    })
    if (isDeleted === 1) {
        return res.status(200).json({
            message: "User is deleted"
        })
    }
}

const restoreUser = async (req, res) => {
    const { user_id } = req.body
    const isUserRestored = await User.restore({
        where: {
            id: user_id
        }
    })
    if (isUserRestored === 1) {
        return res.status(200).json({
            message: "User is restored"
        })
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    addUserHobbies,
    getUserHobbies,
    deleteUser,
    restoreUser
}