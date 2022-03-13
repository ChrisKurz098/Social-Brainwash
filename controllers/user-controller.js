const { User, Thought } = require('../models');

const userController = {

    //add new user
    addUser ({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(res.status(500).json(err));
    },

    //get all users
    getAllUsers(req,res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        },
        {
            path: 'friends',
            select: '-__v'
        })
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(res.status(500).json(err));
    },

    //get a user by _id
    getUserById({params}, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        },
        {
            path: 'friends',
            select: '-__v'
        })
        .then(dbUserData => {
            if (!dbUserData) res.status(404).json({message: 'No user found at that ID'});
            res.json(dbUserData);
        })
        .catch(res.status(500).json(err));
    },

    //update user by ID
    updateUserById({body,params}, res) {
        User.updateOne({_id: params.id}, body, {new: true})
        .then(dbUserData => {
            if (!dbUserData) res.status(404).json({message: 'No user found at that ID'});
            res.json(dbUserData);
        })
        .catch(res.status(500).json(err));
    },

    //delete user by ID
    deleteUserById({params}, res) {
        User.deleteOne({_id: params.id}, {new: true})
        .then(dbUserData => {
            if (!dbUserData) res.status(404).json({message: 'No user found at that ID'});
            res.json(dbUserData);
        })
        .catch(res.status(500).json(err));
    }

};

module.exports = userController;