export class Agent {
  /**
   * Represents an Agent with specific characteristics.
   * @constructor
   * @param {Object} config - The config to configure the Agent.
   * @param {string} config.color - The color of the Agent represented as a hexadecimal string.
   * @param {number} config.speed - The speed of the Agent, represented as a number.
   * @param {number} config.tileSize - The size of each map tile in pixels.
   * @param {Tile} config.position - The position point of the Agent represented as an object with 'x' and 'y' coordinates.
   */
  constructor({ color, speed, tileSize, position }) {
    this.color = color
    this.speed = speed
    this.tileSize = tileSize
    this.position = position
  }

  animate (canvas, path, drawMaze) {
    const ctx = canvas.getContext('2d')
    const moveSpeed = 30 // Adjust the speed of movement here (lower value for slower movement)
    let currentStep = 0
    let startTime = null

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp
      }

      const elapsedTime = timestamp - startTime

      const totalSteps = path.length - 1
      const progress = Math.min(1, elapsedTime / moveSpeed)

      const fromTile = path[currentStep]
      const toTile = path[currentStep + 1]

      const xDiff = toTile.x - fromTile.x
      const yDiff = toTile.y - fromTile.y

      this.position.x = fromTile.x + xDiff * progress
      this.position.y = fromTile.y + yDiff * progress

      drawMaze(
        canvas
      )

      ctx.fillStyle = '#f00'
      ctx.fillRect(this.position.x * this.tileSize, this.position.y * this.tileSize, this.tileSize, this.tileSize)

      if (progress >= 1) {
        currentStep++
        startTime = null
      }

      if (currentStep < totalSteps) {
        requestAnimationFrame(animate)
      }
    }

    animate(performance.now())
  }

  /**
   * @public
   * Draws the agent on the specified canvas.
   * @param {HTMLCanvasElement} canvas - The canvas element on which to draw the agent.
   * @returns {void}
   */
  draw (canvas) {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x * this.tileSize, this.position.y * this.tileSize, this.tileSize, this.tileSize)
  }
}
