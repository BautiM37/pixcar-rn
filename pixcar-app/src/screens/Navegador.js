import { StyleSheet, Text, View } from 'react-native';
import React, {Component}from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator()

// importar vistas
import MiPerfil from './MiPerfil';
import Home from './Home';
import Postear from './Postear';
import Buscador from './Buscador';

class Navegador extends Component {
        constructor(){
            super()
            this.state={
                logueado : false
            }
        }

    render(){
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {backgroundColor: 'rgb(230, 230, 230)'},
            headerShown: false
        }}>
            <Tab.Screen name="Home" component= {Home}/>
            <Tab.Screen name="MiPerfil" component= {MiPerfil}/>
            <Tab.Screen name="Postear" component= {Postear} />
            <Tab.Screen name="Buscador" component= {Buscador}/>
        </Tab.Navigator>
    
    
    );
    }
}

const styles = StyleSheet.create({
  
});

export default Navegador
