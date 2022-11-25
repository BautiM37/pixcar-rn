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
        backgroundColor: 'rgb(28, 35, 43)',
        flex: 1,
        width: '100vw',
    },
    texto: {
        color: 'rgb(0, 193, 203)',
        textAlign: 'center'
    },
    textoBoton: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    boton: {
        backgroundColor: 'rgb(0, 193, 203)',
        margin: '1.5vw',
        borderRadius: '5px',
        padding: '5vw',
        textAlign: 'center',
        marginBottom: '20px',
        width: '50vw',
        border: '2px solid black',
        marginLeft: '25vw'
    },
    inputs: {
        border: 'solid 3px rgb(0, 193, 203)',
        backgroundColor: 'rgb(0, 0, 0)',
        color: 'rgb(0, 193, 203)',
        margin: '1.5vw',
        borderRadius: '5px',
        padding: '2.5vw',
    },
    comentar: {
        backgroundColor: 'rgb(0, 193, 203)',
        margin: '1.5vw',
        borderRadius: '5px',
        padding: '2vw',
        textAlign: 'center',
        marginBottom: '20px',
        width: '60vw',
        border: '2px solid black',
        marginLeft: '20vw'
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
        return (
            <View style={styles.contenedor}>
                <TouchableOpacity style={styles.boton} onPress={() => this.props.navigation.navigate('Home')}><Text style={styles.textoBoton}>Volver</Text></TouchableOpacity>
                <Text style={styles.texto}>Comentarios del posteo: {this.state.comentarios.length}</Text>
                {
                    this.state.comentarios.length == 0 ?
                        <Text style={styles.texto}>No hay comentarios</Text>
                        :
                        <FlatList
                            data={this.state.comentarios}
                            keyExtractor={item => item.createdAt.toString()}
                            renderItem={({ item }) => <CadaComentario comentario={item} />} />
                }

                <View>
                    <TextInput style={styles.inputs}
                        placeholder='¡Comenta lo que pienses!'
                        keyboardType='deafult'
                        onChangeText={text => this.setState({ nuevoComentario: text })}
                        value={this.state.nuevoComentario}
                    />
                    <TouchableOpacity style={styles.comentar} onPress={() => this.agregarComentario(this.state.nuevoComentario)}>
                        <Text>Publicar comentario</Text>
                    </TouchableOpacity>

                </View>

            </View>

        )
    }
}

export default Comentarios;