const   DF_COLOR = "#000000";
const   DF_CLEAR = "#ffffff";
const   DF_GRID = 16;
const   _MAP = {'erase':0, 'black':1, 'color':2, 'grayscale': 3, 'random': 4};

var Color = DF_COLOR;  // Color, default is black
var isDrawing = false; // Boolean indicating whether mouse is drawing
var condition = _MAP['black']; // int number indicating current mode

// =====================================
// Doc elements
// =====================================
/* Color Input */
const colorInput = document.getElementById("colorOption");

/* Buttons */
const black = document.getElementById("black");     // Default black
const graySc = document.getElementById("graySc");   // Gray Scale
const ranColor = document.getElementById("random"); // Random color
const erase = document.getElementById("erase");     // Eraser
const clear = document.getElementById("clear");     // Clear button

/* Size slider and its label */
const sizeLabel = document.getElementById("sizeLabel"); //Grid size label
      sizeLabel.innerHTML = `${DF_GRID} x ${DF_GRID}`;
const gridSize = document.getElementById("gridSize");   // Grid sizing
      gridSize.value = `${DF_GRID}`;

/* Canvas */
const canvas = document.getElementById("canvas");


// ============================================================================
// This funciton takes in the current array of cells in a canvas iterate through
// it and draw
// @param: arr - array of cells
// @return: none
// ============================================================================
function CanvasDrawer(arr) {
    for(var el of arr) {
        /* Draw on canvas as long as mouse is down. */
        el.onmousedown = (e) => { 
            isDrawing = true;
            Drawer(e);
        };
        el.onmouseover = (e) => {Drawer(e);};
        /* Stop drawing if mouse is up */
        el.onmouseup = () => {isDrawing = false;};
    }
}


// ============================================================================
// This function colors background when invoked, taking an event as paremeter
// in which its background would be colored.
// @param: an event
// @return: none
// ============================================================================
function Drawer(event) {
    if(isDrawing) {
        /* Go through conditions */
        switch(condition) {
            case _MAP['erase']:
                Color = DF_CLEAR;
                break;
            case _MAP['black']:
                Color = DF_COLOR;
                break;
            case _MAP['color']:
                Color = colorInput.value.toString(16).padStart(6, '0');
                break;
            case _MAP['grayscale']:
                let c = event.target.style.backgroundColor;
                Color = GrayScaleColor(c);
                break;
            case _MAP['random']:
            default:
                Color = "#" + Math.floor(Math.random()*16777215).toString(16);
        }
        /* Color the event's background */
        event.target.style.backgroundColor = Color;
    }
}

// ============================================================================
// This function takes in a string of rbg value and returns a color on the gray
// scale. If the param rgb is already on the grayscale, returns a darker color 
// or black. Else returns rgb(207,207,207).
// @param: value - a string
// @return: a string indicating rgb value
// ============================================================================
function GrayScaleColor(value) {
    let rgb = value.substring(4, value.length-1).replace(/ /g, '').split(',');
    /* If the grid is already on grayscale */
    if(rgb[0] == rgb[1] && rgb[0] == rgb[2]) {
        /* Return if the color is black */
        if(rgb[0] == 0)
            return value;
        /* Darken the grid and return */
        let ret = (rgb[0]-48)>0 ? (rgb[0]-48):0; 
        return `rgb(${ret}, ${ret}, ${ret})`;
    }
    return "rgb( 207, 207, 207)";
}

// ============================================================================
// This function creates a blank canvas, taking the number of grids per side
// as arguement.
// @param: num - interger value of a grid dimension
// @return: none
// ============================================================================
function CanvasConstructor(num) {
    /* Create and config a grid, with CSS attributes and dimension */
    let grid = CreateUtil('div', canvas, "grid"); 
    grid.setAttribute("id", "grid");
    grid.style.setProperty("--grid-dim", num);

    /* Iterate, create cell classes inside grid */
    for(var i=0; i<num*num; i++) {    
        let cell = CreateUtil('div', grid, "cell", 1);
        cell.style.backgroundColor = DF_CLEAR;
    }
    let arr = document.getElementsByClassName("cell");
    CanvasDrawer(arr);   /* Invoke drawer function */
}

// ============================================================================
// This function provides a generic template to create elements. Makes life
// easer for this programmer
// @param: a lot
// @return: a created element
// ============================================================================
function CreateUtil(type, parent, id_name, name_fl = 0) {
    let x = document.createElement(type);
    // If the element is unique, set id name, else class name
    if(name_fl == 0)
        x.id = id_name;
    else  x.className = id_name;
    // Append to parent element
    parent.appendChild(x);
    return x;
}

// ============================================================================
// Scripts
// ============================================================================
// On loaded, invoke CanvasConstructor
window.onload = () => {CanvasConstructor(DF_GRID);}; 

// This script prevents dragging
canvas.ondragstart = () => {return false;};

// On clicked, set current condition to what each button indicates
colorInput.onchange = () => {condition = _MAP['color'];};
ranColor.onclick = () => {condition = _MAP['random'];};
graySc.onclick = () => {condition = _MAP['grayscale'];};
black.onclick = () => {condition = _MAP['black'];};
erase.onclick = () => {condition = _MAP['erase'];};

// Once clicked, clear the entire canvas
clear.onclick = () => {    
    var arr = document.getElementsByClassName("cell");
    for(var el of arr)
        el.style.backgroundColor = DF_CLEAR;
}; 

// Remove current canvas and construct a new one with new size
gridSize.onchange = (e) => {
    let gr = document.getElementById("grid");
    gr.remove();
    CanvasConstructor(e.target.value); 
};

// Update the size info as the slide is sliding
gridSize.onmousemove = (e) => {
    sizeLabel.innerHTML = `${e.target.value} x ${e.target.value}`;
};