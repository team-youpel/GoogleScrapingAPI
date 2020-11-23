// Importing Dependencies

const mongoose = require('mongoose');

// User Schema
const taskSchema = new mongoose.Schema({
  keywordToFocus: {
    type: String
  },
  Websites: {
    type: Array
  },
  dateLaunched: {
    type: Date,
    default: new Date()
  },
  finished: {
    type: Boolean,
    default: false
  },
  dateFinished: {
    type: Date,
    default: null
  },
  numberOfClicks: {
    type: Number,
    default: 0
  },
  successfulClicks: [
    {
      screenShot: {
        type: String,
        default: null
      },
      pageTitle: {
        type: String,
        default: null
      },
      clickedAt: {
        type: Date,
        default: new Date()
      },
      userAgent: {
        type: String,
        default: null
      },
      screenResolution: {
        type: String,
        default: null
      }
    }
  ],
  failedClicks: [
    {
      screenShot: {
        type: String,
        default: null
      },
      pageTitle: {
        type: String,
        default: null
      },
      clickedAt: {
        type: Date,
        default: new Date()
      },
      userAgent: {
        type: String,
        default: null
      },
      screenResolution: {
        type: String,
        default: null
      },
      errorMessage: {
        type: String,
        default: null
      }
    }
  ]
});

const Task = mongoose.model('Task', taskSchema);

// Exporting User Model
module.exports = Task;
