import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../firebase/config'

class MiPerfil extends Component {
    constructor(props) {
        super(props)
        this.state={

        }
    }

    logout() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

    render() {
        return(
            <View>
                <Text>Mi Perfil</Text>
                <TouchableOpacity onPress={() => this.logout()}>
                    <Text>Cerrar sesión</Text>
                </TouchableOpacity>
    
            </View>
        )
    }

}

export default MiPerfil;