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
    }
})

class Perfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posteosOtro: [],
            fotoOtro: '',
            bioOtro: '',
            nombreOtro: '',
            mailOtro: ''
        }
    }

    componentDidMount() {
        this.cargarDatos()
        console.log(this.props.data);
    }

    componentDidUpdate(prevProps) {
        if (this.props.route.params.usuario != prevProps.route.params.usuario) {
            this.cargarDatos()
        }
    }

    cargarDatos() {
        db.collection('usuarios').where('mail', '==', this.props.route.params.usuario).onSnapshot(
            docs => {
                let fotoAjena = ''
                let bioAjena = ''
                let nombreAjeno = ''
                let mailAjeno = ''

                docs.forEach(doc => {
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
                        posteosOtro: posts
                    })
                })
            }
        )
    }

    render() {
        return (
            <ScrollView style={styles.contenido}>
                <View style={styles.misDatos}>

                    <Text style={styles.titulo}>{this.state.nombreOtro}</Text>
                    {
                        this.state.fotoOtro != undefined ?
                            <Image
                                style={styles.photo} source={{ uri: this.state.fotoOtro }}
                            />
                            :
                            <Image
                                style={styles.photo} source={require('../../assets/sinFoto.png')}
                            />
                    }
                    <Text style={styles.mail}>{this.state.mailOtro}</Text>
                    {this.state.bioOtro == '' ?
                        <Text>El usuario no incluyó una biografía</Text>
                        :
                        <Text style={styles.biografia}>{this.state.bioOtro}</Text>
                    }
                </View>
                <Text style={styles.mail}>{this.state.posteosOtro.length} posteos</Text>
                <FlatList
                    data={this.state.posteosOtro}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(data) => (<Posteos data={data.item.data} navigation={this.props.navigation} id={data.item.id} />)}
                ></FlatList>
            </ScrollView>
        )
    }

}

export default Perfil;