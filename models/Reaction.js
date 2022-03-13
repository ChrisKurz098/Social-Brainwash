const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

const reactionSchema = new Schema(
    {
        reactionId: { 
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: { 
            type: String,
            required: true,
            max: 280
        },
        username: { 
            type: String,
            required: true,
        },
        createdAt: { 
            type: Date,
            default: Date.now,
            getter: thisDate => formatDate(thisDate)
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

module.exports = reactionSchema;