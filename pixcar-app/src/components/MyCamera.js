import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { storage } from '../firebase/config';

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        width: '100vw',
        backgroundColor: 'rgb(28, 35, 43)',
    },
    cameraBody: {
        height: '400px',
        width: '400px',
    },
    cont: {
        height: '400px',
        margin: '1.5vw',
        textAlign: 'center',
    },
    infoMal: {
        color: 'red',
        margin: '1.5vw',
        marginTop: '5px',
        marginBottom: '5px'
    },
    boton: {
        height: '15px'
    },
    input: {
        width: '100%',
        textAlign: 'center'
    },
    textoBoton: {
        color: 'rgb(0, 193, 203)',
        marginTop: '15px',
        fontWeight: 'bold',
        fontSize: '20px'
    }
})

class MyCamera extends Component {
    constructor(props) {
        super(props)
        this.state = {
            permisos: false,
            error: '',
            photo: '',
            mostrarCamara: true
        }
        this.metodosDeCamara = undefined
    }

    componentDidMount() {
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

    tomarFoto() {
        this.metodosDeCamara.takePictureAsync()
            .then(photo => {
                this.setState({
                    photo: photo.uri, //Es una uri interna temporal de la foto.
                    mostrarCamara: false
                })
            })
    }

    guardarFoto() {
        fetch(this.state.photo)
            .then(res => res.blob())
            .then(image => {
                const ref = storage.ref(`photos/${Date.now()}.jpg`)
                ref.put(image)
                    .then(() => {
                        ref.getDownloadURL()
                            .then(url => {
                                this.props.onImageUpload(url);
                            })
                    })
            })
            .catch(error => {
                this.setState({ error: error.message }),
                    console.log(error)
            })
    }

    borrarFoto() {
        this.setState({
            photo: '',
            mostrarCamara: true
        })
    }
    render() {
        return (
            <View style={styles.contenedor}>

                {
                    this.state.permisos == true ?
                        this.state.mostrarCamara == false ?
                            <View style={styles.cont}>
                                <Image
                                    style={styles.cameraBody}
                                    source={{ uri: this.state.photo }}
                                />
                                <View>
                                    <TouchableOpacity onPress={() => this.guardarFoto()}>
                                        <Text style={styles.textoBoton}>Usar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.borrarFoto()}>
                                        <Text style={styles.textoBoton}>Borrar</Text>
                                    </TouchableOpacity>
                                </View>
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
        )
    }
}

export default MyCamera;