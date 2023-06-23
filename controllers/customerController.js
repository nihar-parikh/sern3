const e = require("express")
const { Op } = require("sequelize")
const db = require("../models")
const Customer = db.customer
const Profile = db.profile
const CustomerProfile = db.cutomerProfile

const mnAssociationsCustomer = async (req, res) => {
    try {
        // const amidala = await Customer.create({ user_name: 'p4dm3', points: 1000 });
        // const queen = await Profile.create({ name: 'Queen' });

        // await amidala.addProfile(queen, { through: { self_granted: false } });
        // const result = await Customer.findOne({
        //     where: { user_name: 'p4dm3' },
        //     include: Profile
        // });
        // console.log(result);

        //***********ONE SHOT DATA ENTRY******************//
        let newCustomer = await Customer.create({
            user_name: 'radha1',
            points: 2000,
            profiles: [{
                name: 'mohan1',
                CustomerProfile: {
                    self_granted: true
                }
            }]
        }, {
            include: Profile
        });

        newCustomer = await Customer.findOne({
            where: { user_name: 'radha1' },
            include: Profile
        });

        return res.status(200).json({ newCustomer });
    } catch (error) {
        return res.status(500).json({ error });

    }
};




module.exports = {
    mnAssociationsCustomer,

}