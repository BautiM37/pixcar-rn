import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { auth, db } from '../firebase/config.js';

const styles = StyleSheet.create({
    titulo: {
        backgroundColor: 'rgb(99, 166, 199)',
        margin: '1.5vw',
        borderRadius: '5px',
        padding: '5vw',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '20px'
    },
    inputs: {
        backgroundColor: 'rgb(137, 180, 201)',
        margin: '1.5vw',
        borderRadius: '5px',
        padding: '2.5vw',
    },
    infoMal: {
        color: 'red',
        margin: '1.5vw',
        marginTop: '5px',
        marginBottom: '5px'
    },
    infoBien: {
        color: 'green',
        margin: '1.5vw',
        marginTop: '5px',
        marginBottom: '5px'
    },
    ocultarInfo: {
        display: 'none'
    },
    faltanCampos: {
        color: 'red',
        textAlign: 'center',
        marginTop: '20px',
        marginBottom: '20px'
    },
    camposCompletos: {
        color: 'green',
        textAlign: 'center',
        marginTop: '20px',
        marginBottom: '20px'
    },
    asterisco: {
        marginLeft: '2vw',
        fontStyle: 'italic',
        marginTop: '5px',
        marginBottom: '5px'
    },
    error: {
        textAlign: 'center',
        marginLeft: '1.5vw',
        color: 'red'
    },
    botonLogin: {
        backgroundColor: 'rgb(99, 166, 199)',
        margin: '1.5vw',
        borderRadius: '5px',
        padding: '5vw',
        textAlign: 'center',
        marginBottom: '20px',
        width: '50vw',
        border: '2px solid black',
        marginLeft: '25vw'
    },
    botonLink: {
        marginLeft: '33vw'
    }
})

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

    render() {
        return (
            <View>
                <Text style={styles.titulo}>Iniciá sesión</Text>
                <TextInput style={styles.inputs}
                    keyboardType='email-address'
                    placeholder='email *'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                    />
                <TextInput style={styles.inputs}
                    keyboardType='default'
                    placeholder='contraseña *'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ contrasena: text })}
                    value={this.state.contrasena}
                    />

                <Text style={styles.asterisco}>*campo obligatorio</Text>
                {
                this.state.error.length != 0 ?
                <Text style={styles.error}>Error: {this.state.error}</Text>
                :
                <View></View>
                }

                <TouchableOpacity onPress={() => this.camposObligatorios()} disabled={this.state.email == '' || this.state.contrasena == '' ? true : false} style={styles.botonLogin}>
                    <Text>Iniciar sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.botonLink}>
                    <Text>No tengo una cuenta</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default Login;