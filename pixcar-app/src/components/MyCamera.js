import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-web';
import { Camera } from 'expo-camera';

class MyCamera extends Component{
    constructor(){
        super()
        this.state={
            metodosDeCamara: '',
           
        }
    }
    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
        .then(() =>{
         this.setState({
             permission: true,
         })
        })
        .catch(error => {
            this.setState({ error: error.message})
        })
     }

     tomarFoto(){
        this.metodosDeCamara.takePictureAsync()
   .then(photo => {
      this.setState({
        photo: photo.uri, //Es una uri interna temporal de la foto.
        showCamera:false
      })
     })
}

    guardarFoto(){fetch(this.state.photo)
        .then(res=>res.blob())
        .then(image =>{
          const ref=storage.ref(`photos/${Date.now()}.jpg`)
          ref.put(image)
               .then(()=>{
                  ref.getDownloadURL()
                       .then(url => {
                           this.props.onImageUpload(url);
                        })
                })
        })
        .catch(error => {
            this.setState({ error: error.message})
        })
}
        render() {
            return(
                <View>
        <Camera
                    style={styles.cameraBody}
                    type={Camera.Constants.Type.back}
                    ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
            />
            <TouchableOpacity 
                    style={styles.shootButton}
                    onPress={()=>this.takePicture()}>
                    <Text>Tomar foto</Text>
            </TouchableOpacity>

            <Image style={styles.preview}
                    source={ {uri:this.state.photo} }
            />
            <View style={styles.buttonArea}>

            <TouchableOpacity onPress={()=>this.savePhoto()}>
                <Text>Aceptar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.clearPhoto()}>
                <Text>Rechazar</Text>
            </TouchableOpacity>

            </View>

            </View>
            )
        }
}