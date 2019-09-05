// Eva Philips
// September 4, 2019
// Data Art Week 1: This program visualized Hemlock tree Data.

// variable
let data;
let margin = 20;

let timeline = [];
let growthScale = [];
let i = 0;
let index;

function preload(){
    // load the data into a table
    data = loadTable("data.csv", "csv", "header");
}

function setup(){

    // setup canvas
    let cvs =createCanvas(windowWidth, windowHeight);
    cvs.center('horizontal');
    background(255);
    frameRate(20) // show the next data point every half second

    // place the data into two arrays, a time line aray and a growth scale array
    for (let i = 0; i < data.getRowCount(); i++) {
        timeline[i] = data.getRow(i).get('year')
        growthScale[i] = map(+data.getRow(i).get('RawRingWidth_mm'), 0, 2.1, 0, PI);
       
       
    }


}

function draw(){
    // show each data point one at a time
    drawDataPoint(i);

    // move through the entire data set
    if(i>growthScale.length){
        noLoop(); // stop the animation
        console.log("all done");
    }else{
        i++
    }
}

function drawDataPoint(i){
  
    push();
    translate(width/2, 0);

    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(-width/2 + 50, 50, 200, 200);
    fill(0);
    textSize(32);
    text(timeline[i], -width/2 + 50, 50);

    // draw each data point as a circle with radius mapped to the rind size
    stroke(0);
    strokeWeight(5);
    noFill();
    arc(0, 0, i*width/growthScale.length, i*width/growthScale.length, 0, growthScale[i]);

    pop();
}