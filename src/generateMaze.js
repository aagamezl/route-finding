// function generateMaze(params) {
//   const { rows, columns, tileSize, start } = params;
//   const grid = Array.from({ length: rows }, () => Array(columns).fill(1));
//   const directions = [{ x: -2, y: 0 }, { x: 2, y: 0 }, { x: 0, y: -2 }, { x: 0, y: 2 }];

//   function carvePassage(x, y) {
//     grid[y][x] = 0; // Mark the current cell as a passage.

//     // Randomize the order of directions to visit neighbors in a random order.
//     const shuffledDirections = directions.sort(() => Math.random() - 0.5);

//     for (const { x: dx, y: dy } of shuffledDirections) {
//       const nextX = x + dx;
//       const nextY = y + dy;

//       if (nextX >= 0 && nextX < columns && nextY >= 0 && nextY < rows && grid[nextY][nextX] === 1) {
//         // Check if the neighbor cell is within bounds and unvisited.
//         const betweenX = x + dx / 2;
//         const betweenY = y + dy / 2;
//         grid[betweenY][betweenX] = 0; // Carve a passage between the current cell and the neighbor cell.
//         carvePassage(nextX, nextY); // Recursively visit the neighbor cell.
//       }
//     }
//   }

//   const startX = start.x - (start.x % 2 === 0 ? 1 : 0); // Ensure starting X is an odd number.
//   const startY = start.y - (start.y % 2 === 0 ? 1 : 0); // Ensure starting Y is an odd number.
//   carvePassage(startX, startY);

//   return grid;
// }

// function generateMaze(params) {
//   const { rows, columns, tileSize, startingPoint, backgroundColor, blockColor } = params;
//   const grid = Array.from({ length: rows }, () => Array(columns).fill(1));
//   const directions = [{ x: -2, y: 0 }, { x: 2, y: 0 }, { x: 0, y: -2 }, { x: 0, y: 2 }];

//   function carvePassage(x, y) {
//     grid[y][x] = 0; // Mark the current cell as a passage.

//     // Randomize the order of directions to visit neighbors in a random order.
//     const shuffledDirections = directions.sort(() => Math.random() - 0.5);

//     for (const { x: dx, y: dy } of shuffledDirections) {
//       const nextX = x + dx;
//       const nextY = y + dy;

//       if (nextX >= 0 && nextX < columns && nextY >= 0 && nextY < rows && grid[nextY][nextX] === 1) {
//         // Check if the neighbor cell is within bounds and unvisited.
//         const betweenX = x + dx / 2;
//         const betweenY = y + dy / 2;
//         grid[betweenY][betweenX] = 0; // Carve a passage between the current cell and the neighbor cell.
//         carvePassage(nextX, nextY); // Recursively visit the neighbor cell.
//       }
//     }
//   }

//   const startX = startingPoint.x - (startingPoint.x % 2 === 0 ? 1 : 0); // Ensure starting X is an odd number.
//   const startY = startingPoint.y - (startingPoint.y % 2 === 0 ? 1 : 0); // Ensure starting Y is an odd number.
//   carvePassage(startX, startY);

//   // Add random areas that allow diagonal movements
//   for (let i = 0; i < 10; i++) {
//     const randomX = Math.floor(Math.random() * (columns - 1));
//     const randomY = Math.floor(Math.random() * (rows - 1));
//     if (randomX % 2 === 0 && randomY % 2 === 0) {
//       grid[randomY][randomX] = 0;
//       grid[randomY + 1][randomX] = 0;
//       grid[randomY][randomX + 1] = 0;
//       grid[randomY + 1][randomX + 1] = 0;
//     }
//   }

//   return grid;
// }

function generateMaze({ rows, columns, tileSize, startPoint }) {
  // Function to shuffle an array randomly
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Function to check if a position is valid (inside the maze boundaries)
  function isValid(x, y) {
    return x >= 0 && x < columns && y >= 0 && y < rows;
  }

  // Initialize the maze grid with walls
  const maze = Array(rows).fill().map(() => Array(columns).fill(1));

  // Pick a random starting point
  const startRow = startPoint.y;
  const startColumn = startPoint.x;
  maze[startRow][startColumn] = 0;

  // Create a list of walls
  const walls = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      if (maze[y][x] === 0) {
        // Add all surrounding walls to the list
        const directions = [
          { x: -2, y: 0 }, { x: 2, y: 0 }, { x: 0, y: -2 }, { x: 0, y: 2 }
        ];
        for (const direction of directions) {
          const nextX = x + direction.x;
          const nextY = y + direction.y;
          if (isValid(nextX, nextY) && maze[nextY][nextX] === 1) {
            walls.push({ x: nextX, y: nextY });
          }
        }
      }
    }
  }

  // Carve passages and create open areas
  while (walls.length > 0) {
    shuffleArray(walls);
    const wall = walls.pop();
    const { x, y } = wall;
    if (maze[y][x] === 1) {
      maze[y][x] = 0;
      maze[y + Math.sign(startRow - y)][x + Math.sign(startColumn - x)] = 0;
      const directions = [
        { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }
      ];
      for (const direction of directions) {
        const nextX = x + direction.x;
        const nextY = y + direction.y;
        if (isValid(nextX, nextY) && maze[nextY][nextX] === 1) {
          maze[nextY][nextX] = 0;
          walls.push({ x: nextX, y: nextY });
        }
      }
    }
  }

  return maze;
}

// function generateRandomMaze(params) {
//   const { rows, columns, tileSize, startingPoint } = params;
//   const maze = Array.from({ length: rows }, () => Array.from({ length: columns }, () => 1));

//   function recursiveBacktracking(x, y) {
//     maze[y][x] = 0; // Set the current cell as open

//     const directions = [
//       { x: 2, y: 0 }, { x: 0, y: 2 },
//       { x: -2, y: 0 }, { x: 0, y: -2 }
//     ];

//     shuffleArray(directions); // Shuffle the directions to create randomness

//     for (const direction of directions) {
//       const newX = x + direction.x;
//       const newY = y + direction.y;

//       if (newX > 0 && newX < columns - 1 && newY > 0 && newY < rows - 1 && maze[newY][newX] === 1) {
//         maze[y + direction.y / 2][x + direction.x / 2] = 0; // Set the cell between the current and next cell as open
//         recursiveBacktracking(newX, newY);
//       }
//     }
//   }

//   function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//   }

//   recursiveBacktracking(startingPoint.x, startingPoint.y);

//   return maze;
// }

// function generateRandomMaze({ rows, columns, tileSize, startingPoint }) {
//   const map = new Array(rows).fill().map(() => new Array(columns).fill(1));

//   // Function to check if a position is valid (inside the map)
//   function isValid(x, y) {
//     return x >= 0 && x < columns && y >= 0 && y < rows;
//   }

//   // Randomly open some areas to allow diagonal movements
//   const openAreaCount = Math.floor(Math.random() * 4) + 1; // Random number from 1 to 4
//   for (let i = 0; i < openAreaCount; i++) {
//     const openAreaSize = Math.floor(Math.random() * 4) + 2; // Random number from 2 to 5
//     const startX = Math.floor(Math.random() * (columns - openAreaSize));
//     const startY = Math.floor(Math.random() * (rows - openAreaSize));

//     for (let y = startY; y < startY + openAreaSize; y++) {
//       for (let x = startX; x < startX + openAreaSize; x++) {
//         map[y][x] = 0;
//       }
//     }
//   }

//   // Set the start point
//   map[startingPoint.y][startingPoint.x] = 2; // Assuming value 2 represents the start point

//   return map;
// }

const generateRandomMaze = (params) => {
  const { rows, columns, startPoint } = params;

  // Create a 2D array to represent the maze
  let maze = new Array(rows).fill(null).map(() => new Array(columns).fill(1));

  function isValid(x, y) {
    return x >= 0 && x < columns && y >= 0 && y < rows;
  }

  function carvePath(x, y) {
    maze[y][x] = 0;

    // Shuffle the directions array randomly
    const directions = [{ x: 0, y: -2 }, { x: 0, y: 2 }, { x: -2, y: 0 }, { x: 2, y: 0 }];
    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }

    for (const direction of directions) {
      const nx = x + direction.x;
      const ny = y + direction.y;

      if (isValid(nx, ny) && maze[ny][nx] === 1) {
        maze[y + direction.y / 2][x + direction.x / 2] = 0;
        carvePath(nx, ny);
      }
    }
  }

  // Start carving the maze from the specified starting point
  carvePath(startPoint.x, startPoint.y);

  return generateOpenAreas(maze, { rows, columns, openAreas: 400 })
}

const generateOpenAreas = (maze, { rows, columns, openAreas }) => {
  // Create some random open areas for diagonal movements
  for (let i = 0; i < openAreas; i++) {
    const x = Math.floor(Math.random() * (columns - 2)) + 1;
    const y = Math.floor(Math.random() * (rows - 2)) + 1;

    maze[y][x] = 0;
    maze[y][x + 1] = 0;
    maze[y + 1][x] = 0;
    maze[y + 1][x + 1] = 0;
  }

  return maze
}


// Draw the maze on the canvas
function drawMaze(maze, backgroundColor, blockColor) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      ctx.fillStyle = grid[y][x] === 1 ? blockColor : backgroundColor;
    }
  }
}
