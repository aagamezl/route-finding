/**
 * Renders a grid on the specified canvas with the given visual attributes.
 * @param {HTMLCanvasElement} canvas - The canvas element on which to render the grid.
 * @param {Object} options - Visual attributes for rendering the grid.
 * @param {string} options.color - The color of the grid lines represented as a CSS-style string.
 * @param {number} options.lineWidth - The width of the grid lines in pixels.
 * @param {number} options.tileSize - The size of each grid tile in pixels.
 * @returns {HTMLCanvasElement}
 */
export const showGrid = (canvas, { color, lineWidth, tileSize }) => {
  const gridCanvas = document.createElement('canvas')
  const ctx = gridCanvas.getContext('2d');
  const clienRect = canvas.getBoundingClientRect()

  gridCanvas.id = 'grid-canvas'
  gridCanvas.style.position = 'absolute';
  gridCanvas.width = canvas.width
  gridCanvas.height = canvas.height

  // gridCanvas.style.top = `${clienRect.top}px`
  gridCanvas.style.left = '0'
  gridCanvas.addEventListener('click', getMapPositionHandler)

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  // Draw vertical grid lines
  for (let x = 0; x <= canvas.width; x += tileSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Draw horizontal grid lines
  for (let y = 0; y <= canvas.height; y += tileSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  return gridCanvas
}
