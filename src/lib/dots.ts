export interface DotPos {
  x: number;
  y: number;
  dx: number;
  dy: number;
  index: number;
}
export const getDotIndex = (dx: number, dy: number) => {
  switch (dx) {
    case 0: {
      switch (dy) {
        case 0:
          return 0;
        case 1:
          return 1;
        case 2:
          return 2;
        case 3:
          return 6;
      }
    }
    case 1: {
      switch (dy) {
        case 0:
          return 3;
        case 1:
          return 4;
        case 2:
          return 5;
        case 3:
          return 7;
      }
    }
  }
  return -1;
};

