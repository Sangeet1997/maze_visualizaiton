let startSelected = false;
let endSelected = false;
let start = null;
let end = null;
let gridData = [];
let blockedCells = new Set();

const hw = 20;
const wd = 40;
generateGrid();



function waitFor(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateGrid() {
    logToTerminal("Generating grid...",'grey');
    const height = parseInt(hw);
    const width = parseInt(wd);
    
    const grid = document.getElementById("grid");
    grid.innerHTML = ""; 
    gridData = [];
    blockedCells.clear();
    start = null;
    end = null;
    startSelected = false;
    endSelected = false;
    
    if (height && width) {
        grid.style.gridTemplateRows = `repeat(${height}, 20px)`; 
        grid.style.gridTemplateColumns = `repeat(${width}, 20px)`; 
        
        for (let i = 0; i < height * width; i++) {
            await waitFor(3);
            let x = Math.floor(Math.random() * 100) % 3;
            const gridItem = document.createElement("div");
            gridItem.setAttribute('data-index', i);
            
            if (x == 1) {
                gridItem.classList.add("blocked-item");
                blockedCells.add(i);
            } else {
                gridItem.classList.add("grid-item");
                gridItem.addEventListener('click', () => selectPoint(gridItem));
            }
            
            grid.appendChild(gridItem);
            gridData.push(gridItem);
        }
    } else {
        alert("Please enter both height and width.");
    }
    logToTerminal("Grid generated.",'grey');
    // logToTerminal("-----");

}

function selectPoint(item) {
    console.log("Selected point", item);
    const index = parseInt(item.getAttribute('data-index'));
    if (!startSelected) {
        logToTerminal("Selected start point","grey");
        item.classList.add('start');
        start = index;
        startSelected = true;
    } else if (!endSelected && index !== start) {
        logToTerminal("Selected end point","grey");
        item.classList.add('end');
        end = index;
        endSelected = true;
    }
}

async function startBFS() {
    if (start == null || end == null) {
        logToTerminal("Please select start and end points.",'red');
        // alert('Please select start and end points.');

        return;
    }
    logToTerminal("-----");
    logToTerminal("Starting BFS...","green");

    const width = wd;
    const height = hw;

    let queue = [[start]];
    let visited = new Set([start]);
    let totalVisitedNodes = 0;

    while (queue.length > 0) {
        let path = queue.shift();
        let current = path[path.length - 1];

        if (current === end) {
            logToTerminal("End point found!");
            logToTerminal("tracing path...")
            let pathlength = path.length;
            
            for (let idx of path) {
                gridData[idx].classList.add('path');
                await waitFor(50);  
            }
            await logToTerminal("Total visited nodes  :  " + totalVisitedNodes);
            await logToTerminal("Path length  :  " + pathlength);
            await logToTerminal("BFS completed.",'green');
            await logToTerminal("-----");


            return;
        }

        let neighbors = getNeighbors(current, width, height);

        for (let neighbor of neighbors) {
            if (!blockedCells.has(neighbor) && !visited.has(neighbor)) {
                totalVisitedNodes++;
                visited.add(neighbor);
                gridData[neighbor].classList.add('visited');
                await waitFor(30);  
                queue.push([...path, neighbor]);
            }
        }
    }

    await logToTerminal("No path found.",'red');
    await logToTerminal("-----");
    // alert('No path found');

}

async function startDFS() {
    if (start == null || end == null) {
        logToTerminal("Please select start and end points.",'red');
        // alert('Please select start and end points.');
        return;
    }

    const width = wd;
    const height = hw;

    let stack = [[start]]; 
    let visited = new Set([start]);
    logToTerminal("-----");
    logToTerminal("Starting DFS...",'green');

    let totalVisitedNodes = 0;


    while (stack.length > 0) {
        let path = stack.pop();  
        let current = path[path.length - 1];

        if (current === end) {
            logToTerminal("End point found!");
            logToTerminal("tracing path...");
            let pathlength = path.length;

            for (let idx of path) {
                gridData[idx].classList.add('pathdfs');
                await waitFor(50);
            }
            
            
            await logToTerminal("Total visited nodes  :  " + totalVisitedNodes);
            await logToTerminal("Path length  :  " + pathlength);
            await logToTerminal("DFS completed.",'green');
            await logToTerminal("-----");

            return;
        }

        let neighbors = getNeighbors(current, width, height);

        for (let neighbor of neighbors) {
            if (!blockedCells.has(neighbor) && !visited.has(neighbor)) {
                totalVisitedNodes++;
                visited.add(neighbor);
                gridData[neighbor].classList.add('visiteddfs');
                await waitFor(30);  
                stack.push([...path, neighbor]);
            }
        }
    }

    await logToTerminal("No path found.",'red');
    await logToTerminal("-----");
    // alert('No path found');
}

function getNeighbors(index, width, height) {
    const neighbors = [];
    const row = Math.floor(index / width);
    const col = index % width;

    if (row > 0) neighbors.push(index - width);
    if (row < height - 1) neighbors.push(index + width);
    if (col > 0) neighbors.push(index - 1);
    if (col < width - 1) neighbors.push(index + 1);

    return neighbors;
}

function logToTerminal(message, color = 'white') {
    const terminal = document.getElementById('terminal');
    const newLine = document.createElement('div');
    newLine.textContent = message;
    newLine.style.color = color;
    terminal.appendChild(newLine);
    terminal.scrollTop = terminal.scrollHeight;
}

