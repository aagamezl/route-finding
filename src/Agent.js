/**
 * @typedef {Object} AgentConfig
 * @property {string} color - The color of the Agent represented as a hexadecimal string.
 * @property {number} speed - The speed of the Agent, represented as a number.
 * @property {number} tileSize - The size of each map tile in pixels.
 * @property {import('./Maze').Tile} position - The position point of the Agent represented as an object with 'x' and 'y' coordinates.
 */

export class Agent {
  /** @type {string} */
  #color = '#000'

  /**
   * @type {number}
   * @private
  **/
  #currentStep = 0

  /**
   * @type {import('./Maze').Tile}
   * @private
   * */
  #position = null

  /**
   * @type {number}
   * @private
  **/
  #speed = 0

  /**
   * @type {number}
   * @private
  **/
  #startTime = 0

  /**
   * @type {number}
   * @private
  **/
  #tileSize = 0

  /**
   * Represents an Agent with specific characteristics.
   *
   * @constructor
   * @param {AgentConfig} config - The config to configure the Agent.
   * @param {string} config.color - The color of the Agent represented as a hexadecimal string.
   * @param {number} config.speed - The speed of the Agent, represented as a number.
   * @param {number} config.tileSize - The size of each map tile in pixels.
   * @param {import('./Maze').Tile} config.position - The position point of the Agent represented as an object with 'x' and 'y' coordinates.
   */
  constructor ({ color, speed, tileSize, position }) {
    this.#color = color
    this.#currentStep = 0
    this.#position = position
    this.#speed = speed
    this.#startTime = 0
    this.#tileSize = tileSize
  }

  /**
   * Animates the agent's movement on the specified canvas along the given path.
   *
   * @public
   * @param {number} timestamp - The current timestamp from the requestAnimationFrame callback.
   * @param {import('./Maze').Tile[]} path - An array of path points for the agent to follow.
   */
  animate (timestamp, path) {
    if (!this.#startTime) {
      this.#startTime = timestamp
    }

    const elapsedTime = timestamp - this.#startTime

    const progress = Math.min(1, elapsedTime / this.#speed)

    const fromTile = path[this.#currentStep]
    const toTile = path[this.#currentStep + 1]

    if (!toTile) {
      return
    }

    const xDiff = toTile.x - fromTile.x
    const yDiff = toTile.y - fromTile.y

    this.#position.x = fromTile.x + xDiff * progress
    this.#position.y = fromTile.y + yDiff * progress

    if (progress >= 1) {
      this.#currentStep++
      this.#startTime = null
    }
  }

  /**
   * Draws the agent on the specified canvas.
   *
   * @public
   * @param {HTMLCanvasElement} canvas - The canvas element on which to draw the agent.
   * @returns {void}
   */
  draw (canvas) {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = this.#color
    ctx.fillRect(this.#position.x * this.#tileSize, this.#position.y * this.#tileSize, this.#tileSize, this.#tileSize)
  }

  /**
   * @public
   * @returns {import('./Maze').Tile}
   */
  getPosition () {
    return this.#position
  }

  /**
   * @public
   * @param {string} color
   * @returns {void}
   */
  setColor (color) {
    this.#color = color
  }

  /**
   * @public
   * @param {number} step
   * @returns {void}
   */
  setCurrentStep (step) {
    this.#currentStep = step
  }

  /**
   * @public
   * @param {number} speed
   * @returns {void}
   */
  setSpeed (speed) {
    this.#speed = speed
  }

  setTileSize (tileSize) {
    this.#tileSize = tileSize
  }
}
