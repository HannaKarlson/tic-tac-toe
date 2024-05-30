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
import {checkVictory} from '../utils/checkVictory';
import {getCleanTable} from '../utils/utils';
import {colors} from '../theme/colors';
import Board from './Board';

// export const getTileColor = item => {
//   if (item === 1) {
//     return colors.lightTurchese;
//   }
//   if (item === 2) {
//     return colors.cerisePink;
//   }
// };

const Game = ({route}) => {
  const arrayLength = route.params?.arrayLength || 3;
  const arr = new Array(arrayLength).fill(0);
  const defaultState = getCleanTable(arrayLength);
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

  const handlePressTile =
    ({rowIndex, index, item}) =>
    () => {
      const itemIndex = index;
      if (item !== 0) {
        return null;
      }
      const newRowState = [];
      boardState[rowIndex].map((item, index) => {
        if (index === itemIndex) {
          newRowState.push(player);
        } else {
          newRowState.push(item);
        }
      });
      const newState = [];
      boardState.map((item, index) => {
        if (index === rowIndex) {
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

  return (
    <Animated.View style={{flex: 1, backgroundColor: backgroundColor}}>
      <View style={{marginTop: '20%', flex: 1}}>
        <Board
          boardState={boardState}
          onPressTile={handlePressTile}
          pressTileDisabled={victory}
        />
      </View>
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

export default Game;
