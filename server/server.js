var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var connectionString = 'postgres://wesleyhuang@localhost/fanflix';

var app = module.exports = express();

var massiveInstance = massive.connectSync({connectionString : connectionString});

app.set('db', massiveInstance);
var db = app.get('db');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + './../public'));

var nodeCtrl = require('./nodeCtrl.js');

// db.create_favorites(function(err, films){
//   console.log('favs table init');
// });

app.post('/mylist/favorites', nodeCtrl.add_to_fav);
app.get('/mylist/favorites', nodeCtrl.get_favorites);

app.listen(3000, function(){
  console.log('listening on port 3000...');
})
