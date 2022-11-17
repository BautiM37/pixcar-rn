import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// importar vistas para el Tab
import Login from './src/screens/Login';
import Register from './src/screens/Register';

// importar Tab Navigator
import Navegador from './src/screens/Navegador';

import MiPerfil from './src/screens/MiPerfil';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
        <Stack.Screen name='Navegador' component={Navegador} />
        <Stack.Screen name='MiPerfil' component={MiPerfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}