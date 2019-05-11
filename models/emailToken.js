import mongoose from 'mongoose';

const {Schema} = mongoose;

const emailTokenSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        index: {expires: 1000*30}
    }
})

export default mongoose.model('EmailToken', emailTokenSchema);