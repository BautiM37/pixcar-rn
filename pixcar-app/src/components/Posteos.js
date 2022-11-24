import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config'
import firebase from 'firebase';
import 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
    contenedor: {
        alignItems: 'center',
        marginTop: '40px',
        width: '100vw',
        position: 'static'
    },
    photo: {
        width: '250px',
        height: '250px',
        borderRadius: '10px'
    },
    text: {
        color: 'rgb(0, 193, 203)',
        textAlign: 'center'
    },
    propietario: {
        color: 'rgb(0, 193, 203)',
        fontWeight: 'bold',
        fontSize: '16px'
    },
    borrar: {
        position: 'absolute',
        top: '8vw',
        right: '10vw'
    }

})

class Posteos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likeado: false
        }
    }
    likear() {
        db.collection('posteos').doc(this.props.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion({
                email: auth.currentUser.email,
            })
        })
            .then(() => this.setState({
                likeado: true
            }))
    }

    deslikear() {
        db.collection('posteos').doc(this.props.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove({
                email: auth.currentUser.email,
            })
        })
            .then(() => this.setState({
                likeado: false
            }))
    }

    perfilOtro(persona) {
        this.props.navigation.navigate('Perfil', { usuario: persona })
    }

    borrarFoto() {
        db.collection('posteos').doc(this.props.id).delete()
    }

    render() {

        let data = this.props.data
        return (
            <View style={styles.contenedor}>
                {
                    data.email == auth.currentUser.email
                        ?
                        <Text onPress={() => this.props.navigation.navigate('MiPerfil')} style={styles.propietario}>
                            {data.email}
                        </Text>
                        :
                        <Text onPress={() => this.perfilOtro(this.props.data.email)} style={styles.propietario}>
                            {data.email}
                        </Text>
                }
                {
                    data.email == auth.currentUser.email ?
                        <TouchableOpacity onPress={() => this.borrarFoto()} style={styles.borrar}>
                            <AntDesign name="delete" size={24} color="rgb(0, 193, 203)" />
                        </TouchableOpacity>
                        :
                        <></>
                }
                <Image style={styles.photo} source={{ uri: data.imagen }} />
                <Text style={styles.text}>Descripción: {data.descripcion}</Text>
                <Text style={styles.text}>Likes: {data.likes.length}</Text>
                {
                    this.state.likeado == false ?
                        <TouchableOpacity onPress={() => this.likear()}>
                            <Text style={styles.text}> Añadir Like </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this.deslikear()}>
                            <Text style={styles.text}> Quitar Like </Text>
                        </TouchableOpacity>
                }

                <View>
                    {
                        data.comentarios.length != 0 ?
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Comentarios', { id: this.props.id })}>
                                <Text style={styles.text}>Comentarios: {data.comentarios.length}</Text>

                            </TouchableOpacity> :


                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Comentarios', { id: this.props.id }) }}>
                                <Text style={styles.text}>No hay comentarios.</Text>
                            </TouchableOpacity>
                    }
                </View>

            </View>
        )
    }

}

export default Posteos;