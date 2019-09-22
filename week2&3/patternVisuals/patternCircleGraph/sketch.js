// Eva Philips
// September 17, 2019
// Data Art Week 3: This file graphs ____ 100 days of generative patterns.

// variables
let numberedDay = [];
let likes = [];
let comments = [];
let views = [];
let timePosted = [];

let x;
let y;
let r;
let theta = 0;

function preload(){
    // load the pattern data
    rawPatternData = loadJSON('patternPosts.json');
    console.log(rawPatternData);

}

function setup(){
    // setup canvas
    createCanvas(windowWidth, windowHeight);
    background(0);
    
    // place the raw data into the appropriate objects
    for(let i=0; i<100; i++){
        numberedDay.push(rawPatternData[i].numberedDay);
        likes.push(rawPatternData[i].likes);
        comments.push(rawPatternData[i].comments);
        views.push(rawPatternData[i].views);
        timePosted.push(rawPatternData[i].date.hour + (rawPatternData[i].date.minute/60) + (rawPatternData[i].date.second/3600));
    }

}

function draw(){

    textSize(24);
    noStroke();
    fill(255);

    // views
    drawGraph(views, 412, width/4, height/4)
    text("Views", width/4 - 100, height/4 - 100);
    // likes
    drawGraph(likes, 100, 3*width/4, height/4)
    text("Likes", 3*width/4 - 100, height/4 - 100);
    // comments
    drawGraph(comments, 16, width/4, 3*height/4)
    text("Comments", width/4 - 100, 3*height/4 - 150);
    // time posted
    drawGraph(timePosted, 34, 3*width/4, 3*height/4)
    text("Time Posted", 3*width/4 - 100, 3*height/4 - 150);
 
}

function drawGraph(variable, rng, posX, posY){

    stroke(255);
    strokeWeight(.125);
    for(let i = 0; i<numberedDay.length; i++){
        // map variables 
        r = map(variable[i], 0, rng, 0, height/2);
        theta = map(numberedDay[i], 1, 100, 0, TWO_PI);

        // calculate point from angle
        x = r * cos(theta);
        y = r * sin(theta);

        push();
        translate(posX, posY);
        line(0, 0, x, y);
        pop();
    } 

}

