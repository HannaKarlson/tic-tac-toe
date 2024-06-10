import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  SelectGame: undefined;
  Game: {arrayLength: number};
};

export type SelectGameScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SelectGame'
>;
