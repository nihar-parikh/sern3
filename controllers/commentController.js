const e = require("express")
const { Op } = require("sequelize")
const db = require("../models")
const Comment = db.comment
const sequelize = db.sequelize

const addComment = async (req, res) => {
    const { title, commentableId, commentableType } = req.body;
    try {
        const newComment = await sequelize.transaction(async (t) => {
            return await Comment.create({ title, commentableId, commentableType }, {
                transaction: t
            });
        });
        res.status(200).json({ message: 'Comment added successfully', comment: newComment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add comment' });
    }

};


module.exports = {
    addComment

}