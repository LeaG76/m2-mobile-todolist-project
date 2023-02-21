import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { mainScreen }  from "./src/MainScreen";
import { todoScreen }  from "./src/TodoScreen";
import { styles } from "./StyleSheet";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Todos" component={mainScreen}></Stack.Screen>
            <Stack.Screen name="Add Todo" component={todoScreen}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      );
}