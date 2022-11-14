import { StyleSheet, Text, View } from 'react-native';
import React, {Component}from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator()

// importar vistas
import MiPerfil from './MiPerfil';
import Home from './Home';
import Postear from './Postear';

class Navegador extends Component {
        constructor(){
            super()
            this.state={
                logueado : false
            }
        }
    render(){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component= {()=>(<Home/>)} />
            <Tab.Screen name="Perfil" component= {()=>(<MiPerfil/>)}/>
            <Tab.Screen name="Postear" component= {()=>(<Postear/>)} />
        </Tab.Navigator>
    
    
    );
    }
}

const styles = StyleSheet.create({
  
});

export default Navegador