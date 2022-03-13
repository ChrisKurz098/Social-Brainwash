const { User, Thought } = require('../models');


///api/users
const userController = {

    //add new user
    addUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },

    //get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'})
        .populate( {
            path: 'friends',
            select: '-__v'
        })
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },

    //get a user by _id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'})
            .populate( {
                path: 'friends',
                select: '-__v'
            })
            .then(dbUserData => {
                if (!dbUserData) res.status(404).json({ message: 'No user found at that ID' });
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    //update user by ID
    updateUserById({ body, params }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) res.status(404).json({ message: 'No user found at that ID' });
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    //delete user by ID
    deleteUserById({ params }, res) {
        User.findOneAndDelete({ _id: params.id }, { new: true })
            .then(dbUserData => {
                if (!dbUserData) res.status(404).json({ message: 'No user found at that ID' });
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    //---------------------POST/DELETE Friends from User----------------//
    ///api/users/:userId/friends/:friendId

    //add friend to user
    addFriendToUser({ params }, res) {
        User.findByIdAndUpdate({ _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true })
            .then(dbUserData => {
                if (!dbUserData) res.status(404).json({ message: 'No user found at that ID' });
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    //delete frined from user
    deleteFriendFromUser({ params }, res) {
        User.findByIdAndUpdate({ _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true })
            .then(dbUserData => {
                if (!dbUserData) res.status(404).json({ message: 'No user found at that ID' });
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    }

};

module.exports = userController;