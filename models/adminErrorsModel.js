const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then()
  .catch(err => console.log('mongoDB ERROR Is:', err));

const adminErrorsSchema = new mongoose.Schema({
  Success: {
    type: Boolean
  },
  Message: {
    type: String
  },
  pageTitle: {
    type: String
  },
  PageLink: {
    type: String
  },
  screenPath: {
    type: String
  },
  dateTime: {
    type: String
  },
  proxy: {
    type: String
  },
  platform: {
    type: String
  },
  keyword: {
    type: String
  },
  website: {
    type: String
  }
});

const adminErrorsMod = mongoose.model('adminErrors', adminErrorsSchema);

module.exports = adminErrorsMod;
