// when the page first loads
window.addEventListener("load", init);
function init() {

    // initiate voice 
    // var myVoice = new p5.Speech(); // new P5.Speech object

    // store API info
    var complaintURL = "https://data.cityofnewyork.us/resource/erm2-nwe9.json?borough="
    var openDataToken = "" // * INSERT API TOKEN * //

    // variables
    var borough = "BRONX" // set defailt borough to brooklyn
    var boroughChoices = ["BRONX", "BROOKLYN", "QUEENS", "MANHATTAN", "STATEN%20ISLAND"]

    // create API url
    var dataURL = complaintURL + borough + "&$$app_token=" + openDataToken;
    //console.log(dataURL)

    // show default complaints when the page loads
    updateComplaints()

    // show map defaults
    //get documents for dom
    let complaintDiv = document.getElementById('complaintDiv');
    let complaintNav = document.getElementById('complaintNav');
    let injuryDiv = document.getElementById('injuryDiv');
    let injuryNav = document.getElementById('injuryNav');
    let mapImg = document.getElementById('map-img');
    //get boroughs
    let bronx = document.getElementById("bronx-hover-map");
    let brooklyn = document.getElementById("brooklyn-hover-map");
    let queens = document.getElementById('queens-hover-map');
    let manhattan = document.getElementById('manhattan-hover-map');
    let staten = document.getElementById('staten-hover-map');
    /*hide other boroughs divs*/
    brooklyn.style.visibility = 'hidden';
    queens.style.visibility = 'hidden';
    manhattan.style.visibility = 'hidden';
    staten.style.visibility = 'hidden';
    bronxMapData();


    // access dropdown and add a event listener to it
    var boroughDropdown = document.getElementById("boroughOption");
    boroughDropdown.addEventListener("change", changeBorough);


    //when you select a new borough, update the complaints
    function changeBorough() {
        // stop reading
        //myVoice.stop();

        //remove existing complaints
        for (let i = 0; i < 1000; i++) {
            //console.log("removing")
            var oldComplaint = document.getElementById("theComplaints")
            // document.body.removeChild(oldComplaint);
            oldComplaint.remove();
        }

        // change borough value
        var index = boroughDropdown.value;
        borough = boroughChoices[index];
        // console.log(borough)

        //get boroughs
        let bronx = document.getElementById("bronx-hover-map");
        let brooklyn = document.getElementById("brooklyn-hover-map");
        let queens = document.getElementById('queens-hover-map');
        let manhattan = document.getElementById('manhattan-hover-map');
        let staten = document.getElementById('staten-hover-map');

        //when borough changes, change style + map data
        if (borough === 'BRONX') {
            console.log('bronx')
            /*hide other boroughs divs*/
            brooklyn.style.visibility = 'hidden';
            queens.style.visibility = 'hidden';
            manhattan.style.visibility = 'hidden';
            staten.style.visibility = 'hidden';

            bronxMapData();
        } else if (borough === 'MANHATTAN') {
            console.log('manhattan');
            /*hide other boroughs divs*/
            bronx.style.visibility = 'hidden';
            brooklyn.style.visibility = 'hidden';
            queens.style.visibility = 'hidden';
            staten.style.visibility = 'hidden';

            manMapData();
        } else if (borough === 'BROOKLYN') {
            console.log('brookyln')

            /*hide other boroughs divs*/
            bronx.style.visibility = 'hidden';
            queens.style.visibility = 'hidden';
            manhattan.style.visibility = 'hidden';
            staten.style.visibility = 'hidden';

            brooklynMapData();
        } else if (borough === 'QUEENS') {
            console.log('queens')

            /*hide other boroughs divs*/
            bronx.style.visibility = 'hidden';
            brooklyn.style.visibility = 'hidden';
            manhattan.style.visibility = 'hidden';
            staten.style.visibility = 'hidden';

            queensMapData();
        } else if (borough === 'STATEN%20ISLAND') {
            console.log('staten island')

            /*hide other boroughs divs*/
            bronx.style.visibility = 'hidden';
            brooklyn.style.visibility = 'hidden';
            manhattan.style.visibility = 'hidden';
            queens.style.visibility = 'hidden';

            statenMapData();
        } else if (borough === 'BRONX') {
            console.log('bronx')
            /*hide other boroughs divs*/
            brooklyn.style.visibility = 'hidden';
            queens.style.visibility = 'hidden';
            manhattan.style.visibility = 'hidden';
            staten.style.visibility = 'hidden';
        }


        //add new complaints
        updateComplaints();
    }

    // load complaint data 
    function updateComplaints() {
        dataURL = complaintURL + borough + "&$$app_token=" + openDataToken;
        (d3.json(dataURL)).then(data => {
            // place raw data into object (we only want to use, date, agency, type, descriptor)
            const complaints = data;

            // for each complain, create string to print and add it to a concatinated string
            var totalComplaints = ""
            complaints.forEach(complaint => {
                var date = complaint.created_date;
                var agency = complaint.agency; // or agency_name
                var type = complaint.complaint_type;
                var descriptor = complaint.descriptor;
                // var sent = "On " + date + " a complaint was made to the " + agency + " regarding " + type + " - " + descriptor;
                var sent = agency + " received a complaint regarding " + type + " - " + descriptor + ".  ";
                //var sent = agency + ": " + type + " - " + descriptor + ".  ";
                //complaint.toPrint = sent;
                totalComplaints += sent + ".  ";

                // create a new paragraph for each complaint
                var complaintDiv = document.getElementById("complaintDiv")
                var newComplaint = document.createElement('p');
                newComplaint.innerHTML = sent;
                newComplaint.id = "theComplaints";
                if (agency === "DSNY") {
                    newComplaint.style.color = "black";
                }
                complaintDiv.appendChild(newComplaint)
            })

            //start reading
            //myVoice.speak(totalComplaints);

            // access paragraph element
            // var para = document.getElementById("paragraphComplaints");
            // para.innerHTML = paraComplaints;   
        })

    }

    // //get documents for dom
    // let complaintDiv = document.getElementById('complaintDiv');
    // let complaintNav = document.getElementById('complaintNav');
    // let injuryDiv = document.getElementById('injuryDiv');
    // let injuryNav = document.getElementById('injuryNav');
    // let mapImg = document.getElementById('map-img');

    /* SHOW BRONX INJURY DATA*/
    function bronxMapData() {
        //reshow the hover map
        let showBronx = document.getElementById("bronx-hover-map");
        showBronx.style.visibility = 'visible';

        // select backgrounds
        complaintDiv.style.backgroundColor = "#9FCFC6";
        complaintNav.style.backgroundColor = "#9FCFC6";
        injuryNav.style.backgroundColor = "#DEF1EF";
        injuryDiv.style.backgroundColor = "#DEF1EF";
        mapImg.src = "/assets/maps/191204_Bronx_Injuries_v1.png"

        //map stats
        let mapStats = document.getElementsByClassName('map-stats');
        let boroughMapStats = document.getElementById('borough-map-stats')

        //map sprain bronx
        let sprainBronx = document.getElementById('sprain-bronx');
        sprainBronx.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '62 Sprains'; })
        sprainBronx.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map cuts bronx
        let cutBronx = document.getElementById('cut-bronx');
        cutBronx.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '37 Cut, Laceration, Puncture'; })
        cutBronx.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map bruise bronx
        let bruiseBronx = document.getElementById('bruise-bronx');
        bruiseBronx.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '13 Contusion, Crushing, Bruising'; })
        bruiseBronx.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map scratch bronx
        let scratchBronx = document.getElementById('scratch-bronx');
        scratchBronx.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '1 Scratches, Superficial Wounds'; })
        scratchBronx.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map scratch bronx
        let foreignBronx = document.getElementById('foreign-bronx');
        foreignBronx.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '4 Foreign Body Injuries'; })
        foreignBronx.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map scratch bronx
        let fractureBronx = document.getElementById('fracture-bronx');
        fractureBronx.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '2 Fractures'; })
        fractureBronx.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map scratch bronx
        let multipleBronx = document.getElementById('multiple-bronx');
        multipleBronx.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '3 Multiple Injuries'; })
        multipleBronx.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })
    }

    /* SHOW BROOKLYN INJURY DATA*/
    function brooklynMapData() {
        //reshow the hover map
        let showBrooklyn = document.getElementById("brooklyn-hover-map");
        showBrooklyn.style.visibility = 'visible';

        //color
        complaintDiv.style.backgroundColor = "#D4DD8C";
        complaintNav.style.backgroundColor = "#D4DD8C";
        injuryNav.style.backgroundColor = "#EDF2D7";
        injuryDiv.style.backgroundColor = "#EDF2D7";
        mapImg.src = "/assets/maps/191204_Brooklyn_Injuries_v1.png"

        //map stats
        let boroughMapStats = document.getElementById('borough-map-stats')

        //map sprain bronx
        let sprainBrooklyn = document.getElementById('sprain-brooklyn');
        sprainBrooklyn.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '187 Sprains'; })
        sprainBrooklyn.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map cuts bronx
        let cutBrookyln = document.getElementById('cut-brooklyn');
        cutBrookyln.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '37 Cut, Laceration, Puncture'; })
        cutBrookyln.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map bruise bronx
        let bruiseBrookyln = document.getElementById('bruise-brooklyn');
        bruiseBrookyln.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '13 Contusion, Crushing, Bruising'; })
        bruiseBrookyln.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map scratch bronx
        let scratchBrookyln = document.getElementById('scratch-brooklyn');
        scratchBrookyln.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '6 Scratches, Superficial Wounds'; })
        scratchBrookyln.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map scratch bronx
        let foreignBrookyln = document.getElementById('foreign-brooklyn');
        foreignBrookyln.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '5 Foreign Body Injuries'; })
        foreignBrookyln.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map scratch bronx
        let fractureBrookyln = document.getElementById('fracture-brooklyn');
        fractureBrookyln.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '5 Fractures'; })
        fractureBrookyln.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map scratch bronx
        let multipleBrookyln = document.getElementById('multiple-brooklyn');
        multipleBrookyln.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '5 Multiple Injuries'; })
        multipleBrookyln.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })
    }

    /* SHOW QUEENS INJURY DATA*/
    function queensMapData() {
        //reshow the hover map
        let showQueens = document.getElementById("queens-hover-map");
        showQueens.style.visibility = 'visible';

        // select backgrounds
        complaintDiv.style.backgroundColor = "#E7DB75";
        complaintNav.style.backgroundColor = "#E7DB75";
        injuryNav.style.backgroundColor = "#F2F1D9";
        injuryDiv.style.backgroundColor = "#F2F1D9";
        mapImg.src = "/assets/maps/191204_Queen_Injuries_v2.png"

        //map stats
        let mapStats = document.getElementsByClassName('map-stats');
        let boroughMapStats = document.getElementById('borough-map-stats')

        //map sprain
        let sprainQueens = document.getElementById('sprain-queens');
        sprainQueens.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '139 Sprains'; })
        sprainQueens.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map cut
        let cutQueens = document.getElementById('cut-queens');
        cutQueens.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '45 Cut, Laceration, Puncture'; })
        cutQueens.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map bruise
        let bruiseQueens = document.getElementById('bruise-queens');
        bruiseQueens.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '40 Contusion, Crushing, Bruising'; })
        bruiseQueens.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map scratch
        let scratchQueens = document.getElementById('scratch-queens');
        scratchQueens.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '3 Scratches, Superficial Wounds'; })
        scratchQueens.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map foreign
        let foreignQueens = document.getElementById('foreign-queens');
        foreignQueens.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '6 Foreign Body Injuries'; })
        foreignQueens.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map fracture
        let fractureQueens = document.getElementById('fracture-queens');
        fractureQueens.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '10 Fractures'; })
        fractureQueens.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map multiple
        let multipleQueens = document.getElementById('multiple-queens');
        multipleQueens.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '4 Multiple Injuries'; })
        multipleQueens.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })
    }

    /* SHOW MANHATTAN INJURY DATA*/
    function manMapData() {
        //reshow the hover map
        let showMan = document.getElementById("manhattan-hover-map");
        showMan.style.visibility = 'visible';

        // select backgrounds
        complaintDiv.style.backgroundColor = "#D4C0B4";
        complaintNav.style.backgroundColor = "#D4C0B4";
        injuryNav.style.backgroundColor = "#F1E9E4";
        injuryDiv.style.backgroundColor = "#F1E9E4";
        mapImg.src = "/assets/maps/191204_Manhanttan_Injuries_v1.png"

        //map stats
        let mapStats = document.getElementsByClassName('map-stats');
        let boroughMapStats = document.getElementById('borough-map-stats')

        //map sprain
        let sprainMan = document.getElementById('sprain-manhattan');
        sprainMan.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '83 Sprains'; })
        sprainMan.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map cut
        let cutMan = document.getElementById('cut-manhattan');
        cutMan.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '38 Cut, Laceration, Puncture'; })
        cutMan.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map bruise
        let bruiseMan = document.getElementById('bruise-manhattan');
        bruiseMan.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '31 Contusion, Crushing, Bruising'; })
        bruiseMan.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map scratch
        let scratchMan = document.getElementById('scratch-manhattan');
        scratchMan.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '3 Scratches, Superficial Wounds'; })
        scratchMan.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map foreign
        let foreignMan = document.getElementById('foreign-manhattan');
        foreignMan.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '7 Foreign Body Injuries'; })
        foreignMan.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map fracture
        let fractureMan = document.getElementById('fracture-manhattan');
        fractureMan.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '10 Fractures'; })
        fractureMan.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map multiple
        let multipleMan = document.getElementById('multiple-manhattan');
        multipleMan.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '4 Multiple Injuries'; })
        multipleMan.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })
    }

    /* SHOW STATEN ISLAND INJURY DATA*/
    function statenMapData() {
        //reshow the hover map
        let showStaten = document.getElementById("staten-hover-map");
        showStaten.style.visibility = 'visible';

        // select backgrounds
        complaintDiv.style.backgroundColor = "#D0B4C0";
        complaintNav.style.backgroundColor = "#D0B4C0";
        injuryNav.style.backgroundColor = "#E4D9DE";
        injuryDiv.style.backgroundColor = "#E4D9DE";
        mapImg.src = "/assets/maps/191204_StatenIsland_Injuries_v3.png"

        //map stats
        let mapStats = document.getElementsByClassName('map-stats');
        let boroughMapStats = document.getElementById('borough-map-stats')

        //map sprain
        let sprainStaten = document.getElementById('sprain-staten');
        sprainStaten.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '53 Sprains'; })
        sprainStaten.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map cut
        let cutStaten = document.getElementById('cut-staten');
        cutStaten.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '17 Cut, Laceration, Puncture'; })
        cutStaten.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map bruise
        let bruiseStaten = document.getElementById('bruise-staten');
        bruiseStaten.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '17 Contusion, Crushing, Bruising'; })
        bruiseStaten.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map scratch
        let scratchStaten = document.getElementById('scratch-staten');
        scratchStaten.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '1 Scratches, Superficial Wounds'; })
        scratchStaten.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map foreign
        let foreignStaten = document.getElementById('foreign-staten');
        foreignStaten.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '2 Foreign Body Injuries'; })
        foreignStaten.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map fracture
        let fractureStaten = document.getElementById('fracture-staten');
        fractureStaten.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '2 Fractures'; })
        fractureStaten.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })

        //map multiple
        let multipleStaten = document.getElementById('multiple-staten');
        multipleStaten.addEventListener('mouseover', () => { boroughMapStats.innerHTML = '2 Multiple Injuries'; })
        multipleStaten.addEventListener('mouseout', () => { boroughMapStats.innerHTML = ' '; })
    }
}




////////*  DUMPSTER SECTION  *//////////

        // // /*removing other boroughs divs*/
        // var divsToHide = document.getElementsByClassName("hover-bronx-div"); //divsToHide is an array
        // for (var i = 0; i < divsToHide.length; i++) {
        //     divsToHide[i].style.visibility = "hidden"; // or
        //     divsToHide[i].style.display = "none"; // depending on what you're doing
        // }


        // var divsToShow = document.getElementsByClassName("hover-bronx-div"); //divsToHide is an array
        // for (var i = 0; i < divsToShow.length; i++) {
        //     divsToShow[i].style.visibility = "visible"; // or
        //     divsToShow[i].style.display = "block"; // depending on what you're doing
        // }
        // // /*removing other boroughs divs*/
        // var divsToHide = document.getElementsByClassName("hover-brooklyn-div"); //divsToHide is an array
        // for (var i = 0; i < divsToHide.length; i++) {
        //     divsToHide[i].style.visibility = "hidden"; // or
        //     divsToHide[i].style.display = "none"; // depending on what you're doing
        // }



// function showStat(x) {
//     let mapStats = document.getElementsByClassName('map-stats');
//     mapStats.innerHTML = '62 Sprains';
//     console.log('show stat');
// }



    // function addDivs(){
    //     let divOverMap = document.getElementsByClassName('hover-map-container');
    //     divOverMap.style.visibility = 'visible';
    //     divOverMap.style.display = 'block';
    // }

    // function removeDivs(){
    //     let divOverMap = document.getElementsByClassName('hover-map-container');
    //     divOverMap.style.visibility = 'hidden';
    //     divOverMap.style.display = 'none';
    // }

        // var divsToHide = document.getElementsByClassName("hover-brooklyn-div'"); //divsToHide is an array
        // for (var i = 0; i < divsToHide.length; i++) {
        //     divsToHide[i].style.visibility = "hidden"; // or
        //     divsToHide[i].style.display = "none"; // depending on what you're doing
        // }

        //get documents for dom
        // let complaintDiv = document.getElementById('complaintDiv');
        // let complaintNav = document.getElementById('complaintNav');
        // let injuryDiv = document.getElementById('injuryDiv');
        // let injuryNav = document.getElementById('injuryNav');
