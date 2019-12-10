let menuContainer;
let sideMenu;
let menuTri;
let menuTriDiv;
// let titleContainer;


function init() {
    //triangle div
    menuTri = document.getElementById('menu-triangle')
    menuTriDiv = document.getElementById('menu-triangle-div');

    //menu div
    menuContainer = document.getElementById("menu-container");
    menuContainer.addEventListener('click', () => {
        toggleMenu();
    });
}



function toggleMenu() {
    console.log('menu is clicked');
    // x.classList.toggle("animate");

    // let navbarHR = document.getElementById('navbar-hr');
    // let logoMap = document.getElementById('nav-logo-map');
    let menuContainer = document.getElementById('menu-container');
    let menuHome = document.getElementById('menu-home-div')

    //menuContainer.classList.toggle("animateNav");//sliding option if we want
    // navMenu.classList.toggle("animateHR");

    if (menuContainer.style.height === '73vh') {
        menuContainer.style.display = 'block';
        menuContainer.style.height = '14vh';
        menuHome.style.visibility = 'hidden';
        menuTri.setAttribute("class", "back-to-og-image");
        // document.body.style.backgroundColor = "#E9E9E9";
        // navbarHR.style.borderColor = 'black';
    } else {
        menuContainer.style.display = 'block';
        menuContainer.style.height = '73vh';
        menuHome.style.visibility = 'visible';
        menuTri.setAttribute("class", "rotated-image");
        // document.body.style.backgroundColor = "black";
        // navbarHR.style.borderColor = 'white';
    }
}


////LOAD////
window.addEventListener('load', init);



////* DUMPSTER *//////
// function toggleMenu() {
//     console.log('menu is clicked');
//     // x.classList.toggle("animate");

//     // let navbarHR = document.getElementById('navbar-hr');
//     // let logoMap = document.getElementById('nav-logo-map');
//     let menuContainer = document.getElementById('menu-container');
//     let menuHome = document.getElementById('menu-home-div')

//     //menuContainer.classList.toggle("animateNav");//sliding option if we want
//     // navMenu.classList.toggle("animateHR");

//     if (menuContainer.style.height === '70vh') {
//         menuContainer.style.display = 'block';
//         menuContainer.style.height = '14vh';
//         menuHome.style.visibility = 'hidden';
//         // document.body.style.backgroundColor = "#E9E9E9";
//         // navbarHR.style.borderColor = 'black';
//     } else {
//         menuContainer.style.display = 'block';
//         menuContainer.style.height = '70vh';
//         menuHome.style.visibility = 'visible';
//         // document.body.style.backgroundColor = "black";
//         // navbarHR.style.borderColor = 'white';
//     }
// }
