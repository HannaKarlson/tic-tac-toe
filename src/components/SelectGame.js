import React from 'react'
import {View, Text, TouchableOpacity, Dimensions} from 'react-native'
import { getTable } from '../utils.js/getTable'
import { getTileColor } from './Board'
import { colors } from '../theme/colors'

const deviceHeight = Dimensions.get('screen').height

const width = deviceHeight/4
const easyGame = getTable(3)
const mediumGame = getTable(6)
const difficultGame = getTable(9)
console.log(easyGame)
console.log({difficultGame})

const allRows = (game, navigation) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Board', {arrayLength:game.length})} style={{width:width}}>
        {game.map((row, rowIndex) => {
          return (
            <View style={{flexDirection: 'row', backgroundColor: colors.midnightDark}}>
              {row.map((item, index) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor:'white',
                      height: width / game.length,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                >
                    <View
                      style={{
                        backgroundColor: getTileColor(item),
                        height: width / (game.length*1.2),
                        width: width / (game.length*1.2),
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


const SelectGame = ({navigation}) => {
    return(
        <View style={{backgroundColor:colors.lemonYellow, flex:1, alignItems:'center', justifyContent:'space-around',}}>
            {allRows(easyGame, navigation)}
            {allRows(mediumGame, navigation)}
            {allRows(difficultGame, navigation)}
        </View>
    )
}

export default SelectGame

