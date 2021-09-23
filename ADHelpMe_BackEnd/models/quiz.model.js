//THIS will be used once we connect MongoDB   console.log("UnauthorizedError req:",req.url);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//https://mongoosejs.com/docs/populate.html#populate_an_existing_mongoose_document

const schema = new Schema({
    quizName: { type: String, required: true},
    description: { type: String, required: true},
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    author: {type: String, required: true},
    questions: {type: Array, required: true}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Quiz', schema);


