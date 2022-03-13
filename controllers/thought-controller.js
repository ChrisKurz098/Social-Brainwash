const { Thought } = require('../models');

///api/thoughts

const thoughtController = {
    //add new user
    addThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(500).json(err));
    },

    //get all Thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(500).json(err));
    },

    //get a Thought by _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) res.status(404).json({ message: 'No Thought found at that ID' });
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    },

    //update Thought by ID
    updateThoughtById({ body, params }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) res.status(404).json({ message: 'No Thought found at that ID' });
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    },

    //delete Thought by ID
    deleteThoughtById({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id }, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) res.status(404).json({ message: 'No Thought found at that ID' });
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    },


        //---------------------POST/DELETE Thoughts from User----------------//
    ///api/thoughts/:thoughtId/reactions

    //add thought to user
    addReactionToThought({ body, params }, res) {
        User.findByIdAndUpdate({ _id: params.thoughtId },
            { $push: { thoughts: body } },
            { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) res.status(404).json({ message: 'No Thought found at that ID' });
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    },

    //delete thought from user
    deleteReactionFromThought({ params }, res) {
        User.findByIdAndUpdate({ _id: params.thoughtId },
            { $pull: { friends: params.reactionId } },
            { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) res.status(404).json({ message: 'Unable to find data to delete' });
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    }

}

module.exports = thoughtController;