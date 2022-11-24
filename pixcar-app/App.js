import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// importar vistas para el Tab
import Login from './src/screens/Login';
import Register from './src/screens/Register';

// importar Tab Navigator
import Navegador from './src/screens/Navegador';
import StackHome from './src/screens/StackHome';
import Comentarios from './src/screens/Comentarios';
import MiPerfil from './src/screens/MiPerfil';
import Buscador from './src/screens/Buscador';
import StackPerfilOtro from './src/screens/StackPerfilOtro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false, contentStyle: {backgroundColor: 'rgb(28, 35, 43)'}}}/>
        <Stack.Screen name='Register' component={Register} options={{headerShown: false, contentStyle: {backgroundColor: 'rgb(28, 35, 43)'}}}/>
        <Stack.Screen name='Navegador' component={Navegador} options={{headerShown: false}}/>
        <Stack.Screen name='MiPerfil' component={MiPerfil} options={{headerShown:false}} />
        <Stack.Screen name='Comentarios' component={Comentarios} options={{headerShown: false}}/>
        <Stack.Screen name='Buscador' component={Buscador} options={{headerShown: false}}/>
        <Stack.Screen name='StackPerfilOtro' component={StackPerfilOtro} options={{headerShown: false}}/>
        <Stack.Screen name='StackHome' component={StackHome} options={{headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}