import mongoose, {Schema} from 'mongoose';


const tableSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    main: {
        type: Boolean,
        required: true
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
});

const model = mongoose.model('Table', tableSchema);
export default model;


