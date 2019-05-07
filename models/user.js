import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isCertificated: {
        type: Boolean,
        required: true,
        default: false
    }
    // 정지 유저: { 타입: 다른 모델 }
    // 프로필: {타입: 다른 모델 }
}, {
    timestamps: true,
    // paranoid: true // 소프트 델리트를 해야할까?
})

export default mongoose.model('User', userSchema);