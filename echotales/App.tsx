import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LibraryPage from './src/LibraryPage'; // Adjust the path to where LibraryPage is located
import PlayingPage from './src/PlayingPage'; // Adjust the path to where PlayingPage is located

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Library">
        <Stack.Screen name="Library" component={LibraryPage} />
        <Stack.Screen name="Playing" component={PlayingPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;