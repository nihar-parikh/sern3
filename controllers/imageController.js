const e = require("express")
const { Op } = require("sequelize")
const db = require("../models")
const sequelize = db.sequelize
const Image = db.image
const Comment = db.comment
const Tag = db.tag


const addImage = async (req, res) => {
    const { title, url } = req.body;
    try {
        const newImage = await sequelize.transaction(async (t) => {
            return await Image.create({ title, url }, {
                transaction: t
            });
        });
        res.status(200).json({ message: 'Image added successfully', image: newImage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add image' });
    }

};

const getAllImages = async (req, res) => {
    try {
        const images = await Image.findAll({
            include: [{
                model: Tag,
            },
            {
                model: Comment,
            }
            ]
        })
        res.status(200).json({ message: 'Image added successfully', data: images });
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch images' });
    }

};



module.exports = {
    addImage,
    getAllImages

}