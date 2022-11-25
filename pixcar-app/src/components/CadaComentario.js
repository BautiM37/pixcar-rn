import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: 'rgb(28, 35, 43)',
        paddingTop: '20px',
        marginLeft: '1.5vw'
    },
    texto: {
        color: 'rgb(0, 193, 203)',
    },
    mail: {
        color: 'rgb(0, 193, 203)',
        fontStyle: 'italic',
        fontWeight: 'bold'
    }
})

class CadaComentario extends Component{
    constructor(props) {
        super(props)
        this.state ={
            cadaComment: []
        }}
        render () {
            return (
                <View style={styles.contenedor}>
                    <Text style={styles.mail}>{this.props.comentario.email}</Text>
                    <Text style={styles.texto}>{this.props.comentario.comentarioo}</Text>
                </View>
            )
        }
}

export default CadaComentario;