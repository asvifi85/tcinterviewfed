const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subGenreSchema = new Schema({
	name: String,
	genreId: String,
	
})
module.exports = mongoose.model('Subgenre',subGenreSchema);