import { StyleSheet, Text, View } from 'react-native';
import React, {Component}from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons } from '@expo/vector-icons';

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
            <Tab.Screen name="StackHome" component= {StackHome} options={{tabBarIcon: () => <Entypo name="home" size={24} color="black" />}}/>
            <Tab.Screen name="MiPerfil" component= {MiPerfil} options={{tabBarIcon: () => <Ionicons name="person-circle" size={24} color="black" />}}/>
            <Tab.Screen name="Postear" component= {Postear} options={{tabBarIcon: () => <Ionicons name="ios-camera" size={24} color="black" />}}/>
            <Tab.Screen name="StackPerfilOtro" component= {StackPerfilOtro} options={{tabBarIcon: () => <Ionicons name="ios-search" size={24} color="black" />}}/>
        </Tab.Navigator>
    
    
    );
    }
}

const styles = StyleSheet.create({
  
});

export default Navegador
