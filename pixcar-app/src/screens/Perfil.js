import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { auth, db } from '../firebase/config';
import Posteos from '../components/Posteos';

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: 'rgb(28, 35, 43)',
        paddingTop: '20px'
    },
    misDatos: {
        alignItems: 'center',
        height: '300px',
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
    subtitulo: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginLeft: '1.5vw',
        color: 'rgb(0, 193, 203)',
        textAlign: 'center'
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
    }

    componentDidUpdate(prevProps) {
        if (this.props.route.params.usuario != prevProps.route.params.usuario) {
            this.cargarDatos()
        }
    }

    cargarDatos() {
        db.collection('usuarios').where('mail', '==', this.props.route.params.usuario).onSnapshot(
            docs => {
                let data = ''

                docs.forEach(doc => {
                    data = doc.data()

                    this.setState({
                        fotoOtro: data.foto,
                        bioOtro: data.bio,
                        nombreOtro: data.nombre,
                        mailOtro: data.mail
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
                <Text style={styles.subtitulo}>{this.state.posteosOtro.length} posteos</Text>
                {
                    this.state.posteosOtro.length == 0 ?
                        <Text style={styles.mail}>{this.state.nombreOtro} todavía no tiene posteos.</Text>
                        :
                        <FlatList
                            data={this.state.posteosOtro}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={(data) => (<Posteos data={data.item.data} navigation={this.props.navigation} id={data.item.id} />)}
                        ></FlatList>
                }
            </ScrollView>
        )
    }

}

export default Perfil;