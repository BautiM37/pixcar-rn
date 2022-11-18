import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {db, auth} from '../firebase/config'
import firebase from 'firebase';
import 'firebase/firestore'

const styles = StyleSheet.create({

    photo: {
        width: '200px',
        height: '200px'
    },
})

class Posteos extends Component {
    constructor(props) {
        super(props)
        this.state={
           
        }
    }
    likear(){
        let posteo=db.collection('posteos').doc(this.props.data.item.id)
        posteo.update({
            Likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)

        })
    }
    render() {
       let data=this.props.data.item.data
       
        return(
            <View>
                <Image style={styles.photo} source={{ uri: data.imagen }} />
                <Text>Propietario del post: {data.email}</Text>
                <Text>Descripcion: {data.descripcion}</Text>
                <TouchableOpacity onPress={()=>this.likear()}>
                    <text> Añadir Like </text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default Posteos;