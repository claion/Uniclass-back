import mongoose, {Schema} from 'mongoose';


const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    courseNumber: {
        type: Number,
        required: true
    },
    academicNumber: {
        type: Number,
        required: true
    },
    //이외에도 학교에서 주는 데이터 따라서 더 추가할 예정 
}); 

const model = mongoose.model('Course', courseSchema);
export default model;