import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { auth, db } from '../firebase/config.js';
import MyCamera from "../components/MyCamera";

const styles = StyleSheet.create({
    cameraBody: {
        flex: 1
    },
    photo: {
        width: '200px',
        height: '200px'
    },
    contenedor: {
        backgroundColor: 'white',
        flex: 1,
        width: '100vw',
        padding: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
})

class Postear extends Component {
    constructor() {
        super()
        this.state = {
            showCamera: true,
            urlFoto: '',
            error: '',
            posteo: ''
        }
    }

    crearPost() {
        db.collection('posteos').add({
            email: auth.currentUser.email,
            createdAt: Date.now(),
            likes: [],
            comentarios: [],
            imagen: this.state.urlFoto,
            descripcion: this.state.posteo
        })

            .then(() => {
                this.props.navigation.navigate('Home')
                this.setState({
                    showCamera: true,
                    posteo: ''
                })
            })
            .catch(error => {
                this.setState({ error: error.message }),
                    console.log(error)
            })
    }

    onImageUpload(url) {
        this.setState({
            urlFoto: url,
            showCamera: false
        });
    }

    render() {
        return (
            <View style={styles.contenedor}>
                {
                    this.state.showCamera == true ?
                        <MyCamera onImageUpload={(url) => this.onImageUpload(url)} style={styles.cameraBody} />
                        :
                        <View>

                            <Image style={styles.photo} source={{ uri: this.state.urlFoto }} />
                            <TextInput
                                keyboardType='default'
                                placeholder='descripcion'
                                onChangeText={text => this.setState({ posteo: text })}
                                value={this.state.posteo}
                            />

                            <TouchableOpacity onPress={() => { this.crearPost(); this.props.navigation.navigate('Home') }}>
                                <Text>Agregar Posteo</Text>
                            </TouchableOpacity>

                        </View>
                }

            </View>
        )
    }

}

export default Postear;