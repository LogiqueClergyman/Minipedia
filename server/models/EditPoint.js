import Mongoose from 'mongoose';
const EditPoint = new Mongoose.Schema({
    post_id: {
        type: String,
        required: true
    },
    previousVersion: {
        type: String,
        required: true
    },
    newVersion: {
        type: String,
        required: true
    },
    modifiedBy: {
        type: String,
        required: true
    },
    timestamp: true
});
export default Mongoose.model('EditPoint', EditPoint);