// Eva Philips
// September 17, 2019
// Data Art Week 3: This file graphs the time of post vs amount of views recieved for each day of the 100 days of generative patterns.

// variables
let margin;
let rawPatternData;
let numberedDay = [];
let timePosted = [];
let views = [];
let sclViews = [];
let scltimePosted = [];

let k;
let yPos;


function preload(){
    // load the pattern data
    rawPatternData = loadJSON('patternPosts.json');
    console.log(rawPatternData);

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
        numberedDay.push(rawPatternData[i].numberedDay);
        timePosted.push(rawPatternData[i].date.hour + (rawPatternData[i].date.minute/60) + (rawPatternData[i].date.second/3600));
        views.push(rawPatternData[i].views);
    }

    // scale values
    for(let j=0; j<views.length; j++){
        sclViews.push(map(views[j], 0, 412, 0, height/2));
        scltimePosted.push(map(timePosted[j], 0, 24, 0, width));
    }

    // title
    fill(255);
    stroke(255);
    strokeWeight(.5);
    textSize(24);
    text("100 Days of Generative Patterns: Time of Day Posted vs Number of Views", margin/2, height-(margin/2));

}

function draw(){

    drawNextDay();

    // move through the entire data set
    if(k == views.length -1){
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
    curveVertex(scltimePosted[k], yPos - sclViews[k]);
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
