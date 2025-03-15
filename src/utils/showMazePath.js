/**
 *
 * @param {HTMLTableElement} mazeTable
 * @param {import('../Maze').Tile[][]} maze
 * @param {import('../Maze').Tile[]} path
 * @returns {void}
 */
export const showMazePath = (mazeTable, maze, path) => {
  // Clear all previous table cells
  while (mazeTable.firstChild) {
    mazeTable.removeChild(mazeTable.lastChild)
  }

  // Create the table grid
  for (let row = 0; row < maze.length; row++) {
    const tr = mazeTable.insertRow()

    for (let column = 0; column < maze[0].length; column++) {
      const td = tr.insertCell()

      if (maze[row][column] === 1) {
        td.classList.add('solid-cell')
        td.title = 'solid'
      }
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
