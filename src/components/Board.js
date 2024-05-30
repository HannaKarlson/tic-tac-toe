import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  Button,
  StyleSheet,
  Animated,
} from 'react-native';
import {checkVictory} from '../utils.js/checkVictory';
import {getTable} from '../utils.js/getTable';
import {colors} from '../theme/colors';

const deviceWidth = Dimensions.get('window').width;

export const getTileColor = item => {
  if (item === 1) {
    return colors.lightTurchese;
  }
  if (item === 2) {
    return colors.cerisePink;
  }
};

const Board = ({route}) => {
  const arrayLength = route.params?.arrayLength || 3;
  const arr = new Array(arrayLength).fill(0);
  const defaultState = getTable(arrayLength);
  const [boardState, setBoardState] = useState(defaultState);
  const [player, setPlayer] = useState(1);
  const [victory, setVictory] = useState(false);
  const animatedColor = useRef(new Animated.Value(1)).current;

  const backgroundColor = animatedColor.interpolate({
    inputRange: [1, 2],
    outputRange: [colors.lightTurchese, colors.cerisePink],
  });
  const handleStartNewGame = () => {
    setBoardState(defaultState);
    setVictory(false);
  };

  useEffect(() => {
    if (victory) {
      Alert.alert('you win');
    }
  }, [victory]);
  useEffect(() => {
    if (player === 1) {
      Animated.timing(animatedColor, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    if (player === 2) {
      Animated.timing(animatedColor, {
        toValue: 2,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [player]);
  const handlePressItem = (row, index, item) => () => {
    const itemIndex = index;
    if (item !== 0) {
      return null;
    }
    const newRowState = [];
    boardState[row].map((item, index) => {
      if (index === itemIndex) {
        newRowState.push(player);
      } else {
        newRowState.push(item);
      }
    });
    const newState = [];
    boardState.map((item, index) => {
      if (index === row) {
        newState.push(newRowState);
      } else {
        newState.push(item);
      }
    });

    setBoardState(newState);
    const victory = checkVictory(newState);
    if (victory) {
      return setVictory(victory);
    }
    if (player === 1) {
      setPlayer(2);
    } else if (player === 2) {
      setPlayer(1);
    }
  };
  const allRows = () => {
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
                    disabled={victory}
                    key={itemKey}
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: colors.midnightDark,
                      height: deviceWidth / arrayLength,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={handlePressItem(rowIndex, index, item)}>
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

  return (
    <Animated.View style={{flex: 1, backgroundColor: backgroundColor}}>
      <View style={{marginTop: '20%', flex: 1}}>{allRows()}</View>
      <TouchableOpacity
        onPress={handleStartNewGame}
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: colors.lemonYellow,
          width: '100%',
        }}>
        <Text
          style={{
            color: colors.midnightDark,
            fontSize: 20,
            alignSelf: 'center',
            paddingVertical: 20,
          }}>
          New game
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Board;
