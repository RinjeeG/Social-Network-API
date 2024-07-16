const { Schema, model, Types} = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({
    reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => moment(timestamp).format('YYYY-MM-DD')
    }
}, {
    tojson: {
        getters: true
    },
    id: false
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => moment(timestamp).format('YYYY-MM-DD')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    tojson: {
        virtuals: true,
        getters: true
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function(){
    return TouchList.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;