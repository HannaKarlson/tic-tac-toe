
import React from 'react';
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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './src/theme/colors';
import type { RootStackParamList } from './src/types/navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: Colors.darker//isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
   <NavigationContainer>
    <Stack.Navigator
     screenOptions={{
      headerStyle: {
        backgroundColor: colors.lemonYellow,
      },
      headerShadowVisible:false,
      headerTintColor: colors.midnightDark,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen name='SelectGame' component={SelectGame} options={{ title: 'Select board' }}/>
      <Stack.Screen name='Game' component={Game} options={{ title: '' }}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
}

export default App;
