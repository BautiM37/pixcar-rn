import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import Comentarios from './Comentarios';

const Stack = createNativeStackNavigator();

class StackHome extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='Comentarios' component={Comentarios} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}

export default StackHome;