// Importing Dependencies

const mongoose = require('mongoose');

// User Schema
const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String
    },
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
    logs: [
      {
        type: { type: String },
        message: { type: String }
      }
    ],
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

// taskSchema.virtual('datefinishedSM').get(function() {
//   return this.dateFinished.toString().substr(0, 19);
// });

taskSchema.virtual('SuccessfulClicksCount').get(function() {
  return this.successfulClicks.length;
});

taskSchema.virtual('FailedClicksCount').get(function() {
  return this.failedClicks.length;
});

// tourShema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'guides',
//     select: '-__v'
//   });
//   next();
// });

// tourShema.pre('aggregate', function(next) {
//   this.pipeline().unshift({
//     $match: { secretTour: { $ne: true } }
//   });
//   next();
// });

const Task = mongoose.model('Task', taskSchema);

// Exporting User Model
module.exports = Task;
