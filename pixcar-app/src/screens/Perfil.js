import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { auth, db } from '../firebase/config';
import Posteos from '../components/Posteos';

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: 'rgb(28, 35, 43)'
    },
    misDatos: {
        alignItems: 'center',
        height: '300px',
        backgroundColor: 'rgb(0, 0, 0)',
        marginBottom: '70px',
    },
    photo: {
        width: '200px',
        height: '200px',
        marginBottom: '20px',
        borderRadius: '50%'
    },
    titulo: {
        fontWeight: 'bold',
        color: 'whitesmoke',
        fontSize: '30px',
        marginBottom: '10px'
    },
    username: {
        fontWeight: 'bold',
        color: 'whitesmoke'
    },
    biografia: {
        color: 'whitesmoke'
    }
})

class MiPerfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posteos: [],
            fotoMia: '',
            bioMia: '',
            nombreMio: '',
            mailMio: '',
            posteosOtro: [],
            fotoOtro: '',
            bioOtro: '',
            nombreOtro: '',
            mailOtro: '',
        }
    }

    componentDidMount() {
        this.props.route.params != undefined ?
            this.infoAjena()
            :
            this.infoPropia()
    }

    // Si soy dueño del perfil...

    infoPropia() {
        db.collection('usuarios').where('mail', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let miFoto = ''
                let miBio = ''
                let miNombre = ''
                let miMail = ''

                docs.forEach(doc => {
                    console.log(doc.data());
                    miFoto = doc.data().foto
                    miBio = doc.data().bio
                    miNombre = doc.data().nombre
                    miMail = doc.data().mail

                    this.setState({
                        fotoMia: miFoto,
                        bioMia: miBio,
                        nombreMio: miNombre,
                        mailMio: miMail
                    })
                })
            }
        )
        db.collection('posteos').where('email', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posteos: posts
                    })
                })
            }
        )
    }

    logout() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

    // Si estoy en un perfil ajeno...

    infoAjena() {
        db.collection('usuarios').where('mail', '==', this.props.route.params.usuario).onSnapshot(
            docs => {
                let fotoAjena = ''
                let bioAjena = ''
                let nombreAjeno = ''
                let mailAjeno = ''

                docs.forEach(doc => {
                    console.log(doc.data());
                    fotoAjena = doc.data().foto
                    bioAjena = doc.data().bio
                    nombreAjeno = doc.data().nombre
                    mailAjeno = doc.data().mail

                    this.setState({
                        fotoOtro: fotoAjena,
                        bioOtro: bioAjena,
                        nombreOtro: nombreAjeno,
                        mailOtro: mailAjeno
                    })
                })
            }
        )
        db.collection('posteos').where('email', '==', this.props.route.params.usuario).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posteos: posts
                    })
                })
            }
        )
    }

    render() {
        return (
            <View>
                {
                    this.props.route.params != undefined ?

                        <ScrollView style={styles.contenido}>
                            <View style={styles.misDatos}>

                                <Text style={styles.titulo}>{this.state.nombreMio}</Text>
                                <Image
                                    style={styles.photo} source={{ uri: this.state.fotoMia }}
                                />
                                {this.state.bioMia == '' ?
                                    <Text>No has agregado biografía todavía</Text>
                                    :
                                    <Text style={styles.biografia}>{this.state.bioMia}</Text>
                                }
                            </View>
                            <FlatList
                                data={this.state.posteos}
                                keyExtractor={(data) => data.id.toString()}
                                renderItem={(item) => (<Posteos data={item} />)}
                            ></FlatList>
                            <TouchableOpacity onPress={() => this.logout()}>
                                <Text>Cerrar sesión</Text>
                            </TouchableOpacity>

                        </ScrollView>
                        :
                        <ScrollView style={styles.contenido}>
                            <View style={styles.misDatos}>

                                <Text style={styles.titulo}>{this.state.nombreOtro}</Text>
                                <Image
                                    style={styles.photo} source={{ uri: this.state.fotoOtro }}
                                />
                                {this.state.bioOtro == '' ?
                                    <Text>El usuario no incluyó una biografía</Text>
                                    :
                                    <Text style={styles.biografia}>{this.state.bioOtro}</Text>
                                }
                            </View>
                            <FlatList
                                data={this.state.posteosOtro}
                                keyExtractor={(data) => data.id.toString()}
                                renderItem={(item) => (<Posteos data={item} />)}
                            ></FlatList>
                        </ScrollView>
                }
            </View>
        )
    }

}

export default MiPerfil;