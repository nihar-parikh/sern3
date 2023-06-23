const e = require("express")
const { Op } = require("sequelize")
const db = require("../models")
const Player = db.player
const Team = db.team
const Game = db.game
const GameTeam = db.gameTeam
const PlayerGameTeam = db.playerGameTeam

const m2m2mAssociationsPlayer = async (req, res) => {
    try {
        // await Player.bulkCreate([
        //     { user_name: 's0me0ne' },
        //     { user_name: 'empty' },
        //     { user_name: 'greenhead' },
        //     { user_name: 'not_spock' },
        //     { user_name: 'bowl_of_petunias' }
        // ]);

        // await Game.bulkCreate([
        //     { name: 'The Big Clash' },
        //     { name: 'Winter Showdown' },
        //     { name: 'Summer Beatdown' }
        // ]);
        // await Team.bulkCreate([
        //     { name: 'The Martians' },
        //     { name: 'The Earthlings' },
        //     { name: 'The Plutonians' }
        // ]);

        // // Let's start defining which teams were in which games. This can be done
        // // in several ways, such as calling `.setTeams` on each game. However, for
        // // brevity, we will use direct `create` calls instead, referring directly
        // // to the IDs we want. We know that IDs are given in order starting from 1.
        // const gameTeams = await GameTeam.bulkCreate([
        //     { gameId: 1, teamId: 1 },   // this GameTeam will get id 1
        //     { gameId: 1, teamId: 2 },   // this GameTeam will get id 2
        //     { gameId: 2, teamId: 1 },   // this GameTeam will get id 3
        //     { gameId: 2, teamId: 3 },   // this GameTeam will get id 4
        //     { gameId: 3, teamId: 2 },   // this GameTeam will get id 5
        //     { gameId: 3, teamId: 3 }    // this GameTeam will get id 6
        // ]);

        // // Now let's specify players.
        // // For brevity, let's do it only for the second game (Winter Showdown).
        // // Let's say that that s0me0ne and greenhead played for The Martians, while
        // // not_spock and bowl_of_petunias played for The Plutonians:
        // await PlayerGameTeam.bulkCreate([
        //     // In 'Winter Showdown' (i.e. gameTeamIds 3 and 4):
        //     { playerId: 1, gameTeamId: 3 },   // s0me0ne played for The Martians
        //     { playerId: 3, gameTeamId: 3 },   // greenhead played for The Martians
        //     { playerId: 4, gameTeamId: 4 },   // not_spock played for The Plutonians
        //     { playerId: 5, gameTeamId: 4 }    // bowl_of_petunias played for The Plutonians
        // ]);

        // Now we can make queries!
        const game = await Game.findOne({
            where: {
                name: "Winter Showdown"
            },
            include: {
                model: GameTeam,
                include: [
                    {
                        model: Player,
                        // through: { attributes: [] } // Hide unwanted `PlayerGameTeam` nested object from results
                    },
                    {
                        model: Team,
                    },
                ]
            }
        });

        console.log(`Found game: "${game.name}"`);
        for (let i = 0; i < game.game_teams.length; i++) {
            const team = game.game_teams[i].team;
            const players = game.game_teams[i].players;
            console.log(`- Team "${team.name}" played game "${game.name}" with the following players:`);
            console.log(players.map(p => `--- ${p.user_name}`).join('\n'));
        }
        return res.status(200).json({ game });
    } catch (error) {
        return res.status(500).json({ error });

    }
};




module.exports = {
    m2m2mAssociationsPlayer,

}