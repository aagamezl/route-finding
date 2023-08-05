import { findPath } from './aStart'

export class Game {
  /**
   * Creates a new instance of the MazeSolver class.
   * @constructor
   * @param {import('./Maze').Maze} maze - The Maze instance representing the maze to be solved.
   * @param {import('./Agent').Agent} agent - The Agent instance representing the solver agent.
   * @param {HTMLCanvasElement} canvas - The canvas element on which the maze and agent will be rendered.
   */
  constructor (maze, agent, canvas) {
    this.maze = maze
    this.agent = agent
    this.canvas = canvas
  }

  run () {
    this.#setCanvas()

    const maze = this.maze.generate()

    this.maze.draw(this.canvas)
    this.agent.draw(this.canvas)

    // Handle user interaction
    this.canvas.addEventListener('click', (event) => {
      const rect = this.canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      const mapX = Math.floor(mouseX / this.maze.config.tileSize)
      const mapY = Math.floor(mouseY / this.maze.config.tileSize)

      const path = findPath(maze, this.agent.position, { x: mapX, y: mapY })

      if (path) {
        document.querySelector('.path-stats').innerHTML = `Number of Steps: ${path.length}`

        // showMazePath(
        //   document.querySelector('.maze-path'),
        //   gameMaze,
        //   path,
        //   config.rows,
        //   config.columns
        // )

        this.maze.draw(this.canvas)
        this.agent.animate(this.canvas, path, this.maze.draw.bind(this.maze))
      } else {
        console.info('No path found!')
      }
    })
  }

  /**
   * Set canvas size based on the map size
   *
   * @param {HTMLCanvasElement} canvas
   * @param {DimensionOptions} options
   * @returns {void}
   */
  #setCanvas () {
    // Set canvas size based on the map size
    this.canvas.width = this.maze.config.columns * this.maze.config.tileSize
    this.canvas.height = this.maze.config.rows * this.maze.config.tileSize
  }
}
