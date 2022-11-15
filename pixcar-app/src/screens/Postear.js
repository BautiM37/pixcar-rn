import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-web';
import { auth, db } from '../firebase/config.js';
import MyCamera from "../components/MyCamera";

class Postear extends Component {
    constructor() {
        super()
        this.state={
            logueado: true,
            email: '',
            likes: '',
            comentarios: '',
            description: '',
            showCamera: '',
            url: ''
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if(user) {
                this.setState({
                    logueado: false
                })
                this.props.navigation.navigate('Navegador')
            }
        })
    }

    onImageUpload(url) {
        this.setState({
            showCamera: false,
            url: url
        });
    }    

    crearPost() {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            description: this.state.description,
            createdAt: Date.now(),
            likes:[],
            comentarios:[],
            photo: this.state.url
        })
    
    .then(() => {this.props.navigation.navigate('posteos')})
    .catch(error => {
        this.setState({ error: error.message})
    })
}
    render() {
        return(
            <View>
                <Text>¿Quiéres agregar un posteo? ¡Hazlo!</Text>
            <TextInput
             keyboardType='default'
                    placeholder='descripcion'
                    onChangeText={text => this.setState({ description: text })}
                    value={this.state.description}
                />
            <MyCamera onImageUpload={(url)=>this.onImageUpload(url)}/>
            </View>
        )
    }

}

export default Postear;