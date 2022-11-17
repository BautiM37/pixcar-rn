import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { auth, db } from '../firebase/config.js';
import MyCamera from '../components/MyCamera.js';

// Styles
const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        width: '100vw'
    },
    camara: {
        flex: 1
    },
    photo: {
        width: '200px',
        height: '200px'
    },
    contenedorCamara: {
        flex: 1
    },
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
        margin: '1.5vw',
        marginTop: '5px',
        marginBottom: '5px',
        fontStyle: 'italic'
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
            esconderError: true,
            urlFoto: '',
            showCamera: true
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    logueado: true
                })
                this.props.navigation.navigate('Navegador')
            }
        })
    }

    camposObligatorios() {
        this.state.email == '' || this.state.contrasena.length < 8 || this.state.nombreUsuario.length < 3 ?
            this.setState({ esconderError: false })
            :
            this.setState({ esconderError: true })
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
                    timestamp: Date.now(),
                    foto: this.state.urlFoto
                })
            })
            .then(() => { this.props.navigation.navigate('Navegador') })
            .catch(error => {
                this.setState({ error: error.message })
            })
        { console.log(this.state.urlFoto) }
    }

    onImageUpload(url) {
        this.setState({
            urlFoto: url,
            showCamera: false
        });
        { console.log(this.state.urlFoto) }
    }

    // NOTAS/IDEAS SOLUCION QUE NO SE UPLODEA EL URL AL FIREBASE
    // Hay que poner algun boton de aceptar o repetir foto

    render() {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>¿No tenés cuenta? ¡Registrate!</Text>
                <View style={styles.contenedor}>
                    <View style={styles.contenedorCamara}>

                    {
                        this.state.showCamera == true ?
                            <View style={styles.camara}>
                                <MyCamera onImageUpload={(url) => this.onImageUpload(url)} style={styles.camara} />
                            </View>
                            :
                            <Image style={styles.photo} source={{ uri: this.state.urlFoto }} />
                    }
                    </View>
                    <TextInput style={styles.inputs} maxLength='20'
                        keyboardType='default'
                        placeholder='nombre de usuario *'
                        onChangeText={text => this.setState({ nombreUsuario: text })}
                        value={this.state.nombreUsuario}
                    />
                    {
                        this.state.nombreUsuario.length < 3 ?
                            <Text style={
                                styles.infoMal
                            }>Debe tener al menos 3 caracteres</Text>
                            :
                            <Text style={styles.infoBien}>¡Perfecto!</Text>
                    }
                    <TextInput style={styles.inputs}
                        keyboardType='email-address'
                        placeholder='email *'
                        onChangeText={text => {
                            this.setState({ email: text })
                        }}
                        value={this.state.email}
                    />
                    <TextInput style={styles.inputs}
                        keyboardType='default'
                        placeholder='contraseña *'
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ contrasena: text })}
                        value={this.state.contrasena}
                    />
                    {
                        this.state.contrasena.length < 8 ?
                            <Text style={

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
                    <Text style={styles.asterisco}>*campo obligatorio</Text>
                    {
                        this.state.error.length != 0 ?
                            <Text style={styles.error}>Error: {this.state.error}</Text>
                            :
                            <View></View>
                    }

                    <TouchableOpacity onPress={() => this.camposObligatorios()} disabled={this.state.email == '' || this.state.contrasena.length < 8 || this.state.nombreUsuario.length < 3 ? true : false} style={styles.botonRegistro}>
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