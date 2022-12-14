import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import Posteos from '../components/Posteos';
import { Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: 'rgb(28, 35, 43)',
        paddingTop: '20px'
    },
    misDatos: {
        alignItems: 'center',
        height: '500px',
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
        color: 'rgb(0, 0, 0)',
        fontWeight: 'bold'
    },
    inputs: {
        backgroundColor: 'rgb(137, 180, 201)',
        margin: '1.5vw',
        borderRadius: '5px',
        padding: '2.5vw',
    },
    esconder: {
        display: 'none'
    },
    nada: {

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
    subtitulo: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginLeft: '1.5vw',
        color: 'rgb(0, 193, 203)',
        textAlign: 'center'
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
            cambioNombre: false,
            cambioBio: false,
            cambioPass: false,
            docID: '',
            bioNueva: '',
            nombreNuevo: '',
            contraMia: '',
            contraNueva: ''
        }
    }

    // HACER QUE NO SE ACTUALIZE LA INFO DEL NOMBRE SI TOCO VOLVER

    componentDidMount() {
        this.infoPropia()
    }

    infoPropia() {
        db.collection('usuarios').where('mail', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let data = ''

                docs.forEach(doc => {
                    data = doc.data()

                    this.setState({
                        docID: doc.id,
                        fotoMia: data.foto,
                        bioMia: data.bio,
                        nombreMio: data.nombre,
                        mailMio: data.mail
                    })
                })
            }
        )
        db.collection('posteos').where('email', '==', auth.currentUser.email).orderBy('createdAt', 'desc').onSnapshot(
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

    nuevoNombre() {
        this.setState({ cambioNombre: true })
    }

    actualizarNombre() {
        this.setState({ cambioNombre: false })
        db.collection('usuarios').doc(this.state.docID).update({
            nombre: this.state.nombreNuevo
        })
            .catch(error => {
                this.setState({ error: error.message })
            })
    }

    nuevaBio() {
        this.setState({ cambioBio: true })
    }

    actualizarBio() {
        this.setState({ cambioBio: false })
        db.collection('usuarios').doc(this.state.docID).update({
            bio: this.state.bioNueva
        })
            .catch(error => {
                this.setState({ error: error.message })
            })
    }

    nuevaContra() {
        this.setState({ cambioPass: true })
    }

    actualizarContra() {
        // EmailAuthProvider recibe dos par??metros, que son el email y la contrase??a actuales, usadas dsps para reautenticar.
        const credenciales = firebase.auth.EmailAuthProvider.credential(
            auth.currentUser.email, this.state.contraMia);
        // reautenticar xq sino firebase no me deja cambiar la contra (si es que me autentiqu?? hace mucho)
        auth.currentUser.reauthenticateWithCredential(credenciales)
            .then(() => {
                return auth.currentUser.updatePassword(this.state.contraNueva),
                this.setState({ cambioPass: false })
            })
            .catch(error => {
                this.setState({ error: error.message })
            })
    }

    noCambioNomb() {
        this.setState({
            cambioNombre: false,
            nombreNuevo: ''
        })
    }
    noCambioBio() {
        this.setState({
            cambioBio: false,
            bioNueva: ''
        })
    }
    noCambioContra() {
        this.setState({
            cambioPass: false,
            contraNueva: ''
        })
    }

    logout() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

    eliminarUsuario() {
        auth.currentUser.delete()
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <ScrollView style={styles.contenido}>
                <View style={styles.misDatos}>

                    {/* NOMBRE */}
                    <Text style={
                        this.state.cambioNombre == false ?
                            styles.titulo
                            :
                            styles.esconder
                    }>{this.state.nombreMio} <TouchableOpacity onPress={() => this.nuevoNombre()} style={
                        this.state.cambioNombre == false ?
                            styles.nada
                            :
                            styles.esconder
                    }>
                        <Entypo name="new-message" size={24} color="rgb(0, 193, 203)"/>
                    </TouchableOpacity></Text>
                    
                    {
                        this.state.cambioNombre == false ?
                            <></>
                            :
                            <>
                                <TextInput style={styles.inputs} maxLength='20'
                                    keyboardType='default'
                                    onChangeText={text => this.setState({ nombreMio: text, nombreNuevo: text })}
                                    defaultValue={this.state.nombreMio}
                                />
                                {
                                    this.state.nombreNuevo.length < 3 ?
                                    <Text style={styles.mail}>Record?? que debe tener al menos tres caracteres</Text>
                                    :
                                    <></>
                                }
                                <TouchableOpacity disabled={this.state.nombreNuevo.length < 3 ? true : false} onPress={() => this.actualizarNombre()}>
                                    <Text style={styles.mail}>Aceptar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.noCambioNomb()}>
                                    <Text style={styles.biografia}>Volver</Text>
                                </TouchableOpacity>
                            </>
                    }

                    {/* FOTO */}
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

                    {/* MAIL */}
                    <Text style={styles.mail}>{this.state.mailMio}</Text>

                    {/* BIOGRAF??A */}
                    {
                        this.state.bioMia == '' ?
                            <Text style={
                                this.state.cambioBio == false ?
                                    styles.biografia
                                    :
                                    styles.esconder
                            }>No has agregado biograf??a todav??a <TouchableOpacity onPress={() => this.nuevaBio()} style={
                                this.state.cambioBio == false ?
                                    styles.nada
                                    :
                                    styles.esconder
                            }>
                                <Entypo name="new-message" size={16} color="rgb(0, 193, 203)"/>
                            </TouchableOpacity></Text>
                            :
                            <Text style={
                                this.state.cambioBio == false ?
                                    styles.biografia
                                    :
                                    styles.esconder
                            }>{this.state.bioMia} <TouchableOpacity onPress={() => this.nuevaBio()} style={
                                this.state.cambioBio == false ?
                                    styles.nada
                                    :
                                    styles.esconder
                            }>
                                <Entypo name="new-message" size={16} color="rgb(0, 193, 203)"/>
                            </TouchableOpacity></Text>
                    }
                    {
                        this.state.cambioBio == false ?
                            <></>
                            :
                            <>
                                <TextInput style={styles.inputs} maxLength='20'
                                    keyboardType='default'
                                    onChangeText={text => this.setState({ bioMia: text, bioNueva: text })}
                                    defaultValue={this.state.bioMia}
                                />
                                <TouchableOpacity onPress={() => this.actualizarBio()}>
                                    <Text style={styles.mail}>Aceptar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.noCambioBio()}>
                                    <Text style={styles.biografia}>Volver</Text>
                                </TouchableOpacity>
                            </>
                    }

                    {/* CONTRASE??A */}
                    <TouchableOpacity onPress={() => this.nuevaContra()}>
                        <Text style={styles.biografia}>Actualizar contrase??a</Text>
                    </TouchableOpacity>
                    {
                        this.state.cambioPass == false ?
                            <></>
                            :
                            <>
                                <TextInput style={styles.inputs} maxLength='20'
                                    keyboardType='default'
                                    secureTextEntry={true}
                                    onChangeText={text => this.setState({ contraMia: text })}
                                    defaultValue={this.state.contraMia}
                                />
                                <TextInput style={styles.inputs} maxLength='20'
                                    keyboardType='default'
                                    secureTextEntry={true}
                                    onChangeText={text => this.setState({ contraNueva: text })}
                                    defaultValue={this.state.contraNueva}
                                />
                                {
                                    this.state.contraNueva.length < 8 ?
                                    <Text style={styles.mail}>Record?? que debe tener al menos ocho caracteres</Text>
                                    :
                                    <></>
                                }
                                <TouchableOpacity disabled={this.state.contraNueva.length < 8 ? true : false} onPress={() => this.actualizarContra()}>
                                    <Text style={styles.biografia}>Aceptar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.noCambioContra()}>
                                    <Text style={styles.biografia}>Volver</Text>
                                </TouchableOpacity>
                                {
                                    this.state.error != '' ?
                                    <Text style={styles.biografia}>{this.state.error}</Text>
                                    :
                                    <></>
                                }
                            </>
                    }

                </View>

                {/* POSTEOS */}
                <Text style={styles.subtitulo}>{this.state.posteos.length} posteos</Text>
                {
                    this.state.posteos.length == 0 ?
                        <Text style={styles.mail}>No ten??s posteos. ??Qu?? esper??s para crear tu primero?</Text>
                        :
                        <FlatList
                            data={this.state.posteos}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={(data) => (<Posteos data={data.item.data} navigation={this.props.navigation} id={data.item.id} />)}
                        ></FlatList>
                }
                <TouchableOpacity onPress={() => this.logout()} style={styles.botones}>
                    <Text style={styles.cerrarSesion}>Cerrar sesi??n</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.eliminarUsuario()} style={styles.botones}>
                    <Text style={styles.cerrarSesion}>Eliminar usuario</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }

}

export default MiPerfil;