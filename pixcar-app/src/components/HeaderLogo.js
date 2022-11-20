import React from "react";
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    contenedorLogo: {
        alignItems: 'center',
        backgroundColor: 'rgb(28, 35, 43)'
    },
    fotoLogo: {
        width: '70vw',
        height: '100px'
    }
})

function HeaderLogo() {
    return(
        <View style={styles.contenedorLogo}>
            <Image
            style={styles.fotoLogo}
            source={require('../../assets/pixcarLogo.png')}
            />
        </View>
    )
}

export default HeaderLogo;