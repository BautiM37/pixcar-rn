import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import {auth, db} from '../firebase/config'
import 'firebase/firestore'
import { TextInput } from 'react-native-gesture-handler';
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
    constructor() {
        super()
        this.state={
            comentarios: '',
        }
    }

    componentDidMount(){
        db.collection('posteos').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let comentario = [];
                docs.forEach( doc => {
                    comentario.push ({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        comentarios: comentario
                    })
                })
            }
        )
    }

    agregarComentario(){
        db.collection('comentarios').add({
            email: auth.currentUser.email,
            comentarios: this.state.comentarios,
            createdAt: Date.now(),
        })
    }

    render() {
        let data=this.props.data.item.data

        return(
            <View style={styles.contenedor}>

                <Text>Comentarios del posteo: {data.comentarios}</Text>

                <TextInput 
                maxLength= '100'
                keyboardType='default'
                placeholder='Comentá lo que pienses!'
                onChangeText={text => this.setState({comentarios: text})}
                value={this.state.comentarios}
                />
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Home')}>
                    <Text>Comentar</Text>
                </TouchableOpacity>
            </View>
            )  
        }
    }

    export default Comentarios;