import React, {useState, useEffect, useRef, useContext} from 'react';
import type {FC} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  Button,
  StyleSheet,
  Animated,
  Modal,
  KeyboardAvoidingViewComponent,
  SafeAreaView,
  Platform,
} from 'react-native';
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
import winner from '../../assets/winner.json';
import thisOne from '../../assets/thisOne.json';
import celebration from '../../assets/celebration.json';
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

const Game: FC<Props> = ({route}) => {
  const theme = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const arrayLength = route.params?.arrayLength || 3;
  const arr = new Array(arrayLength).fill(0);
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

  const handlePressTile: HandlePressTile =
    ({rowIndex, index, item}) =>
    () => {
      const itemIndex = index;
      if (item !== 0) {
        return null;
      }
      const newRowState: Array<number> = [];
      boardState[rowIndex].map((item, index) => {
        if (index === itemIndex) {
          newRowState.push(player);
        } else {
          newRowState.push(item);
        }
      });
      const newState: Array<Array<number>> = [];
      boardState.map((item, index) => {
        if (index === rowIndex) {
          newState.push(newRowState);
        } else {
          newState.push(item);
        }
      });

      setBoardState(newState);
      const victory: boolean | undefined = checkVictory(newState);
      if (victory) {
        const addVictory1 = player === 1 ? 1 : 0;
        const addVictory2 = player === 2 ? 1 : 0;
        setVictory(victory);
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
    <Animated.View style={{flex: 1, backgroundColor: backgroundColor}}>
      <WinnerModal winner={currentWinner} />
      <View style={{justifyContent: 'center', flex: 1}}>
        <Board
          boardState={boardState}
          onPressTile={handlePressTile}
          pressTileDisabled={victory}
        />
        <View
          style={{
            flexDirection: 'row',
            backgroundColor:
              theme === 'dark' ? colors.midnightDark : colors.simpleWhite,
            alignItems: 'center',
            justifyContent: 'space-around',
            borderWidth: 1,
            borderColor:
              theme === 'dark' ? colors.simpleWhite : colors.midnightDark,
          }}>
          <View>
            {currentWinner === 1 ? (
              <LottieView
                style={{
                  height: 100,
                  width: 100,
                }}
                source={require('../../assets/celebration.json')}
                autoPlay
                loop
              />
            ) : (
              <View
                style={{
                  height: 100,
                  width: 100,
                }}
              />
            )}
            <View style={{position: 'absolute', top: 38, left: 38}}>
              <FontAwesomeIcon
                size={24}
                icon={faUser}
                color={colors.lightTurchese}
              />
            </View>
          </View>
          <Text
            style={{
              fontSize: 24,
              color: colors.lightTurchese,
              fontWeight: 'bold',
            }}>
            {victoryCount.player1.toString()}
          </Text>

          <Text
            style={{
              fontSize: 24,
              color: colors.cerisePink,
              fontWeight: 'bold',
            }}>
            {victoryCount.player2.toString()}
          </Text>
          <View>
            {currentWinner === 2 ? (
              <LottieView
                style={{
                  height: 100,
                  width: 100,
                }}
                source={require('../../assets/celebration.json')}
                autoPlay
                loop
              />
            ) : (
              <View
                style={{
                  height: 100,
                  width: 100,
                }}
              />
            )}
            <View style={{position: 'absolute', top: 38, left: 38}}>
              <FontAwesomeIcon
                size={24}
                icon={faUser}
                color={colors.cerisePink}
              />
            </View>
          </View>
        </View>
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
            paddingBottom: insets.bottom ? insets.bottom : 20,
            fontWeight: 'bold',
          }}>
          New game
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Game;
