import React, {useState, useEffect, useRef, useContext} from 'react';
import type {FC} from 'react';
import {View, Text, StyleSheet, Animated, Pressable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import LottieView from 'lottie-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {checkVictory} from '../utils/checkVictory';
import {getCleanTable} from '../utils/utils';
import {colors} from '../theme/colors';
import Board from './Board';
import WinnerModal from './WinnerModal';
import {ThemeContext} from '../../App';
// types
import type {RootStackParamList} from '../types/navigationTypes';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;
type HandlePressTile = ({
  rowIndex,
  index,
  item,
}: {
  rowIndex: number;
  index: number;
  item: number;
}) => void;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  view: {justifyContent: 'center', flex: 1},
  resultView: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  lottieView: {
    height: 100,
    width: 100,
  },
  iconView: {
    position: 'absolute',
    top: 38,
    left: 38,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.lemonYellow,
    width: '100%',
  },
  buttonText: {
    color: colors.midnightDark,
    fontSize: 20,
    alignSelf: 'center',
    paddingVertical: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
});

const Game: FC<Props> = ({route}) => {
  const theme = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const arrayLength = route.params?.arrayLength || 3;
  const defaultState = getCleanTable(arrayLength);
  const [boardState, setBoardState] = useState(defaultState);
  const [player, setPlayer] = useState(1);
  const [victory, setVictory] = useState(false);
  const [currentWinner, setCurrentWinner] = useState(0);
  const [victoryCount, setVictoryCount] = useState({player1: 0, player2: 0});
  const animatedColor = useRef(new Animated.Value(1)).current;

  const backgroundColor = animatedColor.interpolate({
    inputRange: [1, 2],
    outputRange: [colors.lightTurchese, colors.cerisePink],
  });
  const handleStartNewGame = () => {
    setBoardState(defaultState);
    setVictory(false);
    setCurrentWinner(0);
  };

  useEffect(() => {
    if (victory) {
      setCurrentWinner(player);
    }
  }, [victory, player]);
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
  }, [player, animatedColor]);

  const handlePressTile: HandlePressTile =
    ({rowIndex, index, item}) =>
    () => {
      const itemIndex = index;
      if (item !== 0) {
        return null;
      }
      const newRowState: Array<number> = [];
      boardState[rowIndex].map((rItem, rIndex) => {
        if (rIndex === itemIndex) {
          newRowState.push(player);
        } else {
          newRowState.push(rItem);
        }
      });
      const newState: Array<Array<number>> = [];
      boardState.map((bItem, bIndex) => {
        if (bIndex === rowIndex) {
          newState.push(newRowState);
        } else {
          newState.push(bItem);
        }
      });

      setBoardState(newState);
      const isVictory: boolean | undefined = checkVictory(newState);
      if (isVictory) {
        setVictory(true);
        if (player === 1) {
          setVictoryCount({
            player1: victoryCount.player1 + 1,
            player2: victoryCount.player2,
          });
        } else {
          setVictoryCount({
            player1: victoryCount.player1,
            player2: victoryCount.player2 + 1,
          });
        }
        return;
      }
      if (player === 1) {
        setPlayer(2);
      } else if (player === 2) {
        setPlayer(1);
      }
    };

  return (
    <Animated.View style={[styles.flex, {backgroundColor: backgroundColor}]}>
      <WinnerModal winner={currentWinner} />
      <View style={styles.view}>
        <Board
          boardState={boardState}
          onPressTile={handlePressTile}
          pressTileDisabled={victory}
        />
        <View
          style={[
            styles.resultView,
            {
              backgroundColor:
                theme === 'dark' ? colors.midnightDark : colors.simpleWhite,
            },
          ]}>
          <View>
            {currentWinner === 1 ? (
              <LottieView
                style={styles.lottieView}
                source={require('../../assets/celebration.json')}
                autoPlay
                loop
              />
            ) : (
              <View style={styles.lottieView} />
            )}
            <View style={styles.iconView}>
              <FontAwesomeIcon
                size={24}
                icon={faUser}
                color={colors.lightTurchese}
              />
            </View>
          </View>
          <Text
            style={[
              styles.text,
              {
                color: colors.lightTurchese,
              },
            ]}>
            {victoryCount.player1.toString()}
          </Text>

          <Text
            style={[
              styles.text,
              {
                color: colors.cerisePink,
              },
            ]}>
            {victoryCount.player2.toString()}
          </Text>
          <View>
            {currentWinner === 2 ? (
              <LottieView
                style={styles.lottieView}
                source={require('../../assets/celebration.json')}
                autoPlay
                loop
              />
            ) : (
              <View style={styles.lottieView} />
            )}
            <View style={styles.iconView}>
              <FontAwesomeIcon
                size={24}
                icon={faUser}
                color={colors.cerisePink}
              />
            </View>
          </View>
        </View>
      </View>

      <Pressable onPress={handleStartNewGame} style={styles.button}>
        <Text
          style={[
            styles.buttonText,
            insets.bottom
              ? {
                  paddingBottom: insets.bottom,
                }
              : null,
          ]}>
          New game
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default Game;
