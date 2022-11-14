import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-web';
import { auth, db } from '../firebase/config.js';

// Styles
const styles = StyleSheet.create({
    main: {
        backgroundColor: 'rgb(46, 73, 153)',
        margin: '1.5vw',
        borderRadius: '20px',
        padding: '1vw'
    }
})

class Register extends Component {
    constructor() {
        super()
        this.state = {
            registrado: false,
            error: [],
            email: '',
            contrasena: '',
            nombreUsuario: '',
            bio: '',
            obligatoriosLlenos: false,
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            console.log(user)
        })
    }

    camposObligatorios() {
        this.state.email == '' || this.state.contrasena == '' || this.state.nombreUsuario == '' ?
            this.setState({ obligatoriosLlenos: false })
            :
            this.setState({ obligatoriosLlenos: true })
        this.registro()
    }

    registro() {
        auth.createUserWithEmailAndPassword(this.state.email, this.state.contrasena)
            .then(response => {
                this.setState({ registrado: true });
                db.collection('usuarios').add({
                    mail: auth.currentUser.email,
                    nombre: this.state.nombreUsuario,
                    bio: this.state.bio,
                    timestamp: Date.now()
                })
            })
            .then(() => {this.props.navigation.navigate('Login')})
            .catch(error => {
                this.setState({ error: error.message })
            })
    }

    render() {
        return (
            <View style={styles.main}>
                <Text>¿No tenés cuenta? ¡Registrate!</Text>
                <TextInput
                    keyboardType='default'
                    placeholder='nombre de usuario'
                    onChangeText={text => this.setState({ nombreUsuario: text })}
                    value={this.state.nombreUsuario}
                />
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
                <TextInput
                    keyboardType='default'
                    placeholder='¡algo acerca tuyo!'
                    onChangeText={text => this.setState({ bio: text })}
                    value={this.state.bio}
                />

                {
                    this.state.email == '' || this.state.contrasena == '' || this.state.nombreUsuario == '' ?
                        <Text>Recordá completar tu email, nombre de usuario y contraseña </Text>
                        :
                        <Text>Campos obligatorios completados :)</Text>
                }

                <TouchableOpacity onPress={() => this.camposObligatorios()}>
                    <Text>¡Registrame!</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text>Ya tengo una cuenta</Text>
                </TouchableOpacity>

            </View>
        )
    }

}

export default Register;