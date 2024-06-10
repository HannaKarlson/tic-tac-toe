import React, {useContext} from 'react';
import type {FC} from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
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
            style={{
              flexDirection: 'row',
              backgroundColor: backgroundColor, //colors.simpleWhite,
            }}>
            {row.map((item, index) => {
              const itemKey = `${rowIndex.toString()}-${index.toString()}`;
              return (
                <TouchableOpacity
                  disabled={pressTileDisabled}
                  key={itemKey}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: borderColor, //colors.midnightDark,
                    height: deviceWidth / arrayLength,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={onPressTile({rowIndex, index, item})}>
                  <View
                    style={{
                      backgroundColor: getTileColor(item, theme),
                      height: deviceWidth / (arrayLength * 1.2),
                      width: deviceWidth / (arrayLength * 1.2),
                      borderRadius: 100,
                      overflow: 'hidden',
                    }}></View>
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
