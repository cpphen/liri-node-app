module.exports = {

	//Remember call back functions are always a parameter/argument to a function call.
	//To invoke a function assigned to a variable e.g var ranFunc = function(){}, put a () after the variable the function is assigned to.
	//in this example ranFunc() will execute the function.

	doIt: function(fs, spotify, nodeArgs, songName2){
		new Promise(function(resolve, reject){
			fs.readFile('randomTXT/random.txt', 'utf8', function(error, data){

				var chopped = data.split(',');

				nodeArgs[2] = chopped[0];

				songName2 = chopped[1];

				if(nodeArgs[2] === 'spotify-this-song')
				{
					spotify.search({ type: 'track', query: songName2, limit: 1 }, function(err, data) {
						    if ( err ) {
						        console.log('Error occurred: ' + err);
						        return reject(err);
						    }
					    		resolve(data);
					    		console.log("Artist: " + data.tracks.items[0].artists[0].name);
						    	console.log("Track Title: ", data.tracks.items[0].name);
						    	console.log("Preview: " + data.tracks.items[0].preview_url);
						    	console.log("Album: ", data.tracks.items[0].album.name);
					});
				}
			})
		}).then(function(data){
			var newSong = " LIRI-COMMAND: do-what-it-says: " + " (Artist): " + data.tracks.items[0].artists[0].name + " (Track Title): " 
			+ data.tracks.items[0].name + " (Preview): " + data.tracks.items[0].preview_url + " (Album): " + data.tracks.items[0].album.name;
			console.log("over here");
					    	// console.log("Track Title: ", data.tracks.items[0].name);
					    	// console.log("Preview: " + data.tracks.items[0].preview_url);
					    	// console.log("Album: ", data.tracks.items[0].album.name);
			fs.appendFile('log.txt', newSong, function(error, data){
				if(error)
					console.log(error)
				// return command;

			})
		}).catch(function(error){
			console.log("Some error happened" + error);
		})
	},


	movies: function(fs, request, nodeArgs, movieName){

		new Promise(function(resolve, reject){

			if(!nodeArgs[3])
			{
				request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&r=json", function(error, response, body){
					if(error)
					{
						console.log("Error: "+ error);
						return reject(error);
					}
					else
					{

					 resolve(body);

					 // console.log(JSON.stringify(response, null, 2))
						console.log("Movie Title: " + JSON.parse(body).Title);
					 // * Year the movie camefs,  out.
					 	console.log("Release Year: " + JSON.parse(body).Year);
					 //    * IMDB Rating of the movie.
					 	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
					 //    * Country where the movie was produced.
					 	console.log("Set Locations: " + JSON.parse(body).Country);
					 //    * Language of the movie.
					 	console.log("Language: " + JSON.parse(body).Language);
					 //    * Plot of the movie.
					 	console.log("Plot: " + JSON.parse(body).Plot);
					 //    * Actors in the movie.
					 	console.log("Actors: " + JSON.parse(body).Actors);
					 //    * Rotten Tomatoes Rating.
					
					 //    * Rotten Tomatoes URL.
					}
				});
			}
			else
			{
				for(var i = 3; i < nodeArgs.length; i++)
				{
					if(i > 3 && i < nodeArgs.length)
					{
						movieName = movieName + "+" + nodeArgs[i];		
					}
					else
			 			movieName += nodeArgs[i];
				}

				request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json", function(error, response, body){
					if(error)
					{
						console.log("Error: "+ error);
						return reject(error);
					}
					else
					{
						resolve(body);
						// console.log(JSON.stringify(response, null, 2))
						console.log("Movie Title: " + JSON.parse(body).Title);
					 // * Year the movie came out.
					 	console.log("Release Year: " + JSON.parse(body).Year);
					 //    * IMDB Rating of the movie.
					 	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
					 //    * Country where the movie was produced.
					 	console.log("Set Locations: " + JSON.parse(body).Country);
					 //    * Language of the movie.
					 	console.log("Language: " + JSON.parse(body).Language);
					 //    * Plot of the movie.
					 	console.log("Plot: " + JSON.parse(body).Plot);
					 //    * Actors in the movie.
					 	console.log("Actors: " + JSON.parse(body).Actors);
					 //    * Rotten Tomatoes Rating.
					
					 //    * Rotten Tomatoes URL.
					}
				});
				
			}
		}).then(function(body){
			var movieLog = "  LIRI-COMMAND: movie-this: " + " (Movie Title): " + JSON.parse(body).Title + " (Release Year): " + JSON.parse(body).Year 
			+ " (IMDB Rating): " + JSON.parse(body).imdbRating + " (Set Locations): " + JSON.parse(body).Country + " (Language): " 
			+ JSON.parse(body).Language + " (Plot): " + JSON.parse(body).Plot + " (Actors): " + JSON.parse(body).Actors;
			fs.appendFile('log.txt', movieLog, function(error, data){
				if(error)
				{
					console.log("Error: ", error);
				}
			});
		}).catch(function(error){
			console.log("An error: ", error);
		});
	},

	tweet: function(fs, nodeArgs, client){

		new Promise(function(resolve, reject){

			  client.get('search/tweets', {q: "node.js", count: 20 },  function(error, tweets, response) {

			  if(error)
			  {
			  	console.log("twitter error found", error)
			  	return reject(error);
			  }

			  var objectLength = tweets.statuses.length;

			  for(var x = 0; x < objectLength; x++)
			  {
			  	console.log(tweets.statuses[x].created_at);
			  	console.log(tweets.statuses[x].text);
			  }

			  resolve(tweets);

			})
		}).then(function(tweets){
			var logTweets = "";
			var command = "  LIRI-COMMAND: my-tweets: ";
			var finalLog = "";

			var tweetObjectLength = tweets.statuses.length;
			 for(var x = 0; x < tweetObjectLength; x++)
			 {
			 	logTweets += " (TWEET USER): " + "(" + (x+1) + ")" + " : " + tweets.statuses[x].created_at + "\n" + tweets.statuses[x].text;
			 }

			 finalLog = command + logTweets;

			 fs.appendFile('log.txt', finalLog, function(error, data){
			 	if(error)
			 	{
			 		console.log("Error: ", error);
			 	}
			 })
		}).catch(function(error){
			console.log("An error: ", error);
		});
	},

	spot: function(fs, spotify, nodeArgs, songName){

		new Promise(function(resolve, reject){

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
			    else
			    {
			    	if(data.tracks.items[0].name === null || data.tracks.items[0].name === 'undefined')
			    	{
			    		spotify.search({ type: 'track', query: "the sign", limit: 20 }, function(err, data) {
			    			resolve(data);
			    			console.log("Artist: " + data.tracks.items[0].artists[0].name);
			    			console.log("Track Title: ", data.tracks.items[0].name);
					    	console.log("Preview: " + data.tracks.items[0].preview_url);
					    	console.log("Album: ", data.tracks.items[0].album.name);
			    		});
			    	}
			    	else
			    	{
			    		resolve(data);
			    		console.log("Artist: " + data.tracks.items[0].artists[0].name);
				    	console.log("Track Title: ", data.tracks.items[0].name);
				    	console.log("Preview: " + data.tracks.items[0].preview_url);
				    	console.log("Album: ", data.tracks.items[0].album.name);
			    	}
			    }
			});
		}).then(function(data){
			var logMusicInfo = "  LIRI-COMMAND: spotify-this-song: " + " (Artist): " + data.tracks.items[0].artists[0].name + " (Track Title): " 
			+ data.tracks.items[0].name + " (Preview): " + data.tracks.items[0].preview_url + " (Album): " + data.tracks.items[0].album.name;

			fs.appendFile('log.txt', logMusicInfo, function(error, data){
				if(error)
				{
					console.log("An error: ", error);
				}
			})

		}).catch(function(error){
			console.log("An error: ", error);
		})
	}
}

//Alternate way to do exports.

	// exports.doIt = function(fs, spotify, nodeArgs, songName2){

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
	// },


	// exports.movies = function(request, nodeArgs, movieName){
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
	// },

	// exports.tweet = function(nodeArgs, client){
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
	// },

	// exports.spot = function(spotify, nodeArgs, songName){
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