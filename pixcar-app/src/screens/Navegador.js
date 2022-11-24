import { StyleSheet, Text, View } from 'react-native';
import React, {Component}from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator()

// importar vistas
import MiPerfil from './MiPerfil';
import StackHome from './StackHome';
import Postear from './Postear';
import StackPerfilOtro from './StackPerfilOtro';

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
            headerShown: false,
        }}>
            <Tab.Screen name="StackHome" component= {StackHome}/>
            <Tab.Screen name="MiPerfil" component= {MiPerfil}/>
            <Tab.Screen name="Postear" component= {Postear} />
            <Tab.Screen name="StackPerfilOtro" component= {StackPerfilOtro}/>
        </Tab.Navigator>
    
    
    );
    }
}

const styles = StyleSheet.create({
  
});

export default Navegador
