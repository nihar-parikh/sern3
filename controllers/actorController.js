const e = require("express")
const { Op } = require("sequelize")
const db = require("../models")
const Actor = db.actor
const Movie = db.movie
const ActorMovie = db.actorMovie


const createActor = async (req, res) => {
    const { name } = req.body;
    const messages = {};
    let data = {};
    try {
        const [newActor, created] = await Actor.findOrCreate({
            where: { name },
            defaults: { name },
        });

        if (!created) {
            // Actor already exists
            messages['error'] = 'Actor already exists!';
        } else {
            // Actor was created successfully
            data = newActor;
        }
    } catch (error) {
        switch (error.name) {
            case 'SequelizeUniqueConstraintError':
                // Handle unique constraint violation error
                messages['email'] = 'Actor already exists!';
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

const assignMovieToActor = async (req, res) => {
    const { actor_id, movie_id } = req.body

    const existingActor = await Actor.findOne({
        where: {
            id: actor_id
        }
    })

    const existingMovie = await Movie.findOne({
        where: {
            id: movie_id
        }
    })

    if (existingActor && existingMovie) {
        // const [newData, created] = await ActorMovie.findOrCreate({
        //     where: { actor_id, movie_id },
        //     defaults: { actor_id, movie_id },
        // });
        const newData = await ActorMovie.create({
            actor_id, movie_id
        });

        return res.status(200).json({ newData })
    }

}

const getActorDetails = async (req, res) => {
    const { actor_id, } = req.body

    //Association scopes ->useful for resusable logic
    Actor.addScope('checkActor', {
        where: {
            id: actor_id
        }
    })

    Actor.addScope('includeMovie', {
        include: [
            {
                model: Movie,
            }
        ],
    })

    const existingActor = await Actor.scope(['checkActor', 'includeMovie']).findOne()

    return res.status(200).json({ existingActor })

}


module.exports = {
    createActor,
    assignMovieToActor,
    getActorDetails

}