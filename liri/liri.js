require('dotenv').config();
var Spotify = require('node-spotify-api');
var fs = require('fs');

var myTweets = process.argv[2];
var spotifyReq = process.argv[2];
var spotifySearch = process.argv[3];
var imdbReq = process.argv[2];
var doWhat = process.argv[2];
var artist;
var song;
var previewUrl;
var album;
var sum = [];

for (i = 3; i < process.argv.length; i++) {
  sum.push(process.argv[i]);
}
//Twitter Section

var Twitter = require('twitter');
var keys = require("./keys.js");
var twitKey = keys.twitter.consumer_key;
var twitConSecret = keys.twitter.consumer_secret;
var twitTokenKey = keys.twitter.access_token_key;
var twitTokenSecret = keys.twitter.access_token_secret;
// console.log(twitTokenSecret);

var client = new Twitter({
  consumer_key: twitKey,
  consumer_secret: twitConSecret,
  access_token_key: twitTokenKey,
  access_token_secret: twitTokenSecret
});

if(myTweets === "my-tweets"){
  var params = {screen_name: 'tacoterry3'};
  client.get('https://api.twitter.com/1.1/search/tweets.json?src=typd&q=tacoterry3', params, function(error, tweets, response) {
  
  if (!error) {
  	for(var i = 0; i < tweets.statuses.length; i++){
  	console.log(tweets.statuses[i].text);
    }
  	//Trying to split or parse this ojbect

  	
    // console.log(JSON.parse(tweetParsed));
  }
  });
}
// //Twitter Section-End


//Spotify section begin
//Assigns env ID and Secret to variables for ease of use. 
var spotifyID = process.env.SPOTIFY_ID;
var spotifySecret = process.env.SPOTIFY_SECRET;
//  Checks input
if(spotifyReq === "spotify-this-song"){
  var spotify = new Spotify({
  id: spotifyID,
  secret: spotifySecret
  });
 console.log(spotifySearch);
  spotify.search({ type: 'track', query: "\"" + spotifySearch + "\"" }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    artist = data.tracks.items[0].artists[0].name;
    song = data.tracks.items[0].name;
    previewUrl = data.tracks.items[0].preview_url;
    album = data.tracks.items[0].album.name;
    //Artists name
    console.log(artist); 
    //Song name
    console.log(song);
    
    if(previewUrl !== null){
      console.log(previewUrl);
    }
    else{
	    console.log("No preview available");
    } 
    console.log(album);


  });
}
//Spotify section end

//Beginning of movie section
// Assigns request to API url
var request = require('request');

if(imdbReq === "movie-this"){
  var dataArr;
  var dataString = "";

  for(var i = 0; i<sum.length;i++){
    
    dataArr = sum[i].split(",");
    // console.log(dataArr);
    
    if(dataArr !== "undefined"){
        dataArr = dataArr.toString();
        dataString += dataArr + " ";
    }
  }
  console.log(dataString);

  request("http://www.omdbapi.com/?t=" + dataString + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var title = JSON.parse(body).Title;
      var releaseYear = JSON.parse(body).Year;
      var rating = JSON.parse(body).imdbRating;
      var rottenRating = JSON.parse(body).Ratings[1].Source + ": " + JSON.parse(body).Ratings[1].Value;
      var country = JSON.parse(body).Country;
      var language = JSON.parse(body).Language;
      var plot = JSON.parse(body).Plot;
      var actors = JSON.parse(body).Actors;
      console.log(actors); 
      console.log(JSON.parse(body).Ratings[1].Value); 

    } 
    else {
      console.warn(error);
    }
  });
}
//End of movie section

//Beginning of do what it says section

fs.readFile("random.txt", "utf8", function(err, data) {

  if(err){
    return console.log(err);
  }
  if(doWhat === "do-what-it-says"){
    var dataArr = data.split(",");
    dataArr = dataArr[1];
  
  
    var spotify = new Spotify({
      id: spotifyID,
      secret: spotifySecret
    });
 
    spotify.search({ type: 'track', query: "\"" + dataArr + "\"" }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      artist = data.tracks.items[0].artists[0].name;
      song = data.tracks.items[0].name;
      previewUrl = data.tracks.items[0].preview_url;
      album = data.tracks.items[0].album.name;
      //Artists name
      console.log(artist); 
      //Song name
      console.log(song);
    
      if(previewUrl !== null){
        console.log(previewUrl);
      }
      else{
        console.log("No preview available");
      } 
      console.log(album);


    });

  }

});

// console.log(process.argv[0]);
// console.log(process.argv[1]);
// console.log(process.argv[2]);


