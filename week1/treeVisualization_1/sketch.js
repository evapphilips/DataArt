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

    /////// visualizations 1-3 ///////
    // show each data point one at a time
    drawDataPoint(i);

    // move through the entire data set
    if(i>growthScale.length){
        noLoop(); // stop the animation
        console.log("all done");
    }else{
        i++
    }
    /////////////////////////////////

    /////// visualizations 4 ///////
    // background(255, 20);
    // index = floor(map(mouseX, 0, width, 0, growthScale.length));
    // console.log(index);
    // push();
    // translate(0, height / 2);
    // fill(0);
    // rectMode(CENTER);
    // rect(map(index, 0, growthScale.length, 0, width), 0, 100, growthScale[index]);

    // //ellipse(map(index, 0, growthScale.length, 0, width), 0, 100, 100);
    // fill(255);
    // noStroke();
    // textSize(32);
    // text(timeline[index], map(index, 0, growthScale.length, 0, width) - 40, 10);
    // pop();

     /////////////////////////////////

}

function drawDataPoint(i){
    /////// visualization 1 /////////
    // push();
    // translate(width/2, height/2);

    // // write the data in the center of the rings
    // fill(255);
    // noStroke();
    // ellipse(0, 0, 100, 100);
    // fill(0);
    // textSize(32);
    // text(timeline[i], -40, 10);

    // // draw each data point as a circle with radius mapped to the rind size
    // //stroke(map(i, 0, growthScale.length, 0, 255));
    // stroke(0);
    // strokeWeight(0.125);
    // noFill();
    // //background(220, 5);
    // ellipse(0, 0, growthScale[i], growthScale[i]);

    //pop();

    /////////////////////////////////

    // ///// visualization 2 /////////
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

    // /////////////////////////////////

    // ///// visualization 3 /////////
    // push();
    // translate(map(i, 0, growthScale.length, 0, 3*width/5-margin), margin);

    // // write the data in the center of the rings
    // fill(255);
    // noStroke();
    // ellipse(0, 0, 100, 100);
    // fill(0);
    // textSize(32);
    // text(timeline[i], -40, 10);

    // // draw each data point as a circle with radius mapped to the rind size
    // //stroke(map(i, 0, growthScale.length, 0, 255));
    // stroke(0);
    // strokeWeight(0.5);
    // fill(0, 5);
    // //background(220, 5);
    // line(0, 0, growthScale[i], growthScale[i]);

    // pop();

    // /////////////////////////////

}