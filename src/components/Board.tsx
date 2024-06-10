import React, {useContext} from 'react';
import type {FC} from 'react';
import {View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import {getTileColor} from '../utils/utils';
import {colors} from '../theme/colors';
import {ThemeContext} from '../../App';
import {ColorScheme} from '../types/types';

const deviceWidth = Dimensions.get('window').width;

type Props = {
  boardState: Array<Array<number>>;
  onPressTile: Function;
  pressTileDisabled: boolean;
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
  },
  boardSquare: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderRadius: 100,
    overflow: 'hidden',
  },
});

const Board: FC<Props> = ({boardState, onPressTile, pressTileDisabled}) => {
  const theme: ColorScheme = useContext(ThemeContext);
  const backgroundColor =
    theme === 'dark' ? colors.midnightDark : colors.simpleWhite;
  const borderColor =
    theme === 'dark' ? colors.simpleWhite : colors.midnightDark;
  if (!boardState) {
    return null;
  }
  const arrayLength = boardState.length;
  return (
    <View>
      {boardState.map((row, rowIndex) => {
        return (
          <View
            key={rowIndex.toString()}
            style={[
              styles.board,
              {
                backgroundColor: backgroundColor,
              },
            ]}>
            {row.map((item, index) => {
              const itemKey = `${rowIndex.toString()}-${index.toString()}`;
              return (
                <TouchableOpacity
                  disabled={pressTileDisabled}
                  key={itemKey}
                  style={[
                    styles.boardSquare,
                    {
                      borderColor: borderColor,
                      height: deviceWidth / arrayLength,
                    },
                  ]}
                  onPress={onPressTile({rowIndex, index, item})}>
                  <View
                    style={[
                      styles.tile,
                      {
                        backgroundColor: getTileColor(item, theme),
                        height: deviceWidth / (arrayLength * 1.2),
                        width: deviceWidth / (arrayLength * 1.2),
                      },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default Board;
