const grid = document.createElement('div');
    grid.style.height = "800px";
    grid.style.width = "800px";
    grid.style.backgroundColor = "blue";
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(16, 1fr)";
    grid.style.gridTemplateRows = "repeat(16, auto)";

const container = document.getElementById("canvas");
container.appendChild(grid);