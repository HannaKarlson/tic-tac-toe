import {colors} from '../theme/colors';

type GetShowTable = (arrayLength: number) => Array<Array<number>>|null;
type GetCleanTable = (arrayLength:number) => Array<Array<number>>
type GetTileColor = (item:number) => string

export const getCleanTable:GetCleanTable = arrayLength =>
  new Array(arrayLength).fill(new Array(arrayLength).fill(0));

export const getShowTable:GetShowTable = arrayLength => {
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

export const getTileColor:GetTileColor = item => {
  if (item === 1) {
    return colors.lightTurchese;
  }
  if (item === 2) {
    return colors.cerisePink;
  }
  return colors.simpleWhite
};
