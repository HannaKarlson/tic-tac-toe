import React, {useContext} from 'react';
import type {FC} from 'react';
import {TouchableOpacity, View, Dimensions, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';
import {getTileColor} from '../utils/utils';
import type {SelectGameScreenNavigationProp} from '../types/navigationTypes';
import {ThemeContext} from '../../App';
const deviceHeight = Dimensions.get('screen').height;

const width = deviceHeight / 4;

type Props = {
  board: Array<Array<number>> | null;
  navigation: SelectGameScreenNavigationProp;
};

const styles = StyleSheet.create({
  board: {flexDirection: 'row'},
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

const SelectGameBoard: FC<Props> = ({board, navigation}) => {
  const theme = useContext(ThemeContext);
  const backgroundColor =
    theme === 'dark' ? colors.midnightDark : colors.simpleWhite;
  const borderColor =
    theme === 'dark' ? colors.simpleWhite : colors.midnightDark;
  if (!board) {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Game', {arrayLength: board.length})}
      style={{width: width}}>
      {board.map((row, rowIndex) => {
        return (
          <View
            key={rowIndex.toString()}
            style={[
              styles.board,
              {
                backgroundColor: backgroundColor,

                height: width / board.length,
              },
            ]}>
            {row.map((item, index) => {
              const itemIndex: string = `${rowIndex.toString()}-${index.toString()}`;
              return (
                <View
                  key={itemIndex}
                  style={[styles.boardSquare, {borderColor: borderColor}]}>
                  <View
                    style={[
                      styles.tile,
                      {
                        backgroundColor: getTileColor(item, theme),
                        height: width / (board.length * 1.2),
                        width: width / (board.length * 1.2),
                      },
                    ]}
                  />
                </View>
              );
            })}
          </View>
        );
      })}
    </TouchableOpacity>
  );
};

export default SelectGameBoard;
