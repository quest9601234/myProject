const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    nameTrainer: {
        type: String,
        required: true
    },
    project: {
        type: String
    },
    review: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('TrainerModel', trainerSchema);