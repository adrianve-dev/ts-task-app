import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';
import MainScreen from './screens/MainScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { View, Text } from './components/Themed';
import useTheme from './hooks/useTheme';
import { styles } from './styles';

export type RootStackParamList = {
  Tasks: undefined
  AddTask: undefined
};

export default function App() {

  const theme = useTheme()

  const RootStack = createNativeStackNavigator<RootStackParamList>()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{headerTransparent: true}} initialRouteName='Tasks'>
          <RootStack.Screen name='Tasks' component={MainScreen} options={{ headerShown: false}} />
          <RootStack.Group screenOptions={{presentation: 'modal'}}>
            <RootStack.Screen name='AddTask' component={AddTaskScreen} options={{headerShown: false}} />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}