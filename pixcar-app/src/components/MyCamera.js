import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { storage } from '../firebase/config';

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        width: '100vw'
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
                                        <Text>Siguiente</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.borrarFoto()}>
                                        <Text>Borrar</Text>
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
                                        <Text style={styles.input}>Tomar foto</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        :
                        <Text>Habilitá la camara desde los ajustes de tu smartphone</Text>
                }
            </View>
        )
    }
}

export default MyCamera;