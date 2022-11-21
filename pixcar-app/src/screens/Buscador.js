import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView, TextInput , TouchableOpacity} from 'react-native';
import {db} from '../firebase/config'
import Posteos from '../components/Posteos';



const styles = StyleSheet.create({
    contenido: {
        backgroundColor: 'rgb(28, 35, 43)'
    },
    texto: {
        color:"white"
    }
})

class Buscador extends Component {
    constructor(props) {
        super(props)
        this.state={
          texto: "" ,
          usuarios: []
        }
    }
   
    buscarPerfil(text){
        console.log(text)
        db.collection("usuarios").where("nombre", "==", text).onSnapshot(docs=>{
            let usuario= []
            docs.forEach(doc => {
             usuario.push({
                    id:doc.id,
                    data:doc.data()
                })
            });
            this.setState({
             usuarios : usuario
            })
        })
    }


    render() {
        console.log(this.state?.usuarios[0]?.data?.nombre)
        return(
            <ScrollView style={styles.contenido}>
                <Text style={styles.texto}>Buscar usuario</Text>
                <TextInput style={styles.texto}
                 keyboardType='default'
                placeholder='buscar perfil'
                onChangeText={text => {this.buscarPerfil(text)
                this.setState({
                    texto: text
                })
                }}
                value={this.state.texto}
                />
                {this.state.usuarios.length==0?<Text style={styles.texto}>No se encuentra ningun perfil con ese nombre de usuario</Text>:
                <FlatList
                    data={this.state.usuarios}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={(data)=>(<TouchableOpacity style={styles.texto}> Se encontro un usuario:{data.item.data.mail} Tambien conocido como: {data.item.data.nombre}</TouchableOpacity>)} 
                    
                ></FlatList>}
                


            </ScrollView>
        )
    }

}

export default Buscador;