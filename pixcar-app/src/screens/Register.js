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
    contenedor2: {
        height: '200px',
        width: '100vw',
        alignItems: 'center'
    },
    camara: {
        height: '200px'
    },
    cameraBody: {
        height: '200px',
        width: '200px',
    },
    cont: {
        height: '200px',
        margin: '1.5vw',
        textAlign: 'center',
    },
    boton: {
        height: '15px'
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
        height: '200px'
    },
    textoImp: {
        backgroundColor: 'rgb(0, 193, 203)',
        margin: '1.5vw',
        borderRadius: '5px',
        padding: '5vw',
        textAlign: 'center',
        marginBottom: '20px',
        border: '2px solid black',
        fontWeight: 'bold'
    },
    inputs: {
        border: 'solid 3px rgb(0, 193, 203)',
        backgroundColor: 'rgb(0, 0, 0)',
        color: 'rgb(0, 193, 203)',
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
        backgroundColor: 'rgb(0, 193, 203)',
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
        marginLeft: '33vw',
        marginTop: '-10px'
    },
    texto: {
        color: 'rgb(0, 0, 0)',
        fontWeight: 'bold'
    },
    textoBoton: {
        color: 'rgb(0, 193, 203)',
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
            .then(() => this.guardarFoto())
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
                <Text style={styles.textoImp}>¿No tenés cuenta? ¡Registrate!</Text>
                <View style={styles.contenedor}>

                    {/* COMIENZO CAMARA */}

                    <View style={styles.contenedorCamara}>

                        <View style={styles.contenedor2}>

                            {
                                this.state.permisos == true ?
                                    this.state.showCamera == false ?
                                        <View style={styles.cont}>
                                            <Image
                                                style={styles.cameraBody}
                                                source={{ uri: this.state.urlFoto }}
                                            />

                                            <TouchableOpacity onPress={() => this.borrarFoto()}>
                                                <Text style={styles.textoBoton}>Borrar</Text>
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
                                                    <Text style={styles.textoBoton}>Tomar foto</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    :
                                    <Text style={styles.infoMal}>Habilitá la camara desde los ajustes de tu smartphone</Text>
                            }
                        </View>
                    </View>

                    {/* FIN CAMARA, COMIENZO INPUT USERNAME */}

                    <TextInput style={styles.inputs} maxLength='20'
                        keyboardType='default'
                        placeholder='nombre de usuario *'
                        onChangeText={text => this.setState({ nombreUsuario: text })}
                        value={this.state.nombreUsuario}
                    />
                    {
                        this.state.nombreUsuario.length == 0 ?
                            <Text style={styles.infoMal}>Completá este campo</Text>
                            :
                            this.state.nombreUsuario.length < 3 ?
                                <Text style={
                                    styles.infoMal
                                }>Debe tener al menos 3 caracteres</Text>
                                :
                                <Text style={styles.infoBien}>¡Perfecto!</Text>
                    }

                    {/* COMIENZO INPUT EMAIL */}
                    <TextInput style={styles.inputs}
                        keyboardType='email-address'
                        placeholder='email *'
                        onChangeText={text => {
                            this.setState({ email: text })
                        }}
                        value={this.state.email}
                    />
                    {
                        this.state.email.length == 0 ?
                            <Text style={styles.infoMal}>Completá este campo</Text>
                            :
                            <Text style={styles.infoBien}>¡Perfecto!</Text>
                    }

                    {/* COMIENZO INPUT CONTRASEÑA */}
                    <TextInput style={styles.inputs}
                        keyboardType='default'
                        placeholder='contraseña *'
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ contrasena: text })}
                        value={this.state.contrasena}
                    />
                    {
                        this.state.contrasena.length == 0 ?
                            <Text style={styles.infoMal}>Completá este campo</Text>
                            :
                            this.state.contrasena.length < 8 ?
                                <Text style={

                                    styles.infoMal
                                }>Debe tener al menos 8 caracteres</Text>
                                :
                                <Text style={styles.infoBien}>¡Contraseña válida!</Text>
                    }

                    {/* COMIENZO INPUT BIOGRAFÍA */}
                    <TextInput style={styles.inputs} maxLength='45'
                        keyboardType='default'
                        placeholder='¡algo breve acerca tuyo!'
                        onChangeText={text => this.setState({ bio: text })}
                        value={this.state.bio}
                    />
                    {
                        this.state.error.length != 0 ?
                            <Text style={styles.error}>Error: {this.state.error}</Text>
                            :
                            <View></View>
                    }

                    <TouchableOpacity onPress={() => this.camposObligatorios()} disabled={this.state.email == '' || this.state.contrasena.length < 8 || this.state.nombreUsuario.length < 3 ? true : false} style={styles.botonRegistro}>
                        <Text style={styles.texto}>¡Registrame!</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.botonLink}>
                        <Text style={styles.textoBoton}>Ya tengo una cuenta</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

}

export default Register;