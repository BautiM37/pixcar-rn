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
    },
    mail: {
        fontStyle: 'italic',
        color: 'whitesmoke'
    },
    cerrarSesion: {
        color: 'whitesmoke',
        textDecorationLine: 'underline'
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
            mailMio: ''
        }
    }

    componentDidMount() {
        this.infoPropia()
    }

    infoPropia() {
        db.collection('usuarios').where('mail', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let miFoto = ''
                let miBio = ''
                let miNombre = ''
                let miMail = ''

                docs.forEach(doc => {
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

    render() {
        return (
            <ScrollView style={styles.contenido}>
                <View style={styles.misDatos}>

                    <Text style={styles.titulo}>{this.state.nombreMio}</Text>
                    {
                        this.state.fotoMia != undefined ?
                            <Image
                                style={styles.photo} source={{ uri: this.state.fotoMia }}
                            />
                            :
                            <Image
                                style={styles.photo} source={require('../../assets/sinFoto.png')}
                            />
                    }
                    <Text style={styles.mail}>{this.state.mailMio}</Text>
                    {this.state.bioMia == '' ?
                        <Text style={styles.mail}>No has agregado biografía todavía</Text>
                        :
                        <Text style={styles.biografia}>{this.state.bioMia}</Text>
                    }
                </View>
                <Text style={styles.mail}>{this.state.posteos.length} posteos</Text>
                {
                    this.state.posteos.length == 0 ?
                        <Text style={styles.mail}>No tenés posteos. ¿Qué esperás para crear tu primero?</Text>
                        :
                        <FlatList
                            data={this.state.posteos}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={(data) => (<Posteos data={data.item.data} navigation={this.props.navigation} id={data.item.id} />)}
                        ></FlatList>
                }
                <TouchableOpacity onPress={() => this.logout()}>
                    <Text style={styles.cerrarSesion}>Cerrar sesión</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }

}

export default MiPerfil;