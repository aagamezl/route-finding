export const getMaxRowsAndColumns = (screenWidth, screenHeight, tileSize) => {
  const maxRows = Math.floor(screenHeight / tileSize)
  const maxColumns = Math.floor(screenWidth / tileSize)

  return { maxRows, maxColumns }
}
