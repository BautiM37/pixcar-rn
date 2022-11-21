import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { auth, db, storage } from '../firebase/config.js';
import { Camera } from 'expo-camera';

// Styles
const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        width: '100vw'
    },
    camara: {
        flex: 1
    },
    cameraBody: {
        flex: 1,
        height: '400px',
        width: '400px',
    },
    cont: {
        flex: 1
    },
    boton: {
        flex: 1
    },
    input: {
        width: '100%',
        textAlign: 'center'
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
            showCamera: true,
            permisos: false,
        }
        this.metodosDeCamara = undefined
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
        Camera.requestCameraPermissionsAsync()
            .then(() => {
                this.setState({
                    permisos: true,
                })
            })
            .catch(error => {
                this.setState({ error: error.message }),
                    console.log(error)
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
                console.log(this.state.urlFoto);
                db.collection('usuarios').add({
                    mail: auth.currentUser.email,
                    nombre: this.state.nombreUsuario,
                    bio: this.state.bio,
                    timestamp: Date.now(),
                    foto: this.state.urlFoto
                })
            })
            .then(() => this.guardarFoto())
            .catch(error => {
                this.setState({ error: error.message })
            })
    }

    onImageUpload(url) {
        console.log(url);
        this.setState({
            urlFoto: url,
            showCamera: false
        });
    }

    // subirImagen() {
    //     db.collection('usuarios').where('mail', '==', this.state.email).update({
    //         foto: this.state.urlFoto
    //     })

    //         .catch(error => {
    //             this.setState({ error: error.message })
    //         })
    // }

    borrarFoto() {
        this.setState({
            urlFoto: '',
            showCamera: true
        })
    }

    guardarFoto() {
        fetch(this.state.urlFoto)
            .then(res => res.blob())
            .then(image => {
                const ref = storage.ref(`photos/${Date.now()}.jpg`)
                ref.put(image)
                    .then(() => {
                        ref.getDownloadURL()
                            .then(url => {
                                this.onImageUpload(url);
                            })
                    })
            })
            .then(() => { this.props.navigation.navigate('Navegador') })
            .catch(error => {
                this.setState({ error: error.message }),
                    console.log(error)
            })
    }

    tomarFoto() {
        this.metodosDeCamara.takePictureAsync()
            .then(photo => {
                this.setState({
                    urlFoto: photo.uri, //Es una uri interna temporal de la foto.
                    showCamera: false
                })
            })
    }

    render() {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>¿No tenés cuenta? ¡Registrate!</Text>
                <View style={styles.contenedor}>
                    <View style={styles.contenedorCamara}>

                        <View style={styles.contenedor}>

                            {
                                this.state.permisos == true ?
                                    this.state.showCamera == false ?
                                        <View style={styles.cont}>
                                            <Image
                                                style={styles.cameraBody}
                                                source={{ uri: this.state.urlFoto }}
                                            />

                                            <TouchableOpacity onPress={() => this.borrarFoto()}>
                                                <Text>Borrar</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View style={styles.cont}>
                                            <Camera
                                                style={styles.cameraBody}
                                                type={Camera.Constants.Type.front}
                                                ref={(metodos) => this.metodosDeCamara = metodos}
                                            />
                                            <View style={styles.boton}>
                                                <TouchableOpacity onPress={() => this.tomarFoto()}>
                                                    <Text>Tomar foto</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    :
                                    <Text>Habilitá la camara desde los ajustes de tu smartphone</Text>
                            }
                        </View>
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