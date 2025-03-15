import './css/game.css'
import './css/show-maze-path.css'

import { Agent } from './Agent.js'
import { Maze } from './Maze.js'
import { Game } from './Game.js'
import { getMaxRowsAndColumns } from './utils/getMaxRowsAndColumns.js'
import { showGrid } from './utils/showGrid.js'
import { hideGrid } from './utils/hideGrid.js'
import { findPath } from './aStart.js'
import { showMazePath } from './utils/showMazePath.js'

const columnsField = document.querySelector('#columnsNumber')
const rowsField = document.querySelector('#rowsNumber')
const tileSizeField = document.querySelector('#tileSize')
const openAreasField = document.querySelector('#openAreas')
const characterSpeedField = document.querySelector('#characterSpeed')
const characterColorField = document.querySelector('#characterColor')

/** @type HTMLCanvasElement */
const canvas = document.querySelector('#gameCanvas')
const mazePath = document.querySelector('.maze-path')

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

const maze = new Maze({
  columns: Number.parseInt(columnsField.value, 10) - 1,
  rows: Number.parseInt(rowsField.value, 10) - 1,
  tileSize: Number.parseInt(tileSizeField.value, 10), // Size of each map tile in pixels
  openAreas: Number.parseInt(openAreasField.value, 10)
})

const agent = new Agent({
  color: characterColorField.value,
  speed: Number.parseInt(characterSpeedField.value, 10),
  tileSize: Number.parseInt(tileSizeField.value, 10),
  position: maze.findFreePosition(maze.getMap())
})

const game = new Game(maze, agent, canvas)
game.run()

const gameEvent = (event) => {
  const rect = canvas.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top

  const mapX = Math.floor(mouseX / maze.getTileSize())
  const mapY = Math.floor(mouseY / maze.getTileSize())

  const path = findPath(maze.getMap(), agent.getPosition(), { x: mapX, y: mapY })

  if (path) {
    document.querySelector('.path-stats').innerHTML = `Number of Steps: ${path.length}`

    agent.setCurrentStep(0)

    game.setPath(path)
    game.animate(performance.now())

    showMazePath(
      mazePath,
      maze.getMap(),
      path
    )
  } else {
    console.info('No path found!')

    window.cancelAnimationFrame(game.requestAnimation)
  }
}

canvas.addEventListener('click', gameEvent)

document.querySelector('#showGrid').addEventListener('click', (event) => {
  if (event.target.checked) {
    const gridCanvas = showGrid(canvas, {
      color: '#ccc', // Grid color
      lineWidth: 1, // Grid line width
      tileSize: Number(tileSizeField.value)
    })

    gridCanvas.addEventListener('click', gameEvent)

    document.body.appendChild(gridCanvas)

    return
  }

  hideGrid(document.querySelector('#grid-canvas'))
})

document.querySelector('#mazeSettings .btn-primary').addEventListener('click', (event) => {
  // maze.draw(canvas)
  maze.setTileSize(Number(tileSizeField.value))
  maze.setColumns(Number(columnsField.value))
  maze.setRows(Number(rowsField.value))
  maze.setOpenAreas(Number(openAreasField.value))

  agent.setColor(characterColorField.value)
  agent.setSpeed(Number(characterSpeedField.value))
  agent.setTileSize(Number(tileSizeField.value))

  maze.generate()
  game.run()
})
