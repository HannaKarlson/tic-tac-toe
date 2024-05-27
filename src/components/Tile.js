import React from 'react'
import {View, TouchableOpacity} from 'react-native'


const Tile = ({containerStyle, style, onPress}) => {
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
}

export default Tile