export const createField = (
  sizeX: number,
  sizeY: number,
  template?: number[][]
): number[][] => {
  let field;
  if (!template) {
    field = new Array(sizeY).fill(0).map(() => new Array(sizeX).fill(0));
  } else {
    field = template;
  }
  const diffX = Math.abs(sizeX - field[0].length);
  if (sizeX < field[0].length) {
    field = field.map((row) => {
      for (let i = 0; i < diffX; i++) {
        row.pop();
      }
      return row;
    });
  }
  if (sizeX > field[0].length) {
    field = field.map((row) => {
      for (let i = 0; i < diffX; i++) {
        row.push(0);
      }
      return row;
    });
  }
  if (sizeY < field.length) {
    field.length = sizeY;
  }
  const diffY = sizeY - field.length;
  for (let i = 0; i < diffY; i++) {
    field.push(new Array(sizeX).fill(0));
  }
  return field;
};
