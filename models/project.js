const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const project = new mongoose.Schema({
    projectCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectTitle: {
        type: String,
        required: true
    },
    projectDiscription: { 
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    projectType: {
        type: String,
        required: true
    },

    members: [
        {
            memberRef: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            designation: {
                type: String,
                required: true
            },
        }
    ],
    projectPhases : [
        {
            PhaseTitle: {
                type: String,
                required: true
            },
            PhaseNum: {
                type: String,
                required: true
            },
            PhaseStatus: {
                type: String,
                default: "Pending",
                required: true
            },
        }
    ],
    phasePercentage: {
        type: String,
        required: true
    },
    progressBar: {
        type: String,
        default: "0",
        required: true
    },
          
}, {timestamps: true})

const Project = mongoose.model('PROJECT', project);

module.exports = Project;