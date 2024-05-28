import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  Button,
  StyleSheet,
} from 'react-native';
import Tile from '../components/Tile';

const deviceWidth = Dimensions.get('window').width;
const defaultState = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const getBackgroundColor = item => {
  if (item === 1) {
    return 'blue';
  }
  if (item === 2) {
    return 'red';
  }
};

const Board = () => {
  const [boardState, setBoardState] = useState(defaultState);
  const [player, setPlayer] = useState(1);
  const [victory, setVictory] = useState(false);
  const handleStartNewGame = () => {
    setBoardState(defaultState);
    setVictory(false);
  };
  const checkVictory = () => {
    for (let i = 0; i < boardState.length; i++) {
      for (let j = 0; j < boardState[i].length; j++) {
        if (
          //row
          (boardState[i][j] &&
            boardState[i][j] === boardState[i][j + 1] &&
            boardState[i][j + 1] === boardState[i][j + 2]) ||
          //column
          (boardState[i + 1] !== undefined &&
            boardState[i + 2] !== undefined &&
            boardState[i][j] &&
            boardState[i][j] === boardState[i + 1][j] &&
            boardState[i + 1][j] === boardState[i + 2][j]) ||
          // diagonal left
          (boardState[i][j] &&
            boardState[i + 1] !== undefined &&
            boardState[i + 2] !== undefined &&
            boardState[i][j] === boardState[i + 1][j + 1] &&
            boardState[i + 1][j + 1] &&
            boardState[i + 1][j + 1] === boardState[i + 2][j + 2]) ||
          // diagonal right
          (boardState[i][j] &&
            boardState[i - 1] !== undefined &&
            boardState[i - 2] !== undefined &&
            boardState[i][j] === boardState[i - 1][j + 1] &&
            boardState[i - 1][j + 1] === boardState[i - 2][j + 2])
        ) {
          return setVictory(true);
        }
      }
    }
  };

  useEffect(() => {
    checkVictory();
  }, [boardState]);
  useEffect(() => {
    if (victory) {
      Alert.alert('you win');
    }
  }, [victory]);
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
    if (player === 1) {
      setPlayer(2);
    } else if (player === 2) {
      setPlayer(1);
    }

    const newState = [];
    boardState.map((item, index) => {
      if (index === row) {
        newState.push(newRowState);
      } else {
        newState.push(item);
      }
    });

    setBoardState(newState);
  };
  const getBackgroundColor = item => {
    if (item === 1) {
      return 'blue';
    }
    if (item === 2) {
      return 'red';
    }
  };
  const firstRow = boardState[0].map((item, index) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          borderWidth: 1,
          height: deviceWidth / 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={handlePressItem(0, index, item)}>
        <View
          style={{
            backgroundColor: getBackgroundColor(item),
            height: deviceWidth / 3.5,
            width: deviceWidth / 3.5,
            borderRadius: 100,
            overflow: 'hidden',
          }}></View>
      </TouchableOpacity>
    );
  });
  const secondRow = boardState[1].map((item, index) => (
    <TouchableOpacity
      style={{
        flex: 1,
        borderWidth: 1,
        height: deviceWidth / 3,
        alignItems: 'center',
        justifyContent: 'center',

        overflow: 'hidden',
      }}
      onPress={handlePressItem(1, index, item)}>
      <View
        style={{
          backgroundColor: getBackgroundColor(item),
          height: deviceWidth / 3.5,
          width: deviceWidth / 3.5,
          borderRadius: 100,
          overflow: 'hidden',
        }}></View>
    </TouchableOpacity>
  ));
  const thirdRow = boardState[2].map((item, index) => (
    <TouchableOpacity
      style={{
        flex: 1,
        borderWidth: 1,
        height: deviceWidth / 3,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={handlePressItem(2, index, item)}>
      <View
        style={{
          backgroundColor: getBackgroundColor(item),
          height: deviceWidth / 3.5,
          width: deviceWidth / 3.5,
          borderRadius: 100,
          overflow: 'hidden',
        }}></View>
    </TouchableOpacity>
  ));
  const rows = boardState.map(row => (
    <View style={{borderWidth: 1, height: 50, flexDirection: 'row'}}>
      {firstRow}
    </View>
  ));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: victory
          ? 'white'
          : player === 1
          ? '#add8e6'
          : '#f89494',
      }}>
      <View style={{marginTop: '20%'}}>
        <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
          {firstRow}
        </View>
        <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
          {secondRow}
        </View>
        <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
          {thirdRow}
        </View>
      </View>
      <TouchableOpacity
        onPress={handleStartNewGame}
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'green',
          width: '100%',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            alignSelf: 'center',
            paddingVertical: 20,
          }}>
          New game
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Board;
