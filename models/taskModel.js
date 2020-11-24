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
    clickForEachWebsite: {
      type: Number,
      default: 1
    },
    proxyCountry: {
      type: String,
      default: 'United Stated'
    },
    googleCountry: {
      type: String,
      default: 'Com'
    },
    dateLaunched: {
      type: Date,
      default: new Date()
    },
    status: {
      type: String,
      enum: ['queued', 'running', 'finished'],
      default: 'running'
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
