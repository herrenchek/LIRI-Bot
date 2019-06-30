//LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies

require("dotenv").config();
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

console.log(keys);

//node liri.js concert-this <artist/band name here>

