/**
 * Represents a coordinate object with x and y values.
 * @typedef {Object} Tile
 * @property {number} x - The x-coordinate value.
 * @property {number} y - The y-coordinate value.
 */

/**
 * @typedef {Object} MazeConfig
 * @property {number} columns - The number of columns in the Maze grid.
 * @property {number} rows - The number of rows in the Maze grid.
 * @property {number} tileSize - The size of each map tile in pixels.
 * @property {number} openAreas - The number of open areas or paths in the Maze.
 */

/**
 * @typedef {Object} TileInfo
 * @property {number} x - The x-coordinate of the tile in grid units.
 * @property {number} y - The y-coordinate of the tile in grid units.
 * @property {string} color - The color of the tile represented as a CSS-style string.
 * @property {number} tileSize - The size of each tile in pixels.
 */

/**
 * @typedef {Object} OpenAreasOptions
 * @property {number} rows - The number of rows in the maze.
 * @property {number} columns - The number of columns in the maze.
 * @property {number} openAreas - The number of open areas to generate.
 */

export class Maze {
  /**
   * @type {number}
   * @private
  **/
  #columns = 0

  /**
   * @type {import('./Maze').Tile[][]}
   * @private
   * */
  #map = []

  /**
   * @type {number}
   * @private
   **/
  #openAreas = 0

  /**
   * @type {number}
   * @private
   **/
  #rows = 0

  /**
   * @type {number}
   * @private
   **/
  #tileSize = 0

  /**
   * Represents a Maze with specific characteristics.
   *
   * @constructor
   * @param {MazeConfig} config - The options to configure the Maze.
   * @param {number} config.columns - The number of columns in the Maze grid.
   * @param {number} config.rows - The number of rows in the Maze grid.
   * @param {number} config.tileSize - The size of each map tile in pixels.
   * @param {number} config.openAreas - The number of open areas or paths in the Maze.
   */
  constructor ({ columns, rows, tileSize, openAreas }) {
    this.#columns = columns
    this.#rows = rows
    this.#tileSize = tileSize
    this.#openAreas = openAreas

    this.#map = this.generate()
  }

  /**
   * Draws the maze on the specified canvas using the 2D rendering context.
   *
   * @public
   * @param {HTMLCanvasElement} canvas - The canvas element to draw the maze on.
   *
   * @example
   * const canvas = document.getElementById('mazeCanvas')
   * const mazeGenerator = new Maze()
   * const maze = mazeGenerator.generate({ rows: 20, columns: 20, startPoint: { x: 0, y: 0 } })
   * maze.draw(canvas)
   *
   * @throws {TypeError} Throws a TypeError if the 'canvas' parameter is not an HTMLCanvasElement.
   */
  draw (canvas) {
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Step 1: Draw the map tiles
    for (let y = 0; y < this.#map.length; y++) {
      for (let x = 0; x < this.#map[y].length; x++) {
        this.#drawTile(
          ctx,
          {
            x,
            y,
            color: this.#map[y][x] === 1 ? '#000' : '#fff',
            tileSize: this.#tileSize
          }
        )
      }
    }
  }

  /**
   * Finds a free position within the provided map grid.
   *
   * @public
   * @param {Tile[][]} map - The map grid in which to find a free position.
   * @param {number} [initialX=0] - The initial x-coordinate to start searching from.
   * @param {number} [initialY=0] - The initial y-coordinate to start searching from.
   * @returns {Tile|null} The coordinates of a free position, or null if none is found.
   */
  findFreePosition (map, initialX = 0, initialY = 0) {
    for (let y = initialY; y < map.length; y++) {
      for (let x = initialX; x < map[y].length; x++) {
        if (map[y][x] === 0) {
          return { x, y }
        }
      }
    }

    return null // No free position found
  }

  /**
   * Generates a maze based on the specified configuration.
   *
   * @public
   * @returns {Tile[][]} Returns a 2D array representing the generated maze, where 0 represents paths and 1 represents walls.
   */
  generate () {
    // Create a 2D array to represent the maze
    this.#map = new Array(this.#rows).fill(null).map(() => new Array(this.#columns).fill(1))

    // Choose a random starting point on the top or bottom row
    const startPoint = {
      x: Math.floor(Math.random() * this.#columns),
      y: Math.random() < 0.5 ? 0 : this.#rows - 1
    }

    // Start carving the maze from the specified starting point
    this.#carvePath(startPoint.x, startPoint.y)

    return this.#generateOpenAreas(this.#map, {
      rows: this.#rows,
      columns: this.#columns,
      openAreas: this.#openAreas
    })
  }

  /**
   * Gets the number of columns in the maze.
   *
   * @public
   * @returns {number} The number of columns.
   */
  getColumns () {
    return this.#columns
  }

  /**
   * Gets the map grid of the maze.
   *
   * @public
   * @returns {Tile[][]} The 2D array representing the map grid.
   */
  getMap () {
    return this.#map
  }

  /**
   * Gets the number of rows in the maze.
   *
   * @public
   * @returns {number} The number of rows.
   */
  getRows () {
    return this.#rows
  }

  /**
   * Gets the size of each tile in the maze.
   *
   * @public
   * @returns {number} The size of each tile in pixels.
   */
  getTileSize () {
    return this.#tileSize
  }

  /**
   * Sets the map grid of the maze.
   *
   * @public
   * @param {number} columns - The number of columns in the Maze grid.
   */
  setColumns (columns) {
    this.#columns = columns
  }

  /**
   * Sets the map grid of the maze.
   *
   * @public
   * @param {Tile[][]} map - The new map grid to set.
   */
  setMap (map) {
    this.#map = map
  }

  /**
   * Sets the map grid of the maze.
   *
   * @public
   * @param {number} openAreas - The number of open areas or paths in the Maze.
   */
  setOpenAreas (openAreas) {
    this.#openAreas = openAreas
  }

  /**
   * Sets the map grid of the maze.
   *
   * @public
   * @param {number} rows - The number of rows in the Maze grid.
   */
  setRows (rows) {
    this.#rows = rows
  }

  /**
   * The size of each map tile in pixels.
   *
   * @public
   * @param {tileSize} number - The size of each map tile in pixels.
   */
  setTileSize (tileSize) {
    this.#tileSize = tileSize
  }

  /**
   * Carves a path in the Maze starting from the given coordinates (x, y) using recursive backtracking.
   *
   * @private
   * @param {number} x - The x-coordinate to start carving the path from.
   * @param {number} y - The y-coordinate to start carving the path from.
   */
  #carvePath (x, y) {
    this.#map[y][x] = 0

    // Shuffle the directions array randomly
    const directions = [
      { x: 0, y: -2 },
      { x: 0, y: 2 },
      { x: -2, y: 0 },
      { x: 2, y: 0 }
    ]

    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [directions[i], directions[j]] = [directions[j], directions[i]]
    }

    for (const direction of directions) {
      const nx = x + direction.x
      const ny = y + direction.y

      if (this.#isValid(nx, ny) && this.#map[ny][nx] === 1) {
        this.#map[y + direction.y / 2][x + direction.x / 2] = 0
        this.#carvePath(nx, ny)
      }
    }
  }

  /**
   * Draws a colored tile on the specified canvas context at the given coordinates.
   *
   * @private
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context to draw on.
   * @param {TileInfo} tileInfo - Information about the tile to be drawn.
   * @param {number} tileInfo.x - The x-coordinate of the tile in grid units.
   * @param {number} tileInfo.y - The y-coordinate of the tile in grid units.
   * @param {string} tileInfo.color - The color of the tile represented as a CSS-style string.
   * @param {number} tileInfo.tileSize - The size of each tile in pixels.
   * @returns {void}
   */
  #drawTile (ctx, { x, y, color, tileSize }) {
    ctx.fillStyle = color
    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
  }

  /**
   * Generates random open areas within the maze for diagonal movements.
   *
   * @private
   * @param {Tile[]} maze - The 2D array representing the maze.
   * @param {OpenAreasOptions} options - The options for generating open areas.
   * @param {number} options.rows - The number of rows in the maze.
   * @param {number} options.columns - The number of columns in the maze.
   * @param {number} options.openAreas - The number of open areas to generate.
   * @returns {Tile[]} The maze with randomly generated open areas for diagonal movements.
   */
  #generateOpenAreas (maze, { rows, columns, openAreas }) {
    // Create some random open areas for diagonal movements
    for (let i = 0; i < openAreas; i++) {
      const x = Math.floor(Math.random() * (columns - 2)) + 1
      const y = Math.floor(Math.random() * (rows - 2)) + 1

      maze[y][x] = 0
      maze[y][x + 1] = 0
      maze[y + 1][x] = 0
      maze[y + 1][x + 1] = 0
    }

    return maze
  }

  /**
   * Checks if the given coordinates are valid within the Maze grid.
   *
   * @private
   * @param {number} x - The x-coordinate to check.
   * @param {number} y - The y-coordinate to check.
   * @returns {boolean} Returns true if the coordinates are within the valid range, otherwise false.
   */
  #isValid (x, y) {
    return x >= 0 && x < this.#columns && y >= 0 && y < this.#rows
  }
}
