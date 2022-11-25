import React, { Component } from 'react';
import { Text, StyleSheet, FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { db } from '../firebase/config'
import Posteos from '../components/Posteos';
import HeaderLogo from '../components/HeaderLogo';

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: 'rgb(28, 35, 43)',
        paddingTop: '20px',
    },
    texto: {
        color: "white"
    },
    titulo: {
        fontWeight: 'bold',
        color: 'whitesmoke',
        fontSize: '30px',
        marginBottom: '30px',
        textAlign: 'center',
        marginTop: '20vw'
    },
    inputs: {
        border: 'solid 3px rgb(0, 193, 203)',
        backgroundColor: 'rgb(0, 0, 0)',
        color: 'rgb(0, 193, 203)',
        margin: '1.5vw',
        borderRadius: '5px',
        padding: '2.5vw',
    },
    botones: {
        backgroundColor: 'rgb(0, 193, 203)',
        margin: '1.5vw',
        borderRadius: '5px',
        padding: '3vw',
        textAlign: 'center',
        marginBottom: '10px',
        width: '50vw',
        border: '2px solid black',
        marginLeft: '25vw'
    },
    buscar: {
        color: 'rgb(0, 0, 0)',
        fontWeight: 'bold'
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
            persona: '',
            nombre: ''
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
                    persona: doc.data().mail,
                    nombre: doc.data().nombre
                })
            });

        })
    }

    irAPerfil() {
        this.props.navigation.navigate('Perfil', { usuario: this.state.persona })
    }

    render() {
        return (
            <ScrollView style={styles.contenido}>
                <HeaderLogo />
                <Text style={styles.titulo}>Buscar usuario</Text>
                <TextInput style={styles.inputs}
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
                {
                    this.state.texto != '' ?
                        this.state.usuarios.length == 0 ? <Text style={styles.texto}>No encontramos ningún perfil con ese nombre de usuario</Text>
                            :
                            <>
                                <Text style={styles.texto}> Se encontro un usuario, {this.state.nombre}</Text>

                                <TouchableOpacity onPress={() => this.irAPerfil()} style={styles.botones}>
                                    <Text style={styles.buscar}>Ir al usuario</Text>
                                </TouchableOpacity>

                            </>
                        :
                        <></>


                }

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