import mongoose, {Schema} from 'mongoose';

const TimeTableSchema = new Schema({
	name: {
        type: String,
        required: true,
    },
    main: {
        type: Boolean,
        required: true,
    },
    courses: {
        type: Array,
        required: false,
    }
})

const model = mongoose.model("TimeTable", TimeTableSchema);
export default model;
