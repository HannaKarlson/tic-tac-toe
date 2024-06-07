import React from 'react'
import type {FC} from 'react'
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { colors } from '../theme/colors';
import { getTileColor} from '../utils/utils';
import type { SelectGameScreenNavigationProp } from '../types/navigationTypes';

const deviceHeight = Dimensions.get('screen').height;

const width = deviceHeight / 4;

type Props = {
    board:Array<Array<number>>|null,
    navigation:SelectGameScreenNavigationProp
}

const SelectGameBoard:FC<Props> = ({board, navigation}) => {
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
              style={{flexDirection: 'row', backgroundColor: colors.simpleWhite}}>
              {row.map((item, index) => {
                const itemIndex:string = `${rowIndex.toString()}-${index.toString()}`;
                return (
                  <View
                    key={itemIndex}
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: colors.midnightDark,
                      height: width / board.length,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: getTileColor(item),
                        height: width / (board.length * 1.2),
                        width: width / (board.length * 1.2),
                        borderRadius: 100,
                        overflow: 'hidden',
                      }}></View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </TouchableOpacity>
    );
  };

  export default SelectGameBoard