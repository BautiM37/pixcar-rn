import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {db, auth} from '../firebase/config'
import firebase from 'firebase';

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
    perfilOtro(persona) {
        this.props.navigation.navigate('Perfil', {usuario: persona})
    }

    
    render() {
       let data=this.props.data.item.data

       {console.log(this.props.data);}
       
        return(
            <View>
                <Image style={styles.photo} source={{ uri: data.imagen }} />
                {this.props.data.email == auth.currentUser.email
                        ?
                        <Text onPress={() => this.props.navigation.navigate('Perfil')} style={styles.Text}>
                            Propietario del post: {data.email}
                        </Text>
                        :
                        <Text onPress={() => this.perfilOtro(data.email)} style={styles.Text}>
                            Propietario del post: {data.email}
                        </Text>
                    }
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