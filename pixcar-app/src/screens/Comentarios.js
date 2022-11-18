import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import {auth, db} from '../firebase/config'
import 'firebase/firestore'
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-web';
import CadaComentario from '../components/CadaComentario';
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
        this.state={
            comentarios: '',
            id: props.route.params.id,
            data: {},
            comentario: [],
        }
    }

    componentDidMount(){
        db.collection('posteos')
        .doc(this.state.id)
        .onSnapshot(
            docs => {
                this.setState({
                    data: docs.data(),
                    comentario: docs.data().comentarios 
                })
            })
        }
               


    agregarComentario(){
        db.collection('posteos').doc(this.state.id).update({
            
            comentarios: firebase.firestore.FieldValue.arrayUnion({
            email: auth.currentUser.email, 
            createdAt: Date.now(),
            
            
        })
     })
     .catch(err => console.log(err))
     this.setState({
        comentarios: '',
     })
    }

    render() {

        return(
            <View style={styles.contenedor}>

                <Text>Comentarios del posteo:</Text>
                <FlatList
                data ={this.state.comentario}
                keyExtractor= {item => item.createdAt.toString()}
                renderItem={({item}) => <CadaComentario comentario={item}/>}/>

            <View>
            <TextInput
            placeholder='¡Comenta lo que pienses!'
            keyboardType='deafult'
            onChangeText={ text => this.setState({comentario:text})}
            value= {this.state.comentario}
            />
            <TouchableOpacity onPress={() =>this.agregarComentario(this.state.comentario)}>
            <Text>Publicar comentario</Text>
            </TouchableOpacity>
    
            </View>
                
            </View>
            )  
        }
    }

    export default Comentarios;