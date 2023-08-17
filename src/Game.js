import { findPath } from './aStart.js'

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
    this.requestAnimation = null
  }

  run() {
    this.#setCanvas()

    // const maze = this.maze.generate()

    this.maze.draw(this.canvas)
    this.agent.draw(this.canvas)

    // this.canvas.addEventListener('click', (event) => {
    //   const rect = this.canvas.getBoundingClientRect()
    //   const mouseX = event.clientX - rect.left
    //   const mouseY = event.clientY - rect.top

    //   const mapX = Math.floor(mouseX / this.maze.config.tileSize)
    //   const mapY = Math.floor(mouseY / this.maze.config.tileSize)

    //   this.path = findPath(maze, this.agent.position, { x: mapX, y: mapY })

    //   // const animate = (timestamp) => {
    //   //   this.maze.draw(this.canvas)
    //   //   // this.agent.animate(this.canvas, path, this.maze.draw.bind(this.maze))
    //   //   this.agent.animate(this.canvas, path, timestamp)

    //   //   requestAnimationFrame(animate)
    //   // }

    //   if (this.path) {
    //     document.querySelector('.path-stats').innerHTML = `Number of Steps: ${this.path.length}`

    //     this.agent.currentStep = 0

    //     this.#animate(performance.now())

    //     this.#showMazePath(
    //       document.querySelector('.maze-path'),
    //       gameMaze,
    //       path,
    //       config.rows,
    //       config.columns
    //     )

    //   } else {
    //     console.info('No path found!')
    //     cancelAnimationFrame(this.requestAnimation)
    //   }
    // })
  }

  animate (timestamp) {
    const ctx = this.canvas.getContext('2d')

    this.maze.draw(this.canvas, this.maze.config.tileSize)
    // this.agent.animate(timestamp, this.path)
    // this.agent.draw(this.canvas, this.maze.config.tileSize)

    // Stop the animation loop if the agent reaches the last step
    // if (this.agent.currentStep >= this.path.length - 1) {
    //   this.agent.draw(this.canvas, this.maze.config.tileSize)


    //   return
    // }

    // this.agent.animate(this.canvas, timestamp, this.path)
    this.agent.animate(timestamp, this.path)
    // this.agent.draw(this.canvas, this.maze.config.tileSize)
    this.agent.draw(this.canvas)

    // Continue the animation loop until the path is completed
    if (this.agent.position.x !== this.path[this.path.length - 1].x || this.agent.position.y !== this.path[this.path.length - 1].y) {
      this.requestAnimation = requestAnimationFrame((timestamp) => this.animate(timestamp))
    } else {
      cancelAnimationFrame(this.requestAnimation)
    }
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

  /**
   *
   * @param {HTMLTableElement} mazeTable
   * @param {import('./Maze').Tile[][]} maze
   * @param {import('./Maze').Tile[]} path
   * @param {number} rows
   * @param {number} columns
   * @returns {void}
   */
  showMazePath (mazeTable, maze, path, rows, columns) {
    // Clear all previous table cells
    while (mazeTable.firstChild) {
      mazeTable.removeChild(mazeTable.lastChild)
    }

    // Create the table grid
    for (let row = 0; row < rows; row++) {
      const tr = mazeTable.insertRow()

      for (let column = 0; column < columns; column++) {
        const td = tr.insertCell()

        if (maze[row][column] === 1) {
          td.classList.add('solid-cell')
          td.title = 'solid'
        }

        // td.title = `(${column}, ${row})`
      }
    }

    // Mark the path cells
    for (const node of path) {
      const row = node.y
      const column = node.x
      const td = mazeTable.rows[row].cells[column]

      td.title = `(${column}, ${row})`

      td.classList.add('path-cell')
    }
  }
}
