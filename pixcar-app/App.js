import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// importar vistas para el Tab
import Login from './src/screens/Login';
import Register from './src/screens/Register';

// importar Tab Navigator
import Navegador from './src/screens/Navegador';
import Perfil from './src/screens/Perfil';
import Comentarios from './src/screens/Comentarios';
import Home from './src/screens/Home';
import MiPerfil from './src/screens/MiPerfil';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false, contentStyle: {backgroundColor: 'rgb(28, 35, 43)'}}}/>
        <Stack.Screen name='Register' component={Register} options={{headerShown: false, contentStyle: {backgroundColor: 'rgb(28, 35, 43)'}}}/>
        <Stack.Screen name='Navegador' component={Navegador} options={{headerShown: false}}/>
        <Stack.Screen name='Perfil' component={Perfil} options={{headerShown: false}}/>
        <Stack.Screen name='MiPerfil' component={MiPerfil} options={{headerShown:false}} />
        <Stack.Screen name='Comentarios' component={Comentarios} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}