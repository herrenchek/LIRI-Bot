//LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies

require("dotenv").config();
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

console.log(keys);

//node liri.js concert-this <artist/band name here>

var command = process.argv[2];

switch (command) {
    case 'concert-this':
        console.log('Oranges are $0.59 a pound.');
        break;
    case 'spotify-this-song':
        console.log('Oranges are $0.59 a pound.');
        break;
    case 'movie-this':
        console.log('Oranges are $0.59 a pound.');
        break;
    case 'do-what-it-says':
        console.log('Oranges are $0.59 a pound.');
        break;
    default:
        console.log('Sorry, I don\'t recognize that command.');
}