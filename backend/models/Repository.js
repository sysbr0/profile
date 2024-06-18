const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repositorySchema = new Schema({
  language: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true }
}, { timestamps: true });

const Repository = mongoose.model('Repository', repositorySchema);

module.exports = Repository;
