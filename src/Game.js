export class Game {
  /**
   * @type {import('./Agent').Agent}
   * @private
   **/
  #agent = null

  /**
   * @type {HTMLCanvasElement}
   * @private
   **/
  #canvas = null

  /**
   * @type {import('./Maze').Maze}
   * @private
   **/
  #maze = null

  /**
   * @type {import('./Maze').Tile[]}
   * @private
   **/
  #path = []

  /**
   * @type {number}
   * @private
  **/
  #requestAnimation = 0

  /**
   * Creates a new instance of the MazeSolver class.
   *
   * @constructor
   * @param {import('./Maze').Maze} maze - The Maze instance representing the maze to be solved.
   * @param {import('./Agent').Agent} agent - The Agent instance representing the solver agent.
   * @param {HTMLCanvasElement} canvas - The canvas element on which the maze and agent will be rendered.
   */
  constructor (maze, agent, canvas) {
    this.#agent = agent
    this.#canvas = canvas
    this.#maze = maze
    this.#requestAnimation = 0
  }

  /**
   * Animates the game objects using the given timestamp.
   *
   * @public
   * @param {number} timestamp - The current timestamp for animation synchronization.
   * @returns {void}
   */
  animate (timestamp) {
    const agentPosition = this.#agent.getPosition()

    this.#maze.draw(this.#canvas, this.#maze.getTileSize())

    this.#agent.animate(timestamp, this.#path)
    this.#agent.draw(this.#canvas)

    // Continue the animation loop until the path is completed
    if (agentPosition.x !== this.#path[this.#path.length - 1].x || agentPosition.y !== this.#path[this.#path.length - 1].y) {
      this.#requestAnimation = window.requestAnimationFrame((timestamp) => this.animate(timestamp))
    } else {
      window.cancelAnimationFrame(this.#requestAnimation)
    }
  }

  /**
   * Retrieves the path of tiles from the start to the destination.
   *
   * @public
   * @returns {import('./Maze').Tile[]} An array of tiles representing the path.
   */
  getPath () {
    return this.#path
  }

  /**
   * Runs the game by setting up the canvas and rendering the maze and agent.
   *
   * @public
   * @returns {void}
   */
  run () {
    this.#setupCanvas()

    this.#maze.draw(this.#canvas)
    this.#agent.draw(this.#canvas)
  }

  /**
   * Set the path of tiles from the start to the destination.
   *
   * @public
   * @param {import('./Maze').Tile[]} path
   */
  setPath (path) {
    this.#path = path
  }

  /**
   * Set canvas size based on the map size
   *
   * @private
   * @returns {void}
   */
  #setupCanvas () {
    // Set canvas size based on the map size
    this.#canvas.width = this.#maze.getColumns() * this.#maze.getTileSize()
    this.#canvas.height = this.#maze.getRows() * this.#maze.getTileSize()
  }
}
