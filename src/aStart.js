// Function to calculate the Manhattan distance heuristic
const calculateDistance = (start, end) => {
  return Math.abs(start.x - end.x) + Math.abs(start.y - end.y)
}

const createNode = (x, y, parent, g, h) => {
  return { x, y, parent, g, h }
}

// Function to check if a position is valid (inside the map and not a solid block)
const isValid = (map, x, y) => {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length && map[y][x] !== 1
}

// Function to check if diagonal movement is valid
const isDiagonalValid = (map, currentNode, neighborX, neighborY) => {
  const dx = neighborX - currentNode.x
  const dy = neighborY - currentNode.y

  return isValid(map, neighborX, neighborY) &&
    isValid(map, currentNode.x + dx, currentNode.y) &&
    isValid(map, currentNode.x, currentNode.y + dy)
}

// Function to check if a node is in the list and return its index
const isInList = (list, node) => {
  return list.findIndex(n => n.x === node.x && n.y === node.y)
}

/**
 *
 * @param {import('./Maze').Tile[]} map
 * @param {import('./Maze').Tile} start
 * @param {import('./Maze').Tile} end
 * @returns {import('./Maze').Tile[]}
 */
export const findPath = (map, start, end) => {
  const openList = []
  const closedList = []
  const directions = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 }
  ]

  // Add the start node to the open list
  openList.push(createNode(start.x, start.y, null, 0, calculateDistance(start, end)))

  while (openList.length > 0) {
    // Find the node with the lowest f value in the open list
    let currentIdx = 0

    for (let i = 1; i < openList.length; i++) {
      if (openList[i].g + openList[i].h < openList[currentIdx].g + openList[currentIdx].h) {
        currentIdx = i
      }
    }

    const currentNode = openList[currentIdx]

    // Move the current node from the open list to the closed list
    openList.splice(currentIdx, 1)
    closedList.push(currentNode)

    // If the destination is reached, reconstruct the path and return it
    if (currentNode.x === end.x && currentNode.y === end.y) {
      const path = []
      let current = currentNode

      while (current !== null) {
        path.push({ x: current.x, y: current.y })
        current = current.parent
      }

      return path.reverse()
    }

    // Generate neighbors and calculate their g and h values
    for (const direction of directions) {
      const neighborX = currentNode.x + direction.x
      const neighborY = currentNode.y + direction.y

      if (direction.x !== 0 && direction.y !== 0) {
        // Diagonal movement
        if (!isDiagonalValid(map, currentNode, neighborX, neighborY)) {
          continue
        }
      } else {
        // Non-diagonal movement
        if (!isValid(map, neighborX, neighborY)) {
          continue
        }
      }

      const g = currentNode.g + (direction.x !== 0 && direction.y !== 0 ? 1.4 : 1)
      const h = calculateDistance({ x: neighborX, y: neighborY }, end)
      const neighbor = createNode(neighborX, neighborY, currentNode, g, h)

      // Check if the neighbor is in the closed list and ignore it
      if (isInList(closedList, neighbor) !== -1) {
        continue
      }

      const existingIdx = isInList(openList, neighbor)

      if (existingIdx !== -1) {
        // If the neighbor is already in the open list and the new g value is lower, update it
        if (openList[existingIdx].g > neighbor.g) {
          openList[existingIdx].g = neighbor.g
          openList[existingIdx].parent = currentNode
        }
      } else {
        // Add the neighbor to the open list
        openList.push(neighbor)
      }
    }
  }

  // No path found
  return null
}

// function findPath(map, start, end) {
//   const openList = [];
//   const closedList = [];
//   const directions = [
//     { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
//     { x: -1, y: 0 }, { x: 1, y: 0 },
//     { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }
//   ];

//   // Function to check if a position is valid (inside the map and not a solid block)
//   function isValid(x, y) {
//     return x >= 0 && x < map[0].length && y >= 0 && y < map.length && map[y][x] !== 1;
//   }

//   // Function to check if a node is in the list and return its index
//   function isInList(list, node) {
//     return list.findIndex(n => n.x === node.x && n.y === node.y);
//   }

//   // Add the start node to the open list
//   openList.push(createNode(start.x, start.y, null, 0, calculateDistance(start, end)));

//   while (openList.length > 0) {
//     // Find the node with the lowest f value in the open list
//     let currentIdx = 0;
//     for (let i = 1; i < openList.length; i++) {
//       if (openList[i].g + openList[i].h < openList[currentIdx].g + openList[currentIdx].h) {
//         currentIdx = i;
//       }
//     }

//     const currentNode = openList[currentIdx];

//     // Move the current node from the open list to the closed list
//     openList.splice(currentIdx, 1);
//     closedList.push(currentNode);

//     // If the destination is reached, reconstruct the path and return it
//     if (currentNode.x === end.x && currentNode.y === end.y) {
//       const path = [];
//       let current = currentNode;
//       while (current !== null) {
//         path.push({ x: current.x, y: current.y });
//         current = current.parent;
//       }
//       return path.reverse();
//     }

//     // Generate neighbors and calculate their g and h values
//     for (const direction of directions) {
//       const neighborX = currentNode.x + direction.x;
//       const neighborY = currentNode.y + direction.y;

//       if (!isValid(neighborX, neighborY)) continue;

//       const g = currentNode.g + (direction.x !== 0 && direction.y !== 0 ? 1.4 : 1);
//       const h = calculateDistance({ x: neighborX, y: neighborY }, end);
//       const neighbor = createNode(neighborX, neighborY, currentNode, g, h);

//       // Check if the neighbor is in the closed list and ignore it
//       if (isInList(closedList, neighbor) !== -1) continue;

//       const existingIdx = isInList(openList, neighbor);
//       if (existingIdx !== -1) {
//         // If the neighbor is already in the open list and the new g value is lower, update it
//         if (openList[existingIdx].g > neighbor.g) {
//           openList[existingIdx].g = neighbor.g;
//           openList[existingIdx].parent = currentNode;
//         }
//       } else {
//         // Add the neighbor to the open list
//         openList.push(neighbor);
//       }
//     }
//   }

//   // No path found
//   return null;
// }

// function astar(start, end, map) {
//   const dx = [1, 0, -1, 0, 1, 1, -1, -1];
//   const dy = [0, 1, 0, -1, 1, -1, 1, -1];

//   function isValid(x, y) {
//     return x >= 0 && y >= 0 && x < map.length && y < map[0].length;
//   }

//   function isSolid(x, y) {
//     return map[x][y] === 1;
//   }

//   function getDistance(x1, y1, x2, y2) {
//     return Math.abs(x1 - x2) + Math.abs(y1 - y2);
//   }

//   function heuristic(x, y) {
//     return getDistance(x, y, end[0], end[1]);
//   }

//   function reconstructPath(cameFrom, current) {
//     const path = [current];
//     while (cameFrom.has(current)) {
//       current = cameFrom.get(current);
//       path.push(current);
//     }
//     return path.reverse();
//   }

//   const openSet = new Map();
//   const closedSet = new Set();
//   const cameFrom = new Map();
//   const gScore = new Map();
//   const fScore = new Map();

//   gScore.set(start.join(), 0);
//   fScore.set(start.join(), heuristic(start[0], start[1]));
//   openSet.set(start.join(), fScore.get(start.join()));

//   while (openSet.size > 0) {
//     const currentKey = [...openSet.entries()].reduce((a, b) => (b[1] < a[1] ? b : a))[0];
//     const current = currentKey.split(',').map(Number);
//     if (current[0] === end[0] && current[1] === end[1]) {
//       return reconstructPath(cameFrom, current);
//     }

//     openSet.delete(currentKey);
//     closedSet.add(current.join());

//     for (let i = 0; i < 8; i++) {
//       const newX = current[0] + dx[i];
//       const newY = current[1] + dy[i];
//       if (isValid(newX, newY) && !isSolid(newX, newY) && !closedSet.has([newX, newY].join())) {
//         const tentativeGScore = gScore.get(current.join()) + getDistance(current[0], current[1], newX, newY);
//         const neighborKey = [newX, newY].join();

//         if (!openSet.has(neighborKey) || tentativeGScore < gScore.get(neighborKey)) {
//           cameFrom.set(neighborKey, current);
//           gScore.set(neighborKey, tentativeGScore);
//           fScore.set(neighborKey, tentativeGScore + heuristic(newX, newY));

//           if (!openSet.has(neighborKey)) {
//             openSet.set(neighborKey, fScore.get(neighborKey));
//           }
//         }
//       }
//     }
//   }

//   return null; // No path found
// }

// class Node {
//   constructor(x, y, parent = null, g = 0, h = 0) {
//     this.x = x;
//     this.y = y;
//     this.parent = parent;
//     this.g = g; // Cost from the starting point to this node
//     this.h = h; // Heuristic (estimated cost) from this node to the destination
//   }

//   // Total cost (f) of this node
//   get f() {
//     return this.g + this.h;
//   }
// }

// class PriorityQueue {
//   constructor() {
//     this.nodes = [];
//   }

//   enqueue(node) {
//     this.nodes.push(node);
//     this.nodes.sort((a, b) => a.f - b.f);
//   }

//   dequeue() {
//     return this.nodes.shift();
//   }

//   isEmpty() {
//     return this.nodes.length === 0;
//   }
// }

// function heuristic(a, b) {
//   // Euclidean distance heuristic (for diagonal movements)
//   return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
// }

// function isValid(x, y, map) {
//   return x >= 0 && x < map[0].length && y >= 0 && y < map.length && map[y][x] !== 1;
// }

// function getNeighbors(x, y, map, allowDiagonal) {
//   const neighbors = [];

//   // Possible movement directions
//   const directions = [
//     { dx: 0, dy: -1 }, // Up
//     { dx: 1, dy: 0 },  // Right
//     { dx: 0, dy: 1 },  // Down
//     { dx: -1, dy: 0 }, // Left
//   ];

//   if (allowDiagonal) {
//     // Diagonal directions (top-right, bottom-right, bottom-left, top-left)
//     directions.push(
//       { dx: 1, dy: -1 },
//       { dx: 1, dy: 1 },
//       { dx: -1, dy: 1 },
//       { dx: -1, dy: -1 }
//     );
//   }

//   for (const dir of directions) {
//     const newX = x + dir.dx;
//     const newY = y + dir.dy;

//     if (isValid(newX, newY, map)) {
//       neighbors.push({ x: newX, y: newY });
//     }
//   }

//   return neighbors;
// }

// function reconstructPath(node) {
//   const path = [];
//   let current = node;
//   while (current !== null) {
//     path.unshift({ x: current.x, y: current.y });
//     current = current.parent;
//   }
//   return path;
// }

// function aStar(start, end, map, allowDiagonal) {
//   const openSet = new PriorityQueue();
//   const closedSet = new Set();

//   const startNode = new Node(start.x, start.y);
//   const endNode = new Node(end.x, end.y);
//   openSet.enqueue(startNode);

//   while (!openSet.isEmpty()) {
//     const current = openSet.dequeue();

//     if (current.x === endNode.x && current.y === endNode.y) {
//       // Path found
//       return reconstructPath(current);
//     }

//     closedSet.add(`${current.x},${current.y}`);

//     const neighbors = getNeighbors(current.x, current.y, map, allowDiagonal);

//     for (const neighbor of neighbors) {
//       const neighborNode = new Node(neighbor.x, neighbor.y, current);

//       if (closedSet.has(`${neighbor.x},${neighbor.y}`)) {
//         // Ignore already evaluated nodes
//         continue;
//       }

//       const gScore = current.g + 1; // Distance between nodes is 1 in a 2D grid

//       if (!openSet.nodes.includes((node) => node.x === neighbor.x && node.y === neighbor.y)) {
//         // Discovered a new node
//         neighborNode.g = gScore;
//         neighborNode.h = heuristic(neighbor, endNode);
//         openSet.enqueue(neighborNode);
//       } else if (gScore < neighborNode.g) {
//         // Found a better path to the neighbor
//         neighborNode.g = gScore;
//         neighborNode.parent = current;
//       }
//     }
//   }

//   // Path not found
//   return null;
// }
