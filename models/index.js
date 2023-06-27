const { Sequelize, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("world", "root", "RadhaKrishna@512", {
  host: "localhost",
  dialect: "mysql",
  //if number of request is more than 5 then
  //first 5 will exceute parallely and rest will be in a waiting queue
  //time taken by first 5 will be 10000 msecs
  //after first 5 requests is exceuted then rest gets exceuted one by one.
  pool: {
    //performance increases->read docs.
    max: 5, //no. of requests
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, DataTypes);
db.contact = require("./contact")(sequelize, DataTypes);
db.hobbies = require("./hobbies")(sequelize, DataTypes);
db.actor = require("./actor")(sequelize, DataTypes);
db.movie = require("./movie")(sequelize, DataTypes);
db.actorMovie = require("./actorMovie")(sequelize, DataTypes);
db.customer = require("./customer")(sequelize, DataTypes);
db.profile = require("./profile")(sequelize, DataTypes);
db.customerProfile = require("./customerProfile")(sequelize, DataTypes);
db.game = require("./game")(sequelize, DataTypes);
db.team = require("./team")(sequelize, DataTypes);
db.player = require("./player")(sequelize, DataTypes);
db.gameTeam = require("./gameTeam")(sequelize, DataTypes);
db.playerGameTeam = require("./playerGameTeam")(sequelize, DataTypes);
db.image = require("./image")(sequelize, DataTypes);
db.video = require("./video")(sequelize, DataTypes);
db.comment = require("./comment")(sequelize, DataTypes);
db.tag = require("./tag")(sequelize, DataTypes);
db.tagTaggable = require("./tagTaggable")(sequelize, DataTypes);

db.user.hasOne(db.contact, { foreignKey: "user_id", as: "contact_details" });
db.contact.belongsTo(db.user, { foreignKey: "user_id" });

db.user.hasMany(db.hobbies, { foreignKey: "user_id", as: "hobbies" });
db.hobbies.belongsTo(db.user, { foreignKey: "user_id", as: "user_details" });

db.customer.belongsToMany(db.profile, { through: db.customerProfile });
db.profile.belongsToMany(db.customer, { through: db.customerProfile });

db.movie.belongsToMany(db.actor, { through: db.actorMovie });
db.actor.belongsToMany(db.movie, { through: db.actorMovie });

db.team.belongsToMany(db.game, { through: db.gameTeam });
db.game.belongsToMany(db.team, { through: db.gameTeam });
db.gameTeam.belongsTo(db.game);
db.gameTeam.belongsTo(db.team);
db.game.hasMany(db.gameTeam);
db.team.hasMany(db.gameTeam);

db.player.belongsToMany(db.gameTeam, { through: db.playerGameTeam });
db.gameTeam.belongsToMany(db.player, { through: db.playerGameTeam });
db.playerGameTeam.belongsTo(db.player);
db.playerGameTeam.belongsTo(db.gameTeam);
db.player.hasMany(db.playerGameTeam);
db.gameTeam.hasMany(db.playerGameTeam);

//polymorphic associations->one to many
db.image.hasMany(db.comment, {
  foreignKey: "commentableId", //necessary otherwise imageId column will be created.
  constraints: false, //necessary if two or more foreign keys refers are in same table.
  scope: {
    //providing scope here eliminates where clause
    commentableType: "image",
  },
});

db.comment.belongsTo(db.image, {
  foreignKey: "commentableId",
  constraints: false,
});

db.video.hasMany(db.comment, {
  foreignKey: "commentableId", //necessary otherwise videoId column will be created.
  constraints: false, //necessary if two or more foreign keys refers are in same table.
  scope: {
    commentableType: "video",
  },
});

db.comment.belongsTo(db.video, {
  foreignKey: "commentableId",
  constraints: false,
});

db.image.belongsToMany(db.tag, {
  through: {
    model: db.tagTaggable,
    unique: false,
    scope: {
      taggableType: "image",
    },
  },
  foreignKey: "taggableId",
  constraints: false,
});
db.tag.belongsToMany(db.image, {
  through: {
    model: db.tagTaggable,
    unique: false,
  },
  foreignKey: "tagId",
  constraints: false,
});

db.video.belongsToMany(db.tag, {
  through: {
    model: db.tagTaggable,
    unique: false,
    scope: {
      taggableType: "video",
    },
  },
  foreignKey: "taggableId",
  constraints: false,
});
db.tag.belongsToMany(db.video, {
  through: {
    model: db.tagTaggable,
    unique: false,
  },
  foreignKey: "tagId",
  constraints: false,
});

db.sequelize.sync({ force: false });

module.exports = db;
