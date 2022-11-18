import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {db, auth} from '../firebase/config'
import firebase from 'firebase';
import 'firebase/firestore'

const styles = StyleSheet.create({

    photo: {
        width: '200px',
        height: '200px'
    },
})

class Posteos extends Component {
    constructor(props) {
        super(props)
        this.state={
            likeado: false
           
        }
    }
    componentDidMount(){
        let likes= this.props.data.item.data.likes
        if (likes.includes(auth.currentUser.email)) {
            this.setState({
                likeado:true
            })
        }
        else{
            this.setState({
                likeado:false
            })
        }
    }

    likear(){
        let posteo=db.collection('posteos').doc(this.props.data.item.id)
        if (this.state.likeado==false) {
            posteo.update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    
            })
            .then(()=>{
                this.setState({
                    likeado:true
                })
            })
        }
        else{
            posteo.update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    
            })
            .then(()=>{
                this.setState({
                    likeado:false
                })
            })
        }
       
    }
    render() {
       let data=this.props.data.item.data
       
        return(
            <View>
                <Image style={styles.photo} source={{ uri: data.imagen }} />
                <Text>Propietario del post: {data.email}</Text>
                <Text>Descripcion: {data.descripcion}</Text>
                <Text>Cantidad de likes: {data.likes.length}</Text>
                {this.state.likeado==false?    <TouchableOpacity onPress={()=>this.likear()}>
                    <text> Añadir Like </text>
                </TouchableOpacity>: <TouchableOpacity onPress={()=>this.likear()}>
                    <text> Quitar Like </text>
                </TouchableOpacity>}
            
               
            </View>
        )
    }

}

export default Posteos;