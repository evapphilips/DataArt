document.addEventListener('load', init);

function init() {

}

function openMenu(x) {
    console.log('menu is clicked');
    x.classList.toggle("animate");

    let navbarHR = document.getElementById('navbar-hr');
    let logoMap = document.getElementById('nav-logo-map');
    let navMenu = document.getElementById('nav-menu');
    let map = document.getElementById('map');

    let mapContainer = document.getElementById("map-container");
    let filterContainer = document.getElementById("filter-container");


    navMenu.classList.toggle("animateNav");//sliding option if we want
    navMenu.classList.toggle("animateHR");

    if (navMenu.style.display === 'block') {
        navMenu.style.display = 'none';
        document.body.style.backgroundColor = "#E9E9E9";
        navbarHR.style.borderColor = 'black';
        logoMap.src = 'assets/logo/trash_map_logo_black_2x.png';
        document.body.style.overflow = 'visible';
        filterContainer.style.visibility = 'visible';
        map.style.visibility = 'visible';
    } else {
        navMenu.style.display = 'block';
        document.body.style.backgroundColor = "black";
        navbarHR.style.borderColor = 'white';
        logoMap.src = 'assets/logo/trash_map_logo_white_2x.png';
        mapContainer.style.visibility = 'hidden';
        filterContainer.style.visibility = 'hidden';
        document.body.style.overflow = 'hidden';
        navMenu.style.overflow = 'hidden';
        map.style.visibility = 'hidden';
    }
}

function showDropdown(){
    
}

