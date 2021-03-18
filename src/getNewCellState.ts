export function getNewCellState(
  currentCellState: number,
  numOfAliveNEighbours: number
): number {
  if (
    numOfAliveNEighbours === 3 ||
    (numOfAliveNEighbours === 2 && currentCellState === 1)
  ) {
    return 1;
  }
  return 0;
}
