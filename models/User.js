const { Schema, model } = require('mongoose')
const thoughtSchema = require('./Thought')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true, 
            trimmed: true,
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please Enter Valid Email Address."
            ]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'  
            }
        ],
        friends: [
            {
             type: Schema.Types.ObjectId,
             ref: 'User'   
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

userSchema
.virtual('friendCount')
.get (function () {
    return this.freinds.length
})

const User = model('User', userSchema)
model.exports = User;