/**
 * Represents a node for pathfinding algorithms.
 * @typedef {Object} Node
 * @property {number} x - The x-coordinate of the node.
 * @property {number} y - The y-coordinate of the node.
 * @property {import('./Maze').Tile|null} parent - The parent node in the path, or null for the start node.
 * @property {number} g - The cost of the path from the start node to this node.
 * @property {number} h - The estimated heuristic cost from this node to the goal.
 */

/**
 * Function to calculate the Manhattan distance heuristic
 *
 * @param {import('./Maze').Tile} start
 * @param {import('./Maze').Tile} end
 * @returns {number}
 */
const calculateDistance = (start, end) => {
  return Math.abs(start.x - end.x) + Math.abs(start.y - end.y)
}

/**
 *
 * @param {number} x - The x-coordinate of the node.
 * @param {number} y - The y-coordinate of the node.
 * @param {import('./Maze').Tile} parent - The parent node in the path, or null for the start node.
 * @param {number} g - The cost of the path from the start node to this node.
 * @param {number} h - The estimated heuristic cost from this node to the goal.
 * @returns {Node}
 */
const createNode = (x, y, parent, g, h) => {
  return { x, y, parent, g, h }
}

/**
 * Function to check if a position is valid (inside the map and not a solid block)
 *
 * @param {import('./Maze').Tile[][]} map
 * @param {number} x
 * @param {number} y
 * @returns {boolean}
 */
const isValid = (map, x, y) => {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length && map[y][x] !== 1
}

/**
 * Function to check if diagonal movement is valid
 *
 * @param {import('./Maze').Tile[][]} map
 * @param {import('./Maze').Tile} currentNode
 * @param {number} neighborX
 * @param {number} neighborY
 * @returns {boolean}
 */
const isDiagonalValid = (map, currentNode, neighborX, neighborY) => {
  const dx = neighborX - currentNode.x
  const dy = neighborY - currentNode.y

  return isValid(map, neighborX, neighborY) &&
    isValid(map, currentNode.x + dx, currentNode.y) &&
    isValid(map, currentNode.x, currentNode.y + dy)
}

/**
 * Function to check if a node is in the list and return its index
 *
 * @param {import('./Maze').Tile[]} list
 * @param {import('./Maze').Tile} node
 * @returns {number}
 */
const isInList = (list, node) => {
  return list.findIndex(n => n.x === node.x && n.y === node.y)
}

/**
 *
 * @param {import('./Maze').Tile[][]} map
 * @param {import('./Maze').Tile} start
 * @param {import('./Maze').Tile} end
 * @returns {import('./Maze').Tile[]}
 */
export const findPath = (map, start, end) => {
  /** @type {Node[]} */
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

      // TODO: choose a better name for the function isInList
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
