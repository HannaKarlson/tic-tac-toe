import React from 'react';
import type {FC} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getCleanTable, getShowTable, getTileColor} from '../utils/utils';
import {colors} from '../theme/colors';
import SelectGameBoard from './SelectGameBoard';
import type {SelectGameScreenNavigationProp} from '../types/navigationTypes';

type Props = {
  navigation: SelectGameScreenNavigationProp;
};

const deviceHeight = Dimensions.get('screen').height;

const width = deviceHeight / 4;
const easyGame: Array<Array<number>> | null = getShowTable(3);
const mediumGame: Array<Array<number>> | null = getShowTable(6);
const difficultGame: Array<Array<number>> | null = getShowTable(9);
const showTable = getShowTable(3);

const SelectGame: FC<Props> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        backgroundColor: colors.lemonYellow,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: insets.bottom,
      }}>
      <SelectGameBoard board={easyGame} navigation={navigation} />
      <SelectGameBoard board={mediumGame} navigation={navigation} />
      <SelectGameBoard board={difficultGame} navigation={navigation} />
    </View>
  );
};

export default SelectGame;
