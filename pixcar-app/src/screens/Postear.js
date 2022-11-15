import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { auth, db } from '../firebase/config.js';
import MyCamera from "../components/MyCamera";
import { TouchableOpacity } from 'react-native-gesture-handler';

class Postear extends Component {
    constructor() {
        super()
        this.state={
            logueado: false,
            email: '',
            likes: '',
            comentarios: '',
            descripcion: '',
            showCamera: '',
            url: '',
            error: []
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            console.log(user)
        })
    }

    crearPost() {
        db.collection('posteos').add({
            email: auth.currentUser.email,
            descripcion: this.state.descripcion,
            createdAt: Date.now(),
            likes:[],
            comentarios:[],
            imagen: this.state.url
        })
    
    .then(() => {this.props.navigation.navigate('Posteos')})
    .catch(error => {
        this.setState({ error: error.message})
    })


}

onImageUpload(url) {
        this.setState({
            showCamera: false,
            url: url
        });
    }    

    render() {
        return(
            <View>
                <Text>¿Quiéres agregar un posteo? ¡Hazlo!</Text>
            <TextInput
             keyboardType='default'
                    placeholder='descripcion'
                    onChangeText={text => this.setState({ descripcion: text })}
                    value={this.state.descripcion}
                />
                <MyCamera onImageUpload={(url)=>this.onImageUpload(url)}/>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Posteos')}>
           <Text>Agregar Posteo</Text>
            </TouchableOpacity>

            </View>
        )
    }

}

export default Postear;