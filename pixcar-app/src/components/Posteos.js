import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {db} from '../firebase/config'
import firebase from 'firebase';
import 'firebase/firestore'
class Posteos extends Component {
    constructor(props) {
        super(props)
        this.state={

        }
    }
    likear(){
        let posteo=db.collection('Posteos').doc(this.props.data.item.id)
        posteo.update({
            Likes: firebase.firestore.FieldValue.arrayUnion(1)

        })
    }
    render() {
       let data=this.props.data.item.data
       
        return(
            <View>
                <Text>Titulo: {data.Titulo}</Text>
                <Text>Descripcion: {data.Descripcion}</Text>
                <Text>Likes: {data.Likes.length}</Text>
                <TouchableOpacity onPress={()=>this.likear()}>
                    <text> Añadir Like </text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default Posteos;