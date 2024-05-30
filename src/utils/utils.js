import {colors} from '../theme/colors';

export const getCleanTable = arrayLength =>
  new Array(arrayLength).fill(new Array(arrayLength).fill(0));

const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    {length: n},
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  );

export const getShowTable = arrayLength => {
  if (arrayLength === 3) {
    return [
      [0, 2, 2],
      [1, 1, 1],
      [2, 0, 0],
    ];
  }
  if (arrayLength === 6) {
    return [
      [1, 1, 0, 0, 0, 0],
      [0, 2, 0, 0, 1, 0],
      [0, 2, 1, 0, 0, 0],
      [0, 2, 1, 0, 0, 0],
      [0, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
  }
  if (arrayLength === 9) {
    return [
      [0, 0, 2, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }
  return null;
};

export const getTileColor = item => {
  if (item === 1) {
    return colors.lightTurchese;
  }
  if (item === 2) {
    return colors.cerisePink;
  }
};
