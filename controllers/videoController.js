const e = require("express")
const { Op } = require("sequelize")
const db = require("../models")
const Video = db.video
const sequelize = db.sequelize

const addVideo = async (req, res) => {
    const { title, text } = req.body;
    try {
        const newVideo = await sequelize.transaction(async (t) => {
            return await Video.create({ title, text }, {
                transaction: t
            });
        });
        res.status(200).json({ message: 'Video added successfully', video: newVideo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add video' });
    }

};

const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.findAll({
            include: [{
                model: Comment,
                // where: {
                //     commentableType: "video"
                // }
            }]
        })
        res.status(200).json({ message: 'Image added successfully', data: videos });
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch videos' });
    }

};


module.exports = {
    addVideo,
    getAllVideos

}