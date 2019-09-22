// Eva Philips
// September 17, 2019
// Data Art Week 3: This file graphs the data for each day of the 100 days of analog food porn.

// variables
let numberedDay = [];
let likes = [];
let comments = [];
let timePosted = [];
let duration = [];

function preload(){
    // load the pattern data
    rawFoodData = loadJSON('foodPosts.json');
    console.log(rawFoodData);

}

function setup(){
    // setup canvas
    createCanvas(windowWidth, windowHeight);
    background(0);


    // place the raw data into the appropriate objects
    for(let i=0; i<100; i++){
        numberedDay.push(rawFoodData[i].numberedDay);
        likes.push(rawFoodData[i].likes);
        comments.push(int(rawFoodData[i].duration.Comments));
        timePosted.push(rawFoodData[i].date.hour + (rawFoodData[i].date.minute/60) + (rawFoodData[i].date.second/3600));
        duration.push(int(rawFoodData[i].duration.Duration_hr) + (int(rawFoodData[i].duration.Duration_min)/60) + (int(rawFoodData[i].duration.Duration_hr)/3600)) 
    }

}

function draw(){

    textSize(24);
    noStroke();
    fill(255);

    // views
    drawGraph(likes, 66, width/4, height/4)
    text("Likes", width/4 - 100, height/4 - 100);
    // likes
    drawGraph(comments, 6, 3*width/4, height/4)
    text("Comments", 3*width/4 - 100, height/4 - 100);
    // comments
    drawGraph(timePosted, 44, width/4, 3*height/4)
    text("Time Posted", width/4 - 100, 3*height/4 - 150);
    // time posted
    drawGraph(duration, 4, 3*width/4, 3*height/4)
    text("Duration", 3*width/4 - 100, 3*height/4 - 150);

 

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

