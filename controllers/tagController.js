const e = require("express");
const { Op } = require("sequelize");
const db = require("../models");
const sequelize = db.sequelize;
const Tag = db.tag;
const TagTaggable = db.tagTaggable;
const Image = db.image;
const Video = db.video;
const Comment = db.comment;

const addTag = async (req, res) => {
  const { name, taggableId, taggableType } = req.body;

  try {
    const tag = await sequelize.transaction(async (t) => {
      const createdTag = await Tag.create({ name }, { transaction: t });
      const tagTaggable = await TagTaggable.create(
        { tagId: createdTag.id, taggableId, taggableType },
        { transaction: t }
      );
      return { createdTag, tagTaggable };
    });

    res
      .status(200)
      .json({ message: "Tag added successfully", data: tag.createdTag });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add tag" });
  }
};

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Image,
          include: [
            {
              model: Comment,
            },
          ],
        },
        {
          model: Video,
          include: [
            {
              model: Comment,
            },
          ],
        },
      ],
    });
    res
      .status(200)
      .json({ message: "Comments fetched successfully", data: tags });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch tags" });
  }
};

module.exports = {
  addTag,
  getAllTags,
};
