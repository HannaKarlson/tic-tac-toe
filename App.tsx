import React, {createContext} from 'react';
import {useColorScheme} from 'react-native';

import Game from './src/components/Game';
import SelectGame from './src/components/SelectGame';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from './src/theme/colors';
import type {RootStackParamList} from './src/types/navigationTypes';
import type {ColorScheme} from './src/types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ThemeContext = createContext<ColorScheme>('light');

function App(): React.JSX.Element {
  const colorScheme: ColorScheme = useColorScheme() || 'light';

  return (
    <NavigationContainer>
      <ThemeContext.Provider value={colorScheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.lemonYellow,
            },
            headerShadowVisible: false,
            headerTintColor: colors.midnightDark,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="SelectGame"
            component={SelectGame}
            options={{title: 'Select board'}}
          />
          <Stack.Screen name="Game" component={Game} options={{title: ''}} />
        </Stack.Navigator>
      </ThemeContext.Provider>
    </NavigationContainer>
  );
}

export default App;
