import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Perfil from './Perfil';
import Buscador from './Buscador';

const Stack = createNativeStackNavigator();

class StackPerfilOtro extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name='Buscador' component={Buscador} options={{ headerShown: false }} />
                <Stack.Screen name='Perfil' component={Perfil} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}

export default StackPerfilOtro;