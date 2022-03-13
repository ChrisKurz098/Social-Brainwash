const { Thought, User } = require('../models');

///api/thoughts

const thoughtController = {
    //add new thought
    addThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                //add thought to dbThoughtData.user
                User.findOneAndUpdate({ username: dbThoughtData.username },
                    { $push: { thoughts: dbThoughtData._id } },  { new: true, runValidators: true })
                    .then(dbUserData => {
                        if (!dbUserData) {
                            res.status(404).json({ message: "No user with that username" })
                            return;
                        };
                        res.json(dbThoughtData);
                    })
            })
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
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found at that ID' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    },

    //update Thought by ID
    updateThoughtById({ body, params }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body,  { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found at that ID' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    },

    //delete Thought by ID
    deleteThoughtById({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id },  { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found at that ID' });
                    return;
                };
                //add thought to dbThoughtData.user
                User.findOneAndUpdate({ username: dbThoughtData.username },
                    { $pull: { thoughts: dbThoughtData._id } }, { new: true })
                    .then(dbUserData => {
                        if (!dbUserData) {
                            res.status(404).json({ message: "No user with that username" });
                            return;
                        };
                        res.json(dbThoughtData);
                    })
            })
            .catch(err => res.status(500).json(err));
    },


    //---------------------POST/DELETE Thoughts from User----------------//
    ///api/thoughts/:thoughtId/reactions

    //add reaction to user
    addReactionToThought({ body, params }, res) {
        Thought.findByIdAndUpdate({ _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found at that ID' });
                    return;
                };

                res.json(dbThoughtData);

            })
            .catch(err => res.status(500).json(err));
    },

    //delete reaction from user
    deleteReactionFromThought({ params }, res) {
        Thought.findByIdAndUpdate({ _id: params.thoughtId },
            { $pull: { reactions: params.reactionId } },
            { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Unable to find data to delete' });
                    return;
                }

                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    }

}

module.exports = thoughtController;