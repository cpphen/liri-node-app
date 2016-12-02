var twatKeys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
// console.log('keys', twatKeys)
var client = new Twitter({
		consumer_key: twatKeys.twitterKeys.consumer_key,
		consumer_secret: twatKeys.twitterKeys.consumer_secret,
		access_token_key: twatKeys.twitterKeys.access_token_key,
		access_token_secret: twatKeys.twitterKeys.access_token_secret
});

var nodeArgs = process.argv;
var songName = '';
// var conKey = twatKeys.twitterKeys.consumer_key;
// var conSecret = twatKeys.twitterKeys.consumer_secret;

// var tokeKey = twatKeys.twitterKeys.access_token_key;
// var secretToke = twatKeys.twitterKeys.access_token_secret;

// console.log(conKey)
// console.log(conSecret)
// console.log(tokeKey)
// console.log(secretToke)
// console.log(keysOnVanNuys);

if(nodeArgs[2] === "my-tweets")
{
	client.get('search/tweets', {q: "node.js", count: 20 },  function(error, tweets, response) {

	  if(error)
	  {
	  	return console.log("twitter error found", error)
	  }

	  var objectLength = tweets.statuses.length;

	  for(var x = 0; x < objectLength; x++)
	  {
	  	console.log(tweets.statuses[x].created_at);
	  	console.log(tweets.statuses[x].text);
	  }

	});
}

//Spotify does not really work well with most of the songs I searched for. It returns a random artist i never heard of. But if I put in a very
//popular song like poker face by lady gaga, it will work.
else if(process.argv[2] === "spotify-this-song")
{
	for(var i = 3; i < nodeArgs.length; i++)
	{
		if(i > 3 && i < nodeArgs.length)
		{
			songName = songName + "+" + nodeArgs[i];		
		}
		else
 			songName += nodeArgs[i];
	}

	spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }
	
    	// console.log(JSON.stringify(data, null, 2));
    	// console.log("Artist: " + data.tracks.items[0].artists[0].name);
    	if(data.tracks.items[0].name === null || data.tracks.items[0].name === 'undefined')
    	{
    		spotify.search({ type: 'track', query: "the sign", limit: 20 }, function(err, data) {
    			console.log("Artist: " + data.tracks.items[6].artists[0].name);
    			console.log("Track Title: ", data.tracks.items[6].name);
		    	console.log("Preview: " + data.tracks.items[6].preview_url);
		    	console.log("Album: ", data.tracks.items[6].album.name);
    		});
    	}
    	else
    	{
    		console.log("Artist: " + data.tracks.items[0].artists[0].name);
	    	console.log("Track Title: ", data.tracks.items[0].name);
	    	console.log("Preview: " + data.tracks.items[0].preview_url);
	    	console.log("Album: ", data.tracks.items[0].album.name);
    	}


    	// console.log(data)
	});
}