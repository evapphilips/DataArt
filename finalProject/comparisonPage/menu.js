let menuContainer;
let sideMenu;
// let titleContainer;


function init() {
    menuContainer = document.getElementById("menu-container");
    menuContainer.addEventListener('click', ()=>{
        toggleMenu();
    });
}



function toggleMenu() {
    console.log('menu is clicked');
    // x.classList.toggle("animate");

    // let navbarHR = document.getElementById('navbar-hr');
    // let logoMap = document.getElementById('nav-logo-map');
    let menuContainer = document.getElementById('menu-container');

    //menuContainer.classList.toggle("animateNav");//sliding option if we want
    // navMenu.classList.toggle("animateHR");

    if (menuContainer.style.height === '70vh') {
        menuContainer.style.display = 'block';
        menuContainer.style.height = '12vh';
        // document.body.style.backgroundColor = "#E9E9E9";
        // navbarHR.style.borderColor = 'black';
    } else {
        menuContainer.style.display = 'block';
        menuContainer.style.height = '70vh';
        // document.body.style.backgroundColor = "black";
        // navbarHR.style.borderColor = 'white';
    }
}


////LOAD////
window.addEventListener('load', init);