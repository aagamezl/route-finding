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

const characterSpeedField = document.querySelector('#characterSpeed')
const columnsField = document.querySelector('#columnsNumber')
const openAreasField = document.querySelector('#openAreas')
const rowsField = document.querySelector('#rowsNumber')
const tileSizeField = document.querySelector('#tileSize')

/** @type HTMLCanvasElement */
const canvas = document.querySelector('#gameCanvas')

const tileSize = 24 // You can change this value to your desired tile size
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const { maxRows, maxColumns } = getMaxRowsAndColumns(screenWidth, screenHeight, tileSize)

rowsField.value = maxRows - 1
columnsField.value = maxColumns

document.querySelector('#showGrid').addEventListener('click', (event) => {
  if (event.target.checked) {
    const gridCanvas = showGrid(canvas, {
      color: '#ccc', // Grid color
      lineWidth: 1, // Grid line width
      tileSize
    })

    document.body.appendChild(gridCanvas)

    return
  }

  hideGrid(canvas)
})

const agent = new Agent({
  color: '#f00',
  speed: Number(characterSpeedField.value),
  tileSize: Number(tileSizeField.value),
  position: { x: 1, y: 1 }
})

const maze = new Maze({
  columns: Number(columnsField.value) - 1,
  rows: Number(rowsField.value) - 1,
  tileSize: Number(tileSizeField.value), // Size of each map tile in pixels
  openAreas: Number(openAreasField.value),
  startPoint: agent.position
})

const game = new Game(maze, agent, canvas)
game.run()

// Now you have the maximum number of rows and columns you can create
console.log("Max Rows:", maxRows)
console.log("Max Columns:", maxColumns)
