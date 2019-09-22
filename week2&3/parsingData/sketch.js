// Eva Philips
// September 12, 2019
// Data Art Week 2: This file parses the media.json file downloaded from evaphilips_itp instagram data download.

// variables
let rawData;
let extraFoodData;
let extraPatternData;
let videos;
let photos;
let patternPosts = [];
let foodPosts = [];
let post = {};



function preload(){
    // load media data from json
    rawData = loadJSON("media.json");
    
 
    


    // load extra food Data from csv
    extraFoodData = loadTable('extraFoodData.csv', 'csv', 'header');

    // load extra pattern Data from csv
    extraPatternData = loadTable('extraPatternData.csv', 'csv', 'header');


    
}

function setup(){
    // flip the order of the data from instagram so it matches the extra data from 1 to 100
    videos = reverse(rawData.videos);
    photos = reverse(rawData.photos);

    // parsing patterns data
    for(let i=0; i<videos.length; i++){
        // get caption and date from each post
        post.caption = videos[i].caption;
        post.numberedDay = parseNumber(videos[i].caption);
        post.date = parseDate(videos[i].taken_at);
        // get like and views for each post
        post.likes = int(extraPatternData.rows[i].obj.Likes);
        post.views = int(extraPatternData.rows[i].obj.Views);
        post.comments = int(extraPatternData.rows[i].obj.Comments);
        // place each post into a json will all the pattern posts
        patternPosts.push(post);
        // clear the post object before moving to the next post
        post = {};
    }

    // parsing food data
    for(let i=0; i<photos.length; i++){
        // get caption and date from each post
        post.caption = photos[i].caption;
        post.numberedDay = parseNumber(photos[i].caption);
        post.date = parseDate(photos[i].taken_at);
        // get duration and likes for each post
        post.duration = extraFoodData.rows[i].obj;
        post.likes = int(extraFoodData.rows[i].obj.Likes);
        // place each post into a json will all the pattern posts
        foodPosts.push(post);
        // clear the post object before moving to the next post
        post = {};
    }

    //console.log(patternPosts);
    //console.log(extraFoodData.rows[36].obj)

    // save the two json files
    saveJSON(patternPosts, 'patternPosts.json');
    saveJSON(foodPosts, 'foodPosts.json');
}

function draw(){
    

}



//////////////////////////////////////////////////////////////////////////////////////////
// parse the numbered day
function parseNumber(caption){
    let str = caption;
    spl1 = split(str, ".");
    spl2 = split(spl1[0], " ")
    let numberedDay = int(spl2[1]);
    return numberedDay;
}

// parse the json date from raw data
function parseDate(jsonDate){
    let date = {}
    let str = jsonDate;
    let spl1 = split(str, "-")
    date.year = int(spl1[0]);
    date.month = int(spl1[1]);
    let spl2 = split(spl1[2], "T")
    date.day = int(spl2[0]);
    let spl3 = split(spl2[1], ":");
    date.hour = int(spl3[0]);
    date.minute = int(spl3[1]);
    date.second = int(spl3[2]);
    return date
}