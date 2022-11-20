import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {db, auth} from '../firebase/config'
import firebase from 'firebase';
import 'firebase/firestore'
import Comentarios from '../screens/Comentarios'

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
        let posteo=db.collection('posteos').doc(this.props.data.id)
        posteo.update({
            Likes: firebase.firestore.FieldValue.arrayUnion(1)

        })
    }
    perfilOtro(persona) {
        this.props.navigation.navigate('Perfil', {usuario: persona})
    }

    
    render() {

       let data = this.props.data

        return(
            <View>
                <Image style={styles.photo} source={{ uri: data.imagen }} />
                {data.email == auth.currentUser.email
                        ?
                        <Text onPress={() => this.props.navigation.navigate('MiPerfil')} style={styles.Text}>
                            Propietario del post: {data.email}
                        </Text>
                        :
                        <Text onPress={() => this.perfilOtro(this.props.data.email)} style={styles.Text}>
                            Propietario del post: {data.email}
                        </Text>
                    }
                <Text style={styles.Text}>Descripcion: {data.descripcion}</Text>
                <TouchableOpacity onPress={()=>this.likear()}>
                    <Text style={styles.Text}> Añadir Like </Text>
                </TouchableOpacity>
                <View>
                {
                    data != undefined  ?
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Comentarios', {id:this.props.id})}>
                <Text style={styles.Text}>Comentarios: {}</Text>
               
                </TouchableOpacity> :
                
               
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Comentarios', {id:this.props.id}) }}>
                                <Text style={styles.Text}>No hay comentarios.</Text>
                </TouchableOpacity>
    }
                </View>
    
            </View>
        )
    }

}

export default Posteos;