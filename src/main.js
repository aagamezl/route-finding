// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './route-finding/counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

import './css/game.css'

import { Agent } from './Agent.js'
import { Maze } from './Maze.js'
import { Game } from './Game.js'
import { getMaxRowsAndColumns } from './utils/getMaxRowsAndColumns.js'
import { showGrid } from './utils/showGrid.js'
import { hideGrid } from './utils/hideGrid.js'
import { findPath } from './aStart.js'

const characterSpeedField = document.querySelector('#characterSpeed')
const columnsField = document.querySelector('#columnsNumber')
const openAreasField = document.querySelector('#openAreas')
const rowsField = document.querySelector('#rowsNumber')
const tileSizeField = document.querySelector('#tileSize')

/** @type HTMLCanvasElement */
const canvas = document.querySelector('#gameCanvas')

const tileSize = Number(tileSizeField.value) // You can change this value to your desired tile size
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const { maxRows, maxColumns } = getMaxRowsAndColumns(
  screenWidth,
  screenHeight,
  tileSizeField.value
)

// Set the open areas value according to the screen viewport
openAreasField.value = Math.ceil((maxRows * maxColumns) / 10)

rowsField.value = maxRows - 1
columnsField.value = maxColumns

const agent = new Agent({
  color: '#f00',
  speed: Number(characterSpeedField.value),
  tileSize,
  position: { x: 1, y: 1 }
})

const maze = new Maze({
  columns: Number(columnsField.value) - 1,
  rows: Number(rowsField.value) - 1,
  tileSize, // Size of each map tile in pixels
  openAreas: Number(openAreasField.value),
  startPoint: agent.position
})

const game = new Game(maze, agent, canvas)
game.run()

// const generatedMaze = maze.generate()
const generatedMaze = maze.maze

// Now you have the maximum number of rows and columns you can create
// console.log("Max Rows:", maxRows)
// console.log("Max Columns:", maxColumns)

const gameEvent = (event) => {
  const rect = canvas.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top

  const mapX = Math.floor(mouseX / maze.config.tileSize)
  const mapY = Math.floor(mouseY / maze.config.tileSize)

  const path = findPath(generatedMaze, agent.position, { x: mapX, y: mapY })

  // const animate = (timestamp) => {
  //   this.maze.draw(this.canvas)
  //   // this.agent.animate(this.canvas, path, this.maze.draw.bind(this.maze))
  //   this.agent.animate(this.canvas, path, timestamp)

  //   requestAnimationFrame(animate)
  // }

  if (path) {
    document.querySelector('.path-stats').innerHTML = `Number of Steps: ${path.length}`

    agent.currentStep = 0

    game.path = path
    game.animate(performance.now())

    game.showMazePath(
      document.querySelector('.maze-path'),
      gameMaze,
      path,
      config.rows,
      config.columns
    )
  } else {
    console.info('No path found!')

    cancelAnimationFrame(game.requestAnimation)
  }
}

canvas.addEventListener('click', gameEvent)

document.querySelector('#showGrid').addEventListener('click', (event) => {
  if (event.target.checked) {
    const gridCanvas = showGrid(canvas, {
      color: '#ccc', // Grid color
      lineWidth: 1, // Grid line width
      tileSize
    })

    gridCanvas.addEventListener('click', gameEvent)

    document.body.appendChild(gridCanvas)

    return
  }

  hideGrid(document.querySelector('#grid-canvas'))
})
