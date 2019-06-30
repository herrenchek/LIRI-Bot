//LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies

require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

console.log(keys);

//node liri.js concert-this <artist/band name here>
var command = process.argv[2];
var name = process.argv.slice(3).join(" ");

switch (command) {
    case 'concert-this':
        concertThis(name);
        break;
    case 'spotify-this-song':
        spotifyThisSong(name);
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

function concertThis(name) {
    var queryURL = 'https://rest.bandsintown.com/artists/' + name + '/events?app_id=codingbootcamp';
    axios.get(queryURL)
        .then(function (response) {
            var data = response.data;

            if (!data.length) console.log('Sorry, there are no upcoming shows!');
            for (var i = 0; i < data.length; i++) {
                var event = data[i];
                //Name of the venue
                console.log(event.venue.name);
                //Venue location
                //Below is a better way of writing "daksdsajkdhj" + stuff + " fsdfsdf " + thing
                console.log(`${event.venue.city}, ${event.venue.country}`);
                // Date of the Event (use moment to format this as "MM/DD/YYYY")
                console.log(moment(event.datetime).format('MMMM Do YYYY, h:mm:ss a'));
                console.log('\n')
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function spotifyThisSong(name) {
    spotify
        .search({ type: 'track', query: name, limit: 10 })
        .then(function (response) {
            var items = response.tracks.items;

            for (var i = 0; i < items.length; i++) {
                var album = items[i].album;
                //Artist(s)
                console.log(album.artists[0].name);
                //The song's name
                console.log(items[i].name)
                //A preview link of the song from Spotify
                console.log(items[i].external_urls.spotify);
                //The album that the song is from
                console.log(album.name);
                console.log('\n')
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}