let map = document.querySelector('.map')
let basemap =  document.querySelector('.basemap')
let centerButton =  document.querySelector('.centerbutton')

let openInfoBoxID = "";
let permaLink = "";

let mapInstance = panzoom(map, {
    maxzoom: 1,
    minZoom: 0.1,
    initialX: 0,
    initialY: 0,
    initialZoom: 0.5,
    transformOrigin: {x: 0.5, y: 0.5}
});


 window.onload = function(){
    console.log("loaded");
    setTimeout(checkForParameters, 10);
}

function center(){
    console.log("centering");

    var windowWidth = window.innerWidth;
    var imageWidth = basemap.getBoundingClientRect().width;
    var x = (windowWidth-imageWidth)/2;

    var windowHeight = window.innerHeight;
    var imageHeight = basemap.getBoundingClientRect().height;
    var y = (windowHeight-imageHeight)/2;

    mapInstance.smoothMoveTo(x, y);
}

function centerOn(el, id){
    //focus Element

    var x = mapInstance.getTransform().x;
    var windowWidth = window.innerWidth;
    var imageWidth = el.getBoundingClientRect().width;
    var left = el.getBoundingClientRect().left;
    var xdiff = (windowWidth-imageWidth)/2 - left;

    var y = mapInstance.getTransform().y;
    var windowHeight = window.innerHeight;
    var imageHeight = el.getBoundingClientRect().height;
    var top = el.getBoundingClientRect().top;
    var ydiff = (windowHeight-imageHeight)/2 - top;

    mapInstance.smoothMoveTo(x + xdiff, y + ydiff);

    //[TODO] display encounter data
    CloseInfoBox();
    OpenInfoBox(id);
}

function OpenInfoBox(id){
    console.log("opening infobox '" + id + "'");
    var infoBox = document.getElementById(id);
    infoBox.style.display = 'inline-block';
    openInfoBoxID = id;
    HideCenterButton();
    mapInstance.pause();
}

function CloseInfoBox(){
    if(openInfoBoxID === "") return;
    var infoBox = document.getElementById(openInfoBoxID);
    infoBox.style.display = 'none';
    openInfoBoxID = "";
    ShowCenterButton();
    mapInstance.resume();
}

function HideCenterButton(){
    centerButton.style.display = 'none';
}

function ShowCenterButton(){
    centerButton.style.display = 'inline-block';
}

function venture(path){
    window.open(path,"_self");
}

function checkForParameters(){
    var pl = document.getElementsByTagName("permalink");
    var plfound = false;
    if(pl && pl.length > 0){
        permaLink = pl[0].id;
        plfound = true;
    }

    var link = window.location.href;

    if(plfound){
        history.pushState({}, null, permaLink);
    }

    var partials = link.split('?');
    if(partials.length < 2){
        console.log("No parameters.");
        center();
        return;
    }
    var param = partials[1];
    var elem = document.getElementById(param + "marker");
    if(elem){
        centerOn(elem, param);
        return;
    }
    console.log("No Element with ID " + param + "marker found." );
        center();
}