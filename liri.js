var twatKeys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var StrawberryCough = require('./functions.js');
var fs = require('fs');

// console.log('keys', twatKeys)
var client = new Twitter({
		consumer_key: twatKeys.twitterKeys.consumer_key,
		consumer_secret: twatKeys.twitterKeys.consumer_secret,
		access_token_key: twatKeys.twitterKeys.access_token_key,
		access_token_secret: twatKeys.twitterKeys.access_token_secret
});

var nodeArgs = process.argv;
var command = process.argv[2];
var songName = '';
var songName2;
var movieName = '';

//how come you do not need to do a exports on parameters being sent to other file.
switch (command)
{
	case "my-tweets":
		StrawberryCough.tweet(fs, nodeArgs, client, command);
		break;
	case "spotify-this-song":
		StrawberryCough.spot(fs, spotify, nodeArgs, songName, command);
		break;
	case "movie-this":
		StrawberryCough.movies(fs, request, nodeArgs, movieName, command);
		break;
	case "do-what-it-says":
		StrawberryCough.doIt(fs, spotify, nodeArgs, songName2, command);
		break;
}

// function doIt(){

// 	fs.readFile('randomTXT/random.txt', 'utf8', function(error, data){

// 		var chopped = data.split(',');

// 		nodeArgs[2] = chopped[0];

// 		songName2 = chopped[1];

// 		if(nodeArgs[2] === 'spotify-this-song')
// 		{
// 			spotify.search({ type: 'track', query: songName2, limit: 1 }, function(err, data) {
// 				    if ( err ) {
// 				        console.log('Error occurred: ' + err);
// 				        return;
// 				    }
// 			    		console.log("Artist: " + data.tracks.items[0].artists[0].name);
// 				    	console.log("Track Title: ", data.tracks.items[0].name);
// 				    	console.log("Preview: " + data.tracks.items[0].preview_url);
// 				    	console.log("Album: ", data.tracks.items[0].album.name);
// 			});
// 		}
// 	})/*.then(function(){

// 		fs.appendFile('logTXT/log.txt', command, function(error, data){
// 			if(error)
// 				console.log(error)
// 			return command;

// 		})
// 	});*/	
// }


// function movies(){
// 	if(!nodeArgs[3])
// 	{
// 		request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&r=json", function(error, response, body){
// 			if(error)
// 				console.log("Error: "+ error);
// 			else
// 			{
// 				// console.log(JSON.stringify(response, null, 2))
// 				console.log("Movie Title: " + JSON.parse(body).Title);
// 			 // * Year the movie came out.
// 			 	console.log("Release Year: " + JSON.parse(body).Year);
// 			 //    * IMDB Rating of the movie.
// 			 	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
// 			 //    * Country where the movie was produced.
// 			 	console.log("Set Locations: " + JSON.parse(body).Country);
// 			 //    * Language of the movie.
// 			 	console.log("Language: " + JSON.parse(body).Language);
// 			 //    * Plot of the movie.
// 			 	console.log("Plot: " + JSON.parse(body).Plot);
// 			 //    * Actors in the movie.
// 			 	console.log("Actors: " + JSON.parse(body).Actors);
// 			 //    * Rotten Tomatoes Rating.
			
// 			 //    * Rotten Tomatoes URL.
// 			}
// 		});
// 	}
// 	else
// 	{
// 		for(var i = 3; i < nodeArgs.length; i++)
// 		{
// 			if(i > 3 && i < nodeArgs.length)
// 			{
// 				movieName = movieName + "+" + nodeArgs[i];		
// 			}
// 			else
// 	 			movieName += nodeArgs[i];
// 		}

// 		request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json", function(error, response, body){
// 			if(error)
// 				console.log("Error: "+ error);
// 			else
// 			{
// 				// console.log(JSON.stringify(response, null, 2))
// 				console.log("Movie Title: " + JSON.parse(body).Title);
// 			 // * Year the movie came out.
// 			 	console.log("Release Year: " + JSON.parse(body).Year);
// 			 //    * IMDB Rating of the movie.
// 			 	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
// 			 //    * Country where the movie was produced.
// 			 	console.log("Set Locations: " + JSON.parse(body).Country);
// 			 //    * Language of the movie.
// 			 	console.log("Language: " + JSON.parse(body).Language);
// 			 //    * Plot of the movie.
// 			 	console.log("Plot: " + JSON.parse(body).Plot);
// 			 //    * Actors in the movie.
// 			 	console.log("Actors: " + JSON.parse(body).Actors);
// 			 //    * Rotten Tomatoes Rating.
			
// 			 //    * Rotten Tomatoes URL.
// 			}
// 		});
		
// 	}
// }

// function tweet(){
// 	  client.get('search/tweets', {q: "node.js", count: 20 },  function(error, tweets, response) {

// 	  if(error)
// 	  {
// 	  	return console.log("twitter error found", error)
// 	  }

// 	  var objectLength = tweets.statuses.length;

// 	  for(var x = 0; x < objectLength; x++)
// 	  {
// 	  	console.log(tweets.statuses[x].created_at);
// 	  	console.log(tweets.statuses[x].text);
// 	  }

// 	});
// }

// function spot(){
// 	for(var i = 3; i < nodeArgs.length; i++)
// 	{
// 		if(i > 3 && i < nodeArgs.length)
// 		{
// 			songName = songName + "+" + nodeArgs[i];		
// 		}
// 		else
//  			songName += nodeArgs[i];
// 	}

// 	spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
// 		    if ( err ) {
// 		        console.log('Error occurred: ' + err);
// 		        return;
// 		    }
	
//     	// console.log(JSON.stringify(data, null, 2));
//     	// console.log("Artist: " + data.tracks.items[0].artists[0].name);
//     	if(data.tracks.items[0].name === null || data.tracks.items[0].name === 'undefined')
//     	{
//     		spotify.search({ type: 'track', query: "the sign", limit: 20 }, function(err, data) {
//     			console.log("Artist: " + data.tracks.items[6].artists[0].name);
//     			console.log("Track Title: ", data.tracks.items[6].name);
// 		    	console.log("Preview: " + data.tracks.items[6].preview_url);
// 		    	console.log("Album: ", data.tracks.items[6].album.name);
//     		});
//     	}
//     	else
//     	{
//     		console.log("Artist: " + data.tracks.items[0].artists[0].name);
// 	    	console.log("Track Title: ", data.tracks.items[0].name);
// 	    	console.log("Preview: " + data.tracks.items[0].preview_url);
// 	    	console.log("Album: ", data.tracks.items[0].album.name);
//     	}
// 	});
// }

// if(nodeArgs[2] === "my-tweets")
// {
// 	client.get('search/tweets', {q: "node.js", count: 20 },  function(error, tweets, response) {

// 	  if(error)
// 	  {
// 	  	return console.log("twitter error found", error)
// 	  }

// 	  var objectLength = tweets.statuses.length;

// 	  for(var x = 0; x < objectLength; x++)
// 	  {
// 	  	console.log(tweets.statuses[x].created_at);
// 	  	console.log(tweets.statuses[x].text);
// 	  }

// 	});
// }

//Spotify does not really work well with most of the songs I searched for. It returns a random artist i never heard of. But if I put in a very
//popular song like poker face by lady gaga, it will work.
// else if(process.argv[2] === "spotify-this-song")
// {
// 	console.log(process.argv[2]);
// 	for(var i = 3; i < nodeArgs.length; i++)
// 	{
// 		if(i > 3 && i < nodeArgs.length)
// 		{
// 			songName = songName + "+" + nodeArgs[i];		
// 		}
// 		else
//  			songName += nodeArgs[i];
// 	}

// 	spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
// 		    if ( err ) {
// 		        console.log('Error occurred: ' + err);
// 		        return;
// 		    }
	
//     	// console.log(JSON.stringify(data, null, 2));
//     	// console.log("Artist: " + data.tracks.items[0].artists[0].name);
//     	if(data.tracks.items[0].name === null || data.tracks.items[0].name === 'undefined')
//     	{
//     		spotify.search({ type: 'track', query: "the sign", limit: 20 }, function(err, data) {
//     			console.log("Artist: " + data.tracks.items[6].artists[0].name);
//     			console.log("Track Title: ", data.tracks.items[6].name);
// 		    	console.log("Preview: " + data.tracks.items[6].preview_url);
// 		    	console.log("Album: ", data.tracks.items[6].album.name);
//     		});
//     	}
//     	else
//     	{
//     		console.log("Artist: " + data.tracks.items[0].artists[0].name);
// 	    	console.log("Track Title: ", data.tracks.items[0].name);
// 	    	console.log("Preview: " + data.tracks.items[0].preview_url);
// 	    	console.log("Album: ", data.tracks.items[0].album.name);
//     	}
// 	});
// }
// else if(process.argv[2] === 'movie-this')
// {
// 	if(!process.argv[3])
// 	{
// 		request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&r=json", function(error, response, body){
// 			if(error)
// 				console.log("Error: "+ error);
// 			else
// 			{
// 				// console.log(JSON.stringify(response, null, 2))
// 				console.log("Movie Title: " + JSON.parse(body).Title);
// 			 // * Year the movie came out.
// 			 	console.log("Release Year: " + JSON.parse(body).Year);
// 			 //    * IMDB Rating of the movie.
// 			 	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
// 			 //    * Country where the movie was produced.
// 			 	console.log("Set Locations: " + JSON.parse(body).Country);
// 			 //    * Language of the movie.
// 			 	console.log("Language: " + JSON.parse(body).Language);
// 			 //    * Plot of the movie.
// 			 	console.log("Plot: " + JSON.parse(body).Plot);
// 			 //    * Actors in the movie.
// 			 	console.log("Actors: " + JSON.parse(body).Actors);
// 			 //    * Rotten Tomatoes Rating.
			
// 			 //    * Rotten Tomatoes URL.
// 			}
// 		});
// 	}
// 	else
// 	{
// 		for(var i = 3; i < nodeArgs.length; i++)
// 		{
// 			if(i > 3 && i < nodeArgs.length)
// 			{
// 				movieName = movieName + "+" + nodeArgs[i];		
// 			}
// 			else
// 	 			movieName += nodeArgs[i];
// 		}

// 		request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json", function(error, response, body){
// 			if(error)
// 				console.log("Error: "+ error);
// 			else
// 			{
// 				// console.log(JSON.stringify(response, null, 2))
// 				console.log("Movie Title: " + JSON.parse(body).Title);
// 			 // * Year the movie came out.
// 			 	console.log("Release Year: " + JSON.parse(body).Year);
// 			 //    * IMDB Rating of the movie.
// 			 	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
// 			 //    * Country where the movie was produced.
// 			 	console.log("Set Locations: " + JSON.parse(body).Country);
// 			 //    * Language of the movie.
// 			 	console.log("Language: " + JSON.parse(body).Language);
// 			 //    * Plot of the movie.
// 			 	console.log("Plot: " + JSON.parse(body).Plot);
// 			 //    * Actors in the movie.
// 			 	console.log("Actors: " + JSON.parse(body).Actors);
// 			 //    * Rotten Tomatoes Rating.
			
// 			 //    * Rotten Tomatoes URL.
// 			}
// 		});
		
// 	}
// }
// else if(process.argv[2] === 'do-what-it-says')
// {
// 	fs.readFile('randomTXT/random.txt', 'utf8', function(error, data){
// 		var chopped = data.split(',');
// 		console.log(chopped);
// 		console.log(chopped.length)
// 		// var chopped2 = chopped[1].split('');
// 		// console.log(chopped2);
// 		process.argv[2] = chopped[0];
// 		return process.argv[2];
// 		// console.log(process.argv[2]);
// 		// songName2 = chopped[1];
// 		// console.log(songName2);	
// 	});
// }