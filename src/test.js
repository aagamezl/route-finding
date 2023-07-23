const canvas = document.getElementById('gameCanvas');

function generateRandomMap(config) {
  const { width, height, tileSize } = config;
  const mapWidth = Math.floor(width / tileSize);
  const mapHeight = Math.floor(height / tileSize);
  const map = [];

  // Initialize the map with empty space (grass or ground)
  for (let y = 0; y < mapHeight; y++) {
    map[y] = [];
    for (let x = 0; x < mapWidth; x++) {
      map[y][x] = 0;
    }
  }

  // Function to add objects to the map
  function addObjectToMap(type, size) {
    const objectWidth = Math.floor(size.width / tileSize);
    const objectHeight = Math.floor(size.height / tileSize);
    const startX = Math.floor(Math.random() * (mapWidth - objectWidth));
    const startY = Math.floor(Math.random() * (mapHeight - objectHeight));

    for (let y = 0; y < objectHeight; y++) {
      for (let x = 0; x < objectWidth; x++) {
        map[startY + y][startX + x] = type;
      }
    }
  }

  // Generate buildings
  const numBuildings = Math.floor(Math.random() * 5) + 1;
  for (let i = 0; i < numBuildings; i++) {
    const buildingWidth = (Math.floor(Math.random() * 3) + 2) * tileSize;
    const buildingHeight = (Math.floor(Math.random() * 3) + 2) * tileSize;
    addObjectToMap(1, { width: buildingWidth, height: buildingHeight });
  }

  // Generate lakes
  const numLakes = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < numLakes; i++) {
    const lakeWidth = (Math.floor(Math.random() * 5) + 3) * tileSize;
    const lakeHeight = (Math.floor(Math.random() * 5) + 3) * tileSize;
    addObjectToMap(2, { width: lakeWidth, height: lakeHeight });
  }

  // Generate trees
  const numTrees = Math.floor(Math.random() * 30) + 10;
  for (let i = 0; i < numTrees; i++) {
    const treeSize = Math.floor(Math.random() * 2) + 1;
    addObjectToMap(3, { width: treeSize * tileSize, height: treeSize * tileSize });
  }

  // Generate bridges
  const numBridges = Math.floor(Math.random() * 2) + 1;
  for (let i = 0; i < numBridges; i++) {
    const bridgeWidth = (Math.floor(Math.random() * 3) + 3) * tileSize;
    addObjectToMap(4, { width: bridgeWidth, height: tileSize });
  }

  return map;
}

// Example usage:
const config = {
  width: 800,
  height: 600,
  tileSize: 32,
};
const tileSize = 32; // Size of each map tile in pixels

const gameMap = generateRandomMap(config);

const objectTypes = {
  grass: 'white',
  1: 'brown',
  2: 'blue',
  3: 'green',
  4: 'gray'
}

function drawTile(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

function drawMap(canvas) {
  const ctx = canvas.getContext('2d');

  // Step 1: Draw the map tiles
  for (let y = 0; y < gameMap.length; y++) {
    for (let x = 0; x < gameMap[y].length; x++) {
      drawTile(ctx, x, y, objectTypes[gameMap[y][x]] ?? objectTypes['grass']);
      // drawTile(x, y, objectTypes[gameMap[y][x]].color);
    }
  }

  // drawCharacter();
}

drawMap(canvas)
