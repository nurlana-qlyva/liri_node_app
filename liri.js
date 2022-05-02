const Spotify = require('node-spotify-api');
const request = require('request');

// operations

const command = process.argv[2];
const search = process.argv[3];

function liri(command, search) {
    switch (command) {
        case 'find album':
            getAlbum(search);
            break;
        case 'find song':
            getSong(search);
            break;
        case 'watch':
            getOmdb(search);
            break;
        case '':
            searchValue(search);
            break;
    }
}

// spotify api

var spotify = new Spotify  ({
    id: 'SECRET_ID',
    secret: 'SECRET_KEY'
});

function getAlbum(artist) {

    if (!artist) {
        spotify.search({ type: 'album', query: `bruno mars`, limit: 5 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            for (let results of Object.values(data.albums.items)){
                console.log(results.name);
                console.log(results.release_date);
                console.log(results.total_tracks);
                console.log('---------------')
            }
        });
    }else{
        spotify.search({ type: 'album', query: `${artist}`, limit: 5 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            for (let results of Object.values(data.albums.items)){
                console.log(results.name);
                console.log(results.release_date);
                console.log(results.total_tracks);
                console.log('---------------')
            }
        });
    }
}

function getSong(song) {

    if (!song) {
        spotify.search({ type: 'track', query: `creep`, limit: 5 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            for (let results of Object.values(data.tracks.items)){
                console.log(results.name);
                console.log(results.popularity);
                console.log(results.type);
                console.log(results.track_number);
                console.log('---------------')
            }
        });
    }else{
        spotify.search({ type: 'track', query: `${song}`, limit: 5 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            for (let results of Object.values(data.tracks.items)){
                for(let artist of Object.values(results.artists)){
                    console.log(artist.name);
                }
                console.log(results.name);
                console.log(results.popularity);
                console.log(results.type);
                console.log(results.track_number);
                console.log('---------------')
            }
        });
    }
}

// omdp api

function getOmdb (movie) {
    if (!movie) {
        request(`http://www.omdbapi.com/?apikey=59e9ad1f&t=yuxu`, function (err, response) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var movies = JSON.parse(response.body);

            console.log(movies.Title);
            console.log(movies.Released);
            console.log(movies.Genre);
            console.log(movies.Actors);
            console.log(movies.Awards);
            console.log('----------------');
        })
    }else {
        request(`http://www.omdbapi.com/?apikey=59e9ad1f&t=${movie}`, function (err, response) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            
            var movies = JSON.parse(response.body);

            console.log(movies.Title);
            console.log(movies.Released);
            console.log(movies.Genre);
            console.log(movies.Actors);
            console.log(movies.Awards);
            console.log('----------------');
        })
    }
}

if(!command || !search) {
    console.log(`
    You didn't input command.
    Input some command and search something.
    The Liri's commands are 'find album', 'find song' or 'watch'
    `)
}else {
    liri(command, search);
}
