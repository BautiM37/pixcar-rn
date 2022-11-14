import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-web';
import { auth, db } from '../firebase/config.js';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            contrasena: '',
            obligatoriosLlenos: false,
            logueado: false,
            error: []
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if(user) {
                this.setState({
                    logueado: true
                })
                this.props.navigation.navigate('Navegador')
            }
        })
    }

    camposObligatorios() {
        this.state.email == '' || this.state.contrasena == '' ?
            this.setState({ obligatoriosLlenos: false })
            :
            this.setState({ obligatoriosLlenos: true })
        this.login()
    }

    login() {
        auth.signInWithEmailAndPassword(this.state.email, this.state.contrasena)
            .then(response => {
                this.setState({ logueado: true })
                this.props.navigation.navigate('Navegador')
            })
            .catch(error =>
                this.setState({ error: error.message })
            )
    }

    recordarme() {

    }

    render() {
        return (
            <View>
                <Text>Iniciá sesión</Text>
                <TextInput
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput
                    keyboardType='default'
                    placeholder='contraseña'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ contrasena: text })}
                    value={this.state.contrasena}
                />

{
                    this.state.email == '' || this.state.contrasena == '' ?
                        <Text>Tenés que completar tu email y contraseña para iniciar sesión</Text>
                        :
                        <Text>Ya podés probar iniciar sesión :)</Text>
                }

                <TouchableOpacity onPress={() => this.camposObligatorios()}>
                    <Text>Iniciar sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <Text>No tengo una cuenta</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default Login;