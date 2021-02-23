export function getNewCellState(currentCellState, numOfAliveNEighbours) {
  if (numOfAliveNEighbours === 3) {
    return 1;
  }
  if (numOfAliveNEighbours > 3 || numOfAliveNEighbours < 2) {
    return 0;
  }
  if (numOfAliveNEighbours === 2 && currentCellState === 1) {
    return 1;
  }
  return 0;
}
