import React from 'react';
import type {FC} from 'react'
import {View, TouchableOpacity, Dimensions} from 'react-native';
import {getTileColor} from '../utils/utils';
import {colors} from '../theme/colors';


const deviceWidth = Dimensions.get('window').width;

type Props = {
  boardState:Array<Array<number>>,
  onPressTile:Function,
  pressTileDisabled:boolean
}

const Board:FC<Props> = ({boardState, onPressTile, pressTileDisabled}) => {
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
              backgroundColor: colors.simpleWhite,
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
                    borderColor: colors.midnightDark,
                    height: deviceWidth / arrayLength,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={onPressTile({rowIndex, index, item})}>
                  <View
                    style={{
                      backgroundColor: getTileColor(item),
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
