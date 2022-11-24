import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {auth} from '../firebase/config'
import firebase from 'firebase'
import { TextInput } from 'react-native-gesture-handler';
import Comentarios from '../screens/Comentarios'

class CadaComentario extends Component{
    constructor(props) {
        super(props)
        this.state ={
            cadaComment: []
        }}
        render () {
            console.log(this.props.comentario);
            return (
                <View>
                    <Text>{this.props.comentario.email}</Text>
                    <Text>{this.props.comentario.comentarioo}</Text>
                </View>
            )
        }
}

export default CadaComentario;