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
        growthScale[i] = map(+data.getRow(i).get('RawRingWidth_mm'), 0, 2.1, 100, height - margin);
       
       
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
    translate(map(i, 0, growthScale.length, 0, width), height/2);

    // write the data in the center of the rings
    fill(255);
    noStroke();
    ellipse(0, 0, 100, 100);
    fill(0);
    textSize(32);
    text(timeline[i], -40, 10);

    // draw each data point as a circle with radius mapped to the rind size
    //stroke(map(i, 0, growthScale.length, 0, 255));
    noStroke();
    strokeWeight(0.125);
    fill(0, 5);
    //background(220, 5);
    ellipse(0, 0, growthScale[i], growthScale[i]);

    pop();
}