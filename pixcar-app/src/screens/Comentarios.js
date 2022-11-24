import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import { auth, db } from '../firebase/config'
import 'firebase/firestore'
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-web';
import CadaComentario from '../components/CadaComentario';
import firebase from 'firebase';

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: 'white',
        flex: 1,
        width: '100vw',
        padding: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
    }


})

class Comentarios extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comentarios: [],
            id: props.route.params.id,
            data: {},
            nuevoComentario: '',
        }
    }

    componentDidMount() {
        this.cargarDatos()
    }

    componentDidUpdate(prevProps) {
        if (this.props.route.params.id != prevProps.route.params.id) {
            // this.setState({
            //     id: this.props.route.params.id
            // })
            this.cargarDatos()
        }
    }

    cargarDatos() {
        db.collection('posteos')
            .doc(this.props.route.params.id)
            .onSnapshot(
                docs => {
                    console.log(docs.data());
                    this.setState({
                        data: docs.data(),
                        comentarios: docs.data().comentarios
                    })
                })
    }

    agregarComentario(com) {
        db.collection('posteos').doc(this.props.route.params.id).update({

            comentarios: firebase.firestore.FieldValue.arrayUnion({
                email: auth.currentUser.email,
                createdAt: Date.now(),
                comentarioo: com,
            })
        })
        .then(() => {
            this.setState({
                nuevoComentario: ''
            })
        })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.id);
        return (
            <View style={styles.contenedor}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}><Text>Volver uwu</Text></TouchableOpacity>
                <Text>Comentarios del posteo:</Text>
                {
                    this.state.comentarios.length == 0 ?
                        <Text>No hay comentarios xd</Text>
                        :
                        <FlatList
                            data={this.state.comentarios}
                            keyExtractor={item => item.createdAt.toString()}
                            renderItem={({ item }) => <CadaComentario comentario={item} />} />
                }

                <View>
                    <TextInput
                        placeholder='¡Comenta lo que pienses!'
                        keyboardType='deafult'
                        onChangeText={text => this.setState({ nuevoComentario: text })}
                        value={this.state.nuevoComentario}
                    />
                    <TouchableOpacity onPress={() => this.agregarComentario(this.state.nuevoComentario)}>
                        <Text>Publicar comentario</Text>
                    </TouchableOpacity>

                </View>

            </View>

        )
    }
}

export default Comentarios;