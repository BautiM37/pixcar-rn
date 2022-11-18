import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {db} from '../firebase/config'
import firebase from 'firebase';
import 'firebase/firestore'

const styles = StyleSheet.create({

    photo: {
        width: '200px',
        height: '200px'
    },

    Text:{
        color: 'white'
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
            Likes: firebase.firestore.FieldValue.arrayUnion(1)

        })
    }

    
    render() {
       let data=this.props.data.item.data
       
        return(
            <View>
                <Image style={styles.photo} source={{ uri: data.imagen }} />
                <Text style={styles.Text}>Propietario del post: {data.email}</Text>
                <Text style={styles.Text}>Descripcion: {data.descripcion}</Text>
                <TouchableOpacity onPress={()=>this.likear()}>
                    <Text style={styles.Text}> Añadir Like </Text>
                </TouchableOpacity>
                <Text style={styles.Text}>Comentarios: {data.comentarios}</Text>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Comentarios', {id:this.props.id}) }}>
                                <Text style={styles.Text}>Ver y agregar comentarios</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default Posteos;