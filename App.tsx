import React, {useContext, createContext} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Game from './src/components/Game';
import Board from './src/components/Board';
import SelectGame from './src/components/SelectGame';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from './src/theme/colors';
import type {RootStackParamList} from './src/types/navigationTypes';
import type {ColorScheme} from './src/types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export const ThemeContext = createContext<ColorScheme>('light');

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
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
