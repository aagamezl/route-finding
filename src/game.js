// Define the game map
// const gameMap = [
//   [0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0],
//   [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
//   [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
//   [1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1],
//   [0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
//   [0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
//   [1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1],
//   [1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
//   [0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
//   [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
//   [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
//   [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
//   [0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
//   [1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1],
//   [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1]
// ]

const mapWidth = 80;
const mapHeight = 60;
const tileSize = 24; // Size of each map tile in pixels
const startPoint = { x: 1, y: 1 };
const solidThreshold = 0.5; // Adjust this value to control the amount of solid blocks
// const noise = perlinNoise(); // Adjust this value to control the variation of the map
const noise = 0.99 // Adjust this value to control the variation of the map

// const gameMap = generateMap({ width: mapWidth, height: mapHeight, solidThreshold, noise });
// const gameMap = generateMaze({ rows: mapHeight, columns: mapWidth, tileSize, startPoint });
const gameMap = generateRandomMaze({ rows: mapHeight, columns: mapWidth, startPoint });

// const gameMap = generateRandomMap({
//   width: mapWidth,      // Width of the map in tiles
//   height: mapHeight,     // Height of the map in tiles
//   tileSize: tileSize,    // Size of each tile in pixels (assuming tiles are square)
// });

// const gameMap = [
//   [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
//   [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1],
//   [0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0],
//   [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1],
//   [0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0],
//   [1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
//   [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0],
//   [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0],
//   [0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0],
//   [0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
//   [1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
//   [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//   [0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1],
//   [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
//   [0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1]
// ];


// Define possible movements (including diagonals)
const movements = [
  { x: -1, y: -1 }, // Top-left
  { x: 0, y: -1 },  // Top
  { x: 1, y: -1 },  // Top-right
  { x: -1, y: 0 },  // Left
  { x: 1, y: 0 },   // Right
  { x: -1, y: 1 },  // Bottom-left
  { x: 0, y: 1 },   // Bottom
  { x: 1, y: 1 },   // Bottom-right
];

// Define the character's starting position and destination
// let characterPosition = { x: 0, y: 0 };
let characterPosition = startPoint;
let destinationPoint = { x: 4, y: 4 };

// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size based on the map size
canvas.width = gameMap[0].length * tileSize;
canvas.height = gameMap.length * tileSize;

// Function to draw the game map
// function drawMap() {
//   for (let y = 0; y < gameMap.length; y++) {
//     for (let x = 0; x < gameMap[y].length; x++) {
//       ctx.fillStyle = gameMap[y][x] === 1 ? '#000' : '#fff';
//       ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
//     }
//   }

//   drawCharacter()
// }
function drawMap(canvas) {
  const ctx = canvas.getContext('2d');

  // Step 1: Draw the map tiles
  for (let y = 0; y < gameMap.length; y++) {
    for (let x = 0; x < gameMap[y].length; x++) {
      drawTile(x, y, gameMap[y][x] === 1 ? '#000' : '#fff');
      // drawTile(x, y, objectTypes[gameMap[y][x]].color);
    }
  }

  drawCharacter();
}

function drawTile(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

function showGrid(canvas, { color, lineWidth, tileSize }) {
  const gridCanvas = document.createElement('canvas')
  const ctx = gridCanvas.getContext('2d');
  const clienRect = canvas.getBoundingClientRect()

  gridCanvas.id = 'grid-canvas'
  gridCanvas.style.position = 'absolute';
  gridCanvas.width = canvas.width
  gridCanvas.height = canvas.height
  gridCanvas.style.left = `${clienRect.left}px`
  gridCanvas.style.top = `${clienRect.top}px`
  gridCanvas.addEventListener('click', getMapPositionHandler)

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  // Draw vertical grid lines
  for (let x = 0; x <= canvas.width; x += tileSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Draw horizontal grid lines
  for (let y = 0; y <= canvas.height; y += tileSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  document.body.appendChild(gridCanvas)
}

function hideGrid(canvas) {
  document.querySelector('#grid-canvas').remove()
  // const ctx = canvas.getContext('2d');
  // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  // ctx.putImageData(imageData, 0, 0); // Redraw the original image data (without the grid)
}

// Function to calculate the Manhattan distance heuristic
function heuristic(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

// Function to find the path using the A* algorithm
function findPathAStar(start, end, map) {
  const openList = [start];
  const closedList = [];
  const gScore = { [`${start.x},${start.y}`]: 0 };
  const fScore = { [`${start.x},${start.y}`]: heuristic(start.x, start.y, end.x, end.y) };

  while (openList.length > 0) {
    // Find the node with the lowest fScore in the openList
    let current = openList[0];
    let currentIndex = 0;
    for (let i = 1; i < openList.length; i++) {
      const node = openList[i];
      const nodeFScore = fScore[`${node.x},${node.y}`];
      if (nodeFScore < fScore[`${current.x},${current.y}`]) {
        current = node;
        currentIndex = i;
      }
    }

    // Move the current node from open to closed
    openList.splice(currentIndex, 1);
    closedList.push(current);

    // If the current node is the end, reconstruct and return the path
    if (current.x === end.x && current.y === end.y) {
      const path = [];
      let backtrackNode = current;
      while (backtrackNode) {
        path.push({ x: backtrackNode.x, y: backtrackNode.y });
        backtrackNode = backtrackNode.parent;
      }
      return path.reverse();
    }

    // Generate neighbors for the current node
    for (const move of movements) {
      const neighborX = current.x + move.x;
      const neighborY = current.y + move.y;

      // Check if the neighbor is valid (within bounds and not a solid block)
      if (
        neighborX >= 0 &&
        neighborY >= 0 &&
        neighborX < map[0].length &&
        neighborY < map.length &&
        map[neighborY][neighborX] === 0
        // [0, 1, 7, 8, 11].includes(map[neighborY][neighborX])
      ) {
        const neighbor = { x: neighborX, y: neighborY };
        const tentativeGScore = gScore[`${current.x},${current.y}`] + 1;

        // Check if this path to the neighbor is better than any previous one
        if (
          !gScore.hasOwnProperty(`${neighbor.x},${neighbor.y}`) ||
          tentativeGScore < gScore[`${neighbor.x},${neighbor.y}`]
        ) {
          // Adopt this node as the best path so far
          neighbor.parent = current;
          gScore[`${neighbor.x},${neighbor.y}`] = tentativeGScore;
          fScore[`${neighbor.x},${neighbor.y}`] =
            gScore[`${neighbor.x},${neighbor.y}`] + heuristic(neighbor.x, neighbor.y, end.x, end.y);

          if (!openList.includes(neighbor)) {
            openList.push(neighbor);
          }
        }
      }
    }
  }

  // If no path is found, return an empty array
  return [];
}

function animateCharacterMovement(path) {
  const moveSpeed = 30; // Adjust the speed of movement here (lower value for slower movement)
  let currentStep = 0;
  let startTime = null;

  function animate(timestamp) {
    if (!startTime) {
      startTime = timestamp
    };
    
    const elapsedTime = timestamp - startTime;

    const totalSteps = path.length - 1;
    const progress = Math.min(1, elapsedTime / moveSpeed);

    const fromTile = path[currentStep];
    const toTile = path[currentStep + 1];

    const xDiff = toTile.x - fromTile.x;
    const yDiff = toTile.y - fromTile.y;

    characterPosition.x = fromTile.x + xDiff * progress;
    characterPosition.y = fromTile.y + yDiff * progress;

    drawMap(canvas);
    ctx.fillStyle = '#f00';
    ctx.fillRect(characterPosition.x * tileSize, characterPosition.y * tileSize, tileSize, tileSize);

    if (progress >= 1) {
      currentStep++;
      startTime = null;
    }

    if (currentStep < totalSteps) {
      requestAnimationFrame(animate);
    }
  }

  animate(performance.now());
}

function drawCharacter() {
  ctx.fillStyle = '#f00';
  ctx.fillRect(characterPosition.x * tileSize, characterPosition.y * tileSize, tileSize, tileSize);
}

// Draw the initial map
drawMap(canvas);

const getMapPositionHandler = (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const mapX = Math.floor(mouseX / tileSize);
  const mapY = Math.floor(mouseY / tileSize);

  destinationPoint = { x: mapX, y: mapY };

  const path = findPath(gameMap, characterPosition, destinationPoint);

  if (path) {
    document.querySelector('.path-structure').innerHTML = JSON.stringify(path, null, 2)

    animateCharacterMovement(path);
  } else {
    console.log('No path found!');
  }
}

// Handle user interaction
canvas.addEventListener('click', getMapPositionHandler);

document.querySelector('#gridControl').addEventListener('click', (event) => {
  if (event.target.checked) {
    showGrid(canvas, {
      color: '#ccc', // Grid color
      lineWidth: 1, // Grid line width
      tileSize
    })

    return
  }

  hideGrid(canvas)
})

// const randomMap = generateRandomMap({
//   width: mapWidth,      // Width of the map in tiles
//   height: mapHeight,     // Height of the map in tiles
//   tileSize: tileSize,    // Size of each tile in pixels (assuming tiles are square)
// });

// console.log(randomMap);
