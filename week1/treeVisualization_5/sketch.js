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

let sections = [];

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
        growthScale[i] = map(+data.getRow(i).get('RawRingWidth_mm'), 0, 2.1, 255, 0);  
       
    }

    for(let i=0; i<growthScale.length; i++){
        sections.push(new Section(i));
    }


}

function draw(){
    background(255);

    for(let i=0; i<sections.length; i++){
        sections[i].display();
    }

    for(let j=0; j<sections.length; j++){
        sections[j].touching();
    }
}

class Section{
    constructor(i){
        this.x = map(i, 0, growthScale.length, 0, width);
        this.y = 0;
        this.col = growthScale[i];
        this.i = i;
    }

    display(){
        push();
        translate(this.x ,this.y);
        fill(this.col);
        noStroke();
        rect(0, 0, width/growthScale.length, height);
        pop();
    }

    touching(){
        if(mouseX>=this.x && mouseX<this.x+width/growthScale.length){
            textSize(32);
            fill(0);
            noStroke();
            text(timeline[this.i] + ", " + data.getRow(this.i).get('RawRingWidth_mm') + "mm", mouseX, mouseY);
        }
    }
}
