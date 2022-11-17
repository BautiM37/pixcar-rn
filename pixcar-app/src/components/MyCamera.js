import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { storage } from '../firebase/config';

const styles = StyleSheet.create({
    cameraBody : {
        flex: 1,
        height: '400px',
        width: '400px',
    },
    contenedor: {
        flex: 1
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
            <View>
                {
                    this.state.permisos == true ?
                        this.state.mostrarCamara == false ?
                            <View style={styles.contenedor}>

                                <Image style={styles.preview}
                                    source={{ uri: this.state.photo }}
                                />
                                <View style={styles.buttonArea}>

                                    <TouchableOpacity onPress={() => this.guardarFoto()}>
                                        <Text>Aceptar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.borrarFoto()}>
                                        <Text>Rechazar</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            :
                            <View style={styles.contenedor}>
                                <Camera
                                    style={styles.cameraBody}
                                    type={Camera.Constants.Type.front}
                                    ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                                />
                                <TouchableOpacity
                                    style={styles.shootButton}
                                    onPress={() => this.tomarFoto()}>
                                    <Text>Tomar foto</Text>
                                </TouchableOpacity>

                            </View>
                        :
                        <Text>Habilitá la camara desde los ajustes de tu smartphone</Text>
                }
            </View>
        )
    }
}

export default MyCamera;