export class Agent {
  /**
   * Represents an Agent with specific characteristics.
   * @constructor
   * @param {Object} config - The config to configure the Agent.
   * @param {string} config.color - The color of the Agent represented as a hexadecimal string.
   * @param {number} config.speed - The speed of the Agent, represented as a number.
   * @param {number} config.tileSize - The size of each map tile in pixels.
   * @param {import("./Maze").Tile} config.position - The position point of the Agent represented as an object with 'x' and 'y' coordinates.
   */
  constructor({ color, speed, tileSize, position }) {
    this.color = color
    this.speed = speed
    this.tileSize = tileSize
    this.position = position

    this.startTime = null;
    this.currentStep = 0;
  }

  // animate (canvas, path, drawMaze) {
  /**
   * Animates the agent's movement on the specified canvas along the given path.
   * @param {HTMLCanvasElement} canvas - The canvas element on which to animate the agent.
   * @param {number} timestamp - The current timestamp from the requestAnimationFrame callback.
   * @param {import("./Maze").Tile[]} path - An array of path points for the agent to follow.
   */
  animate (/* canvas,  */timestamp, path) {
    // const ctx = canvas.getContext('2d')
    // const moveSpeed = 30 // Adjust the speed of movement here (lower value for slower movement)
    // let currentStep = 0
    // this.currentStep = 0
    // let startTime = null

    // const animate = (timestamp) => {
      if (!this.startTime) {
        this.startTime = timestamp
      }

      const elapsedTime = timestamp - this.startTime

      const totalSteps = path.length - 1
      // const progress = Math.min(1, elapsedTime / moveSpeed)
      const progress = Math.min(1, elapsedTime / this.speed)

      const fromTile = path[this.currentStep]
      const toTile = path[this.currentStep + 1]

      if (!toTile) {
        // this.currentStep = 0
        // debugger
        return
      }

      const xDiff = toTile.x - fromTile.x
      const yDiff = toTile.y - fromTile.y

      this.position.x = fromTile.x + xDiff * progress
      this.position.y = fromTile.y + yDiff * progress

      // drawMaze(
      //   canvas
      // )

      // ctx.fillStyle = this.color
      // ctx.fillRect(this.position.x * this.tileSize, this.position.y * this.tileSize, this.tileSize, this.tileSize)

      if (progress >= 1) {
        this.currentStep++
        this.startTime = null
      }

      // if (this.currentStep < totalSteps) {
      if (this.currentStep > totalSteps) {
        // requestAnimationFrame(animate)
        debugger
      }
    // }

    // animate(performance.now())
    // this.draw(canvas, this.tileSize)
  }

  // animate (timestamp, path) {
  //   // if (!path.length) {
  //   //   return
  //   // }

  //   // if (!this.startTime) {
  //   //   this.startTime = timestamp
  //   // }

  //   // // const currentStep = Math.floor(timestamp * this.speed / 1000)
  //   // const durationInSeconds = (timestamp - this.startTime) / 1000;
  //   // const currentStep = Math.min(Math.floor(durationInSeconds * this.speed), path.length - 1);

  //   // if (currentStep >= path.length) {
  //   //   return
  //   // }

  //   // const { x, y } = path[currentStep]
  //   // this.position.x = x
  //   // this.position.y = y

  //   if (!this.startTime) {
  //     this.startTime = timestamp;
  //   }

  //   const elapsedTime = timestamp - this.startTime;
  //   const totalSteps = path.length - 1;
  //   const moveSpeed = (1 / this.speed) * 1000; // Calculate moveSpeed based on agent speed

  //   if (this.currentStep < totalSteps) {
  //     const progress = Math.min(1, elapsedTime / moveSpeed);
  //     const fromTile = path[this.currentStep];
  //     const toTile = path[this.currentStep + 1];

  //     const xDiff = toTile.x - fromTile.x;
  //     const yDiff = toTile.y - fromTile.y;

  //     this.position.x = fromTile.x + xDiff * progress;
  //     this.position.y = fromTile.y + yDiff * progress;
  //   }

  //   if (elapsedTime >= moveSpeed) {
  //     this.currentStep++;
  //     this.startTime = null;
  //   }
  // }

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
