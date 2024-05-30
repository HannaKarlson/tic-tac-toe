import React from 'react'
import {View, Text, TouchableOpacity, Dimensions} from 'react-native'
import { getCleanTable, getShowTable,getTileColor } from '../utils/utils'
import { colors } from '../theme/colors'

const deviceHeight = Dimensions.get('screen').height

const width = deviceHeight/4
const easyGame = getShowTable(3)
const mediumGame = getShowTable(6)
const difficultGame = getShowTable(9)
const showTable = getShowTable(3)
console.log(showTable)

const allRows = (game, navigation) => {
  if(!game){
    return null
  }
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Board', {arrayLength:game.length})} style={{width:width}}>
        
        {game.map((row, rowIndex) => {

          return (
            <View key={rowIndex.toString()} style={{flexDirection: 'row', backgroundColor: colors.simpleWhite}}>
              {row.map((item, index) => {
                const itemIndex = `${rowIndex.toString()}-${index.toString()}`
                return (
                  <View
                  key={itemIndex}
                  index={itemIndex}
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor:colors.midnightDark,
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

