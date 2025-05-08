import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import HistoryScreen from '../screens/HistoryScreen';

const HistoryNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HistoryScreen">
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HistoryNavigator;
