
let numGrid = 16;
// ============================================================================
// This is the sketch section
// ============================================================================
/* Get canvas div from document */
const container = document.getElementById("canvas");
container.setAttribute("id", "canvas");

    // ====================================================
    /* Create a 16x16 grid and appends it to canvas div */
    const grid = document.createElement('div');
    /* Uses the attribues from .css */
    grid.setAttribute("id", "grid");

    /* Set number of rows and collumns */
    grid.style.setProperty("--grid-rows", numGrid);
    grid.style.setProperty("--grid-cols", numGrid);
    /* Appends to canvas */
    container.appendChild(grid);

        // ====================================================
        /* Create cell classes inside grid. The number of cells is 16*16 */
        for(var i=0; i<numGrid*numGrid; i++) {
            let cell = document.createElement('div');
            grid.appendChild(cell).className = "cell";
        } 

// ============================================================================
// This is the button section
// ============================================================================
/* Get the options div from document */
const opt = document.getElementById("options");
//opt.style.display = "flex";
opt.style.flexDirection = "column";

    // ====================================================
    /* Create clear button, when pressed, clears the sketch pad */
    const clr = document.createElement('button');
    clr.innerText = "clear";
    opt.appendChild(clr);

    // ====================================================
    /* Create color input element */
    const clrDiv = document.createElement('div');
    opt.appendChild(clrDiv);
        /* Color chart */
        const inp = document.createElement('input');
        inp.type = "color";
        inp.name = inp.id = ".color";

        /* Label for color chart */
        const inLabel = document.createElement('label');
        inLabel.for = ".color";
        inLabel.innerHTML = "color";

        /* Appends to options div */
        clrDiv.appendChild(inp);
        clrDiv.appendChild(inLabel);

    // ====================================================
    /* Random color button */
    const ranColor = document.createElement('button');
    ranColor.innerText = "random";
    opt.appendChild(ranColor);


// ============================================================================
var arr = document.getElementsByClassName("cell");

/* Default color */
for(var el of arr) {
    el.addEventListener("mousedown", function(event) {
        event.target.style.backgroundColor = "#000000";
    })
}
/* Action to be performed if "clear" is pressed */
clr.addEventListener("click", function() {
    for(var el of arr)
        el.style.backgroundColor = "#ffffff";
});
/* Action to be performed if "random" is pressed */
ranColor.addEventListener("click", function() {
    for(var el of arr) {
        el.addEventListener("mousedown", function(event) {
            var Color = Math.floor(Math.random()*16777215).toString(16);
            event.target.style.backgroundColor = "#" + Color;
        })
    }
});
/* Action to be performed if user chooses a color */
inp.addEventListener("click", function() {
    try {
        inp.showPicker();
        var Color = inp.value.toString(16).padStart(6, '0');
    } catch(error) {
        window.alert(error);
    }
    for(var el of arr) {
      /*  el.addEventListener("mousedown", function(event) {
            event.target.style.backgroundColor = Color;
        }) */
        el.on('mousedown mouseup', function mouseState(event) {
            if (event.type == "mousedown") {
                //code triggers on hold
                event.target.style.backgroundColor = Color;
            }
        });
    }
});
