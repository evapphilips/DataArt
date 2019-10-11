// Eva Philips
// October 5, 2019
// This webpage...


// variables
let msnbc;
let fox;
let button;
let word;
let leftNumber;
let rightNumber;
let field;
let canvas1;
let context;


let allData;
let compareTag;
let searchTag;
let canvas2;
let cnv;



function preload() {
    // load transcripts
    loadStrings('transcripts/TC924.txt', prepareFox);
    loadStrings('transcripts/RM924.txt', prepareMsnbc);
}
function prepareMsnbc(result) {
    msnbc = result.join(" ");
}

function prepareFox(result) {
    fox = result.join(" ");
}


function setup() {
    // when button is pressed get word and word count for each party
    button = select('#submit');
    button.mousePressed(getWord);

    // access both numbers in the DOM
    leftNumber = select('#lNum');
    rightNumber = select('#rNum');

    // access the input DOM elements
    field = select('#field');
    word = field.value();

    // access the canvas
    canvas1 = select('#canvas');
    canvas2 = select('#canvas2');
    canvas2.hide();
    cnv = createCanvas(windowWidth, windowHeight);
        cnv.style('position', 'absolute');
        cnv.style('left', '0px');
        cnv.hide();
        background(255);

    // access different pages
    compareTag = select('#compareTag');
    searchTag = select('#searchTag')
    compareTag.mousePressed(function () {
        searchTag.style('color', '#DEE1E2');
        compareTag.style('color', 'black');
        canvas1.hide();
        field.hide();
        button.hide();
        leftNumber.hide();
        rightNumber.hide();
        canvas2.show();
        cnv.show();
        
        //cnv.style('top', '0px');
        
        fill(0);
        //cnv.text("hi", 10, 100);

        // word data for all the data
        // get an array of common words used in both shows
        allData = [msnbc, fox].join(" ");
        allData = allData.toLowerCase();
        allData = allData.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()?"]/gi, "");
        allData = getNoneStopWords(allData);
        allData = allData.sort();
        // get object of unique words and their count
        let sentence = allData.join(" ");
        let uniqueWord = [];
        let previousword = "";
        for (let i = 0; i < allData.length; i++) {
            currentword = allData[i];
            if (i > 0) {
                //let count = 0;
                if (previousword !== currentword) {
                    let w = new RegExp(currentword, "gi")
                    let count = sentence.match(w).length;
                    uniqueWord.push({ word: currentword, count: count });
                }
            }
            previousword = allData[i];

        }
        // find the most used words
        let counts = [];

        for (let k = 0; k < uniqueWord.length; k++) {
            counts.push(uniqueWord[k].count)
        }
        counts = counts.sort(function (a, b) { return a - b });
        //let maxCounts = counts[counts.length-10, counts.length-1];
        for (let m = counts.length - 1; m >= counts.length - 50; m--) {
            for (l = 0; l < uniqueWord.length; l++) {
                if (uniqueWord[l].count == counts[m]) {
                    fill(0);
                    //cnv.rect(10, 10, 10, uniqueWord[l].count);
                    //cnv.text(uniqueWord[l].word + " " + uniqueWord[l].count, 10, height/2);
                    //console.log(uniqueWord[l].word + " " + uniqueWord[l].count);
                }
            }
        }
            //console.log(counts[m]);
        });

    searchTag.mousePressed(function () {
        compareTag.style('color', '#DEE1E2');
        searchTag.style('color', 'black');
        canvas1.show();
        field.show();
        button.show();
        leftNumber.show();
        rightNumber.show();
        canvas2.hide();
        cnv.hide();

    });  
}

function getNoneStopWords(sentence) {
    var common = getStopWords();
    var wordArr = sentence.match(/\w+/g),
        commonObj = {},
        uncommonArr = [],
        word, i;

    for (i = 0; i < common.length; i++) {
        commonObj[common[i].trim()] = true;
    }

    for (i = 0; i < wordArr.length; i++) {
        word = wordArr[i].trim().toLowerCase();
        if (!commonObj[word]) {
            uncommonArr.push(word);
        }
    }
    return uncommonArr;
}

function getStopWords() {
    return ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've", ...
        "r", "e", "o", "t", "n", "h", "s", "l", "d", "c", "m", "re", "al", "ll", "ve", "id", "pr", "im", "ig", "j", "preside"];
}

function draw() {

}

function getWord() {
    // get the reg exp of the word
    word = new RegExp(field.value(), "gi");
    //console.log(word);

    // search MSNBC number for that word
    let arrl = msnbc.match(word);
    let ln;
    if (arrl != null) {
        ln = arrl.length;
    } else {
        ln = 0;
    }
    leftNumber.html(ln);

    // search Fox number for that word
    let arrr = fox.match(word);
    let rn;
    if (arrr != null) {
        rn = arrr.length;
    } else {
        rn = 0;
    }
    rightNumber.html(rn);

    //change background based on percentage
    let total = rn + ln;
    if (total == 0) {
        canvas1.style('width', '50%');
    } else {
        let ratio = 100 * (ln / total);
        canvas1.style('width', ratio + '%');
    }
}
