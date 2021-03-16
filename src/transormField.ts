export const transformField = (
  field: number[][],
  nextGenField: number[][]
): number[][] => {
  const transformedField = JSON.parse(JSON.stringify(field));
  field.forEach((row, rowIndex) =>
    row.forEach((x, colIndex) => {
      if (
        field[rowIndex][colIndex] === 1 &&
        nextGenField[rowIndex][colIndex] === 0
      ) {
        transformedField[rowIndex][colIndex] = 2;
      }
    })
  );
  return transformedField;
};
