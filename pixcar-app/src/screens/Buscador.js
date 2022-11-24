import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { db } from '../firebase/config'
import Posteos from '../components/Posteos';



const styles = StyleSheet.create({
    contenido: {
        backgroundColor: 'rgb(28, 35, 43)'
    },
    texto: {
        color: "white"
    }
})

class Buscador extends Component {
    constructor(props) {
        super(props)
        this.state = {
            texto: "",
            usuarios: [],
            posteos: [],
            busco: false,
            persona: ''
        }
    }

    buscarPerfil(text) {
        db.collection("usuarios").where("nombre", "==", text).onSnapshot(docs => {
            let usuario = []
            docs.forEach(doc => {
                usuario.push({
                    id: doc.id,
                    data: doc.data()
                })
                this.setState({
                    usuarios: usuario,
                    persona: doc.data().mail
                })
            });

        })
    }
    mostrarPerfil(owner) {
        db.collection('posteos').where('email', '==', owner).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posteos: posts,
                    busco: true
                })
            }
        )

    }
    irAPerfil() {
        this.props.navigation.navigate('Perfil', { usuario: this.state.persona })
    }

    render() {
        return (
            <ScrollView style={styles.contenido}>
                <Text style={styles.texto}>Buscar usuario</Text>
                <TextInput style={styles.texto}
                    keyboardType='default'
                    placeholder='buscar perfil'
                    onChangeText={text => {
                        this.buscarPerfil(text)
                        this.setState({
                            texto: text,
                            busco: false
                        })
                    }}
                    value={this.state.texto}
                />
                {this.state.usuarios.length == 0 ? <Text style={styles.texto}>No se encuentra ningun perfil con ese nombre de usuario</Text> :
                    <FlatList
                        data={this.state.usuarios}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={(data) => (<TouchableOpacity onPress={() => this.mostrarPerfil(data.item.data.mail)} style={styles.texto}>
                            <Text style={styles.texto}> Se encontro un usuario:{data.item.data.mail} Tambien conocido como: {data.item.data.nombre} </Text>
                            <Text style={styles.texto}>Ir al <TouchableOpacity onPress={() => this.irAPerfil()}><Text style={styles.texto}>usuario</Text></TouchableOpacity></Text>

                        </TouchableOpacity>)}

                    ></FlatList>}

                {this.state.busco == false ? <Text ></Text> :
                    this.state.posteos.length == 0 ? <Text style={styles.texto}>El usuario no tiene posteos</Text> :
                        <FlatList
                            data={this.state.posteos}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={(data) => (<Posteos data={data.item.data} navigation={this.props.navigation} id={data.item.id} />)}
                        ></FlatList>}

            </ScrollView>
        )
    }

}

export default Buscador;