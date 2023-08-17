/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {import("../Maze").Tile[]} gameMaze
 * @param {MapPosition} config
 */
export const getMapPositionHandler = (canvas, gameMaze, { characterPosition, clientX, clientY, tileSize }) => {
  const rect = canvas.getBoundingClientRect()
  const mouseX = clientX - rect.left
  const mouseY = clientY - rect.top

  const mapX = Math.floor(mouseX / tileSize)
  const mapY = Math.floor(mouseY / tileSize)

  const path = findPath(gameMaze, characterPosition, { x: mapX, y: mapY })

  if (path) {
    document.querySelector('.path-stats').innerHTML = `Number of Steps: ${path.length}`

    showMazePath(
      document.querySelector('.maze-path'),
      gameMaze,
      path,
      config.rows,
      config.columns
    )

    animateCharacterMovement(canvas.getContext('2d'), path, config)
  } else {
    console.log('No path found!')
  }
}
