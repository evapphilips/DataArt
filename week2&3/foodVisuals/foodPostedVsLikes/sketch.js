// Eva Philips
// September 17, 2019
// Data Art Week 3: This file graphs the time of post vs amount of likes recieved for each day of the 100 days of analog food porn.

// variables
let margin;
let rawFoodData;
let numberedDay = [];
let timePosted = [];
let likes = [];
let sclLikes = [];
let scltimePosted = [];

let k;
let yPos;


function preload(){
    // load the pattern data
    rawFoodData = loadJSON('foodPosts.json');
    console.log(rawFoodData);

}

function setup(){
    // setup canvas
    createCanvas(windowWidth, windowHeight);
    background(0);
    frameRate(15) // show the next data point every half second
    margin = 100;
    k = 0;
    yPos = margin;

    // place the raw data into the appropriate objects
    for(let i=0; i<100; i++){
        numberedDay.push(rawFoodData[i].numberedDay);
        timePosted.push(rawFoodData[i].date.hour + (rawFoodData[i].date.minute/60) + (rawFoodData[i].date.second/3600));
        likes.push(rawFoodData[i].likes);  
    }
    console.log(likes)

    // scale values
    for(let j=0; j<likes.length; j++){
        sclLikes.push(map(likes[j], 0, 36, 0, height/5));
        scltimePosted.push(map(timePosted[j], 0, 24, 0, width));
    }

    // title
    fill(255);
    stroke(255);
    strokeWeight(.5);
    textSize(24);
    text("100 Days of Analog Food Porn: Time of Day Posted vs Number of Likes", margin/2, height-(margin/2));
}

function draw(){

    drawNextDay();

    // move through the entire data set
    if(k == 99){
        noLoop(); // stop the animation
        console.log("all done");
    }else{
        k++
    }

}

function drawNextDay(){
    stroke(255);
    strokeWeight(.25);
    fill(255, 40);

    line(0, yPos, scltimePosted[k] - 25, yPos);
    beginShape();
    curveVertex(scltimePosted[k] - 25, yPos);
    curveVertex(scltimePosted[k] - 25, yPos);
    curveVertex(scltimePosted[k], yPos - sclLikes[k]);
    curveVertex(scltimePosted[k] + 25, yPos);
    curveVertex(scltimePosted[k] + 25, yPos);
    endShape();
    line(scltimePosted[k] + 25, yPos, width, yPos);

    yPos += (height - (2 * margin)) / 100;

    // write day
    rectMode(CENTER);
    fill(0);
    noStroke();
    rect(width-margin, 3*margin/4, 200, 50);
    fill(255);
    stroke(255);
    strokeWeight(.5);
    textSize(24);
    text("Day: " + numberedDay[k], width-margin, 3*margin/4);
}
