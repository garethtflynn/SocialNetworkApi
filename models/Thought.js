const { Schema, model, Types} = require('mongoose')
const reactionSchema = require('./Reaction')
const moment = require('moment')

const thoughtSchema = new Schema(
    {
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        thoughtText: {
            type: String,
            required: true, 
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (formatTime) => 
            moment(formatTime).format("MMM Do YY"),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
          },
          id: false,
    }
)

thoughtSchema
.virtual('reactionCount')
.get (function () {
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema)
module.exports = Thought