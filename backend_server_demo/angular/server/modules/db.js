var mongoose = require('mongoose');
mongoose.connect('mongod://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection to db error:'));
db.once('open', function() {
	// we're connected
	var kittySchema = mongoose.Schema({
		name: String
	});

	var Kitten = mongoose.model('Kitten', kittySchema);
	
});