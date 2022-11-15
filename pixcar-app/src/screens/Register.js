import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-web';
import { auth, db } from '../firebase/config.js';

// Styles
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
    botonRegistro: {
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

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            registrado: false,
            error: [],
            email: '',
            contrasena: '',
            nombreUsuario: '',
            bio: '',
            obligatoriosLlenos: false,
            emailValido: false,
            esconderError: true
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

    validarMail(text) {
        text.includes('@') && text.includes('.') ?
        this.setState({ emailValido: true })
        :
        this.setState({ emailValido: false })
    }

    camposObligatorios() {
        this.state.emailValido == false || this.state.contrasena.length < 8 || this.state.nombreUsuario == '' ?
            this.setState({ obligatoriosLlenos: false, esconderError: false })
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
            .then(() => { this.props.navigation.navigate('Login') })
            .catch(error => {
                this.setState({ error: error.message })
            })
    }

    render() {
        return (
            <View>
                <Text style={styles.titulo}>¿No tenés cuenta? ¡Registrate!</Text>
                <View>
                    <TextInput style={styles.inputs} maxLength='20'
                        keyboardType='default'
                        placeholder='nombre de usuario'
                        onChangeText={text => this.setState({ nombreUsuario: text })}
                        value={this.state.nombreUsuario}
                    />
                    <TextInput style={styles.inputs}
                        keyboardType='email-address'
                        placeholder='email'
                        onChangeText={text => {
                            this.setState({ email: text }),
                            this.validarMail(text)
                        }}
                        value={this.state.email}
                    />
                    {
                        this.state.emailValido == false ?
                            <Text style={
                                this.state.esconderError == true ?
                                styles.ocultarInfo
                                :
                                styles.infoMal
                            }>Mail inválido</Text>
                            :
                            <Text style={styles.infoBien}>¡Mail válido!</Text>
                    }
                    <TextInput style={styles.inputs}
                        keyboardType='default'
                        placeholder='contraseña'
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ contrasena: text })}
                        value={this.state.contrasena}
                    />
                    {
                        this.state.contrasena.length < 8 ?
                            <Text style={
                                this.state.esconderError == true ?
                                styles.ocultarInfo
                                :
                                styles.infoMal
                            }>Debe tener al menos 8 caracteres</Text>
                            :
                            <Text style={styles.infoBien}>¡Contraseña válida!</Text>
                    }
                    <TextInput style={styles.inputs} maxLength='45'
                        keyboardType='default'
                        placeholder='¡algo breve acerca tuyo!'
                        onChangeText={text => this.setState({ bio: text })}
                        value={this.state.bio}
                    />
                    {
                        this.state.emailValido == false || this.state.contrasena.length < 8 || this.state.nombreUsuario == '' ?
                            <Text style={
                                this.state.esconderError == true ?
                                styles.ocultarInfo
                                :
                                styles.faltanCampos
                            }>Recordá completar tu email, username y contraseña </Text>
                            :
                            <Text style={styles.camposCompletos}>Campos obligatorios completados :)</Text>
                    }

                    <TouchableOpacity onPress={() => this.camposObligatorios()} style={styles.botonRegistro}>
                        <Text>¡Registrame!</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.botonLink}>
                        <Text>Ya tengo una cuenta</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

}

export default Register;