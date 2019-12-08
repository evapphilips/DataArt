// when the page first loads
window.addEventListener("load", init);
function init(){
    
    // initiate voice 
    // var myVoice = new p5.Speech(); // new P5.Speech object
    
    // store API info
    var complaintURL = "https://data.cityofnewyork.us/resource/erm2-nwe9.json?borough="
    var openDataToken = "" // * INSERT API TOKEN * //
    
    // variables
    var borough = "BROOKLYN" // set defailt borough to brooklyn
    var boroughChoices = ["MANHATTAN", "BROOKLYN", "QUEENS", "BRONX", "STATEN%20ISLAND"]

    // create API url
    var dataURL = complaintURL + borough + "&$$app_token=" + openDataToken;
    //console.log(dataURL)

    // show default complaints when the page loads
    updateComplaints()

    // access dropdown and add a event listener to it
    var boroughDropdown = document.getElementById("boroughOption");
    boroughDropdown.addEventListener("change", changeBorough);
    //when you select a new borough, update the complaints
    function changeBorough(){
        // stop reading
        //myVoice.stop();

        //remove existing complaints
        for(let i=0; i<1000; i++){
            //console.log("removing")
            var oldComplaint = document.getElementById("theComplaints")
            // document.body.removeChild(oldComplaint);
            oldComplaint.remove();
        }

        // change borough value
        var index = boroughDropdown.value;
        borough = boroughChoices[index];
        console.log(borough)

        //add new complaints
        updateComplaints();
        

    }
    

    // load complaint data 
    function updateComplaints(){
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
                if(agency === "DSNY"){
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
}
