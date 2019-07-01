//LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies

require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require("fs");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

console.log(keys);

//node liri.js concert-this <artist/band name here>
var command = process.argv[2];
var name = process.argv.slice(3).join(" ");

function commands(command, name) {
    switch (command) {
        case 'concert-this':
            concertThis(name);
            break;
        case 'spotify-this-song':
            spotifyThisSong(name);
            break;
        case 'movie-this':
            movieThis(name);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log('Sorry, I don\'t recognize that command.');
    }
};

function concertThis(name) {
    var queryURL = `https://rest.bandsintown.com/artists/${name}/events?app_id=codingbootcamp`;
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
    if (!name) {
        name = "The Sign";
    }
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

function movieThis(name) {
    if (!name) {
        name = "Mr. Nobody";
    }
    axios.get(`http://www.omdbapi.com/?t=${name}&apikey=trilogy`).then(
        function (response) {
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.imdbRating);
            console.log(response.data.Ratings[1].Value);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
        });
}

function doWhatItSays() {
    fs.readFile("../random.txt", "utf8", function (error, data) {
        //If the code experiences any errors it will log the error to the console
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        console.log(dataArr)
        commands(dataArr[0], dataArr[1]);
    });
}

commands(command, name);