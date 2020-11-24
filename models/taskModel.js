// Importing Dependencies

const mongoose = require('mongoose');

// User Schema
const taskSchema = new mongoose.Schema(
  {
    keywordToFocus: {
      type: String
    },
    websites: {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

taskSchema.virtual('numberOfClicksVirtual').get(function() {
  return this.failedClicks.length + this.successfulClicks.length;
});

const Task = mongoose.model('Task', taskSchema);

// Exporting User Model
module.exports = Task;
