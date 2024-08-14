import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Signup, Signin } from '../screens';
import HomeScreen from '../screens/Home';
import CategoryScreens from '../components/CategoryScreens';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signin" component={Signin} options={{headerShown:false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="CategoryScreens" component={CategoryScreens} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
