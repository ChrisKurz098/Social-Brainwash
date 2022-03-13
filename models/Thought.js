const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: thisDate => formatDate(thisDate)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ reactionSchema ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }

);

//get how many reactions in reactions list
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;