import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import {db} from '../firebase/config'
import Posteos from '../components/Posteos';
import HeaderLogo from '../components/HeaderLogo'

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: 'rgb(28, 35, 43)'
    }
})

class Home extends Component {
    constructor(props) {
        super(props)
        this.state={
            posteos : []
        }
    }
    componentDidMount(){
        db.collection("posteos").orderBy("createdAt", "desc").onSnapshot((docs)=>{
            let posteo= []
            docs.forEach(doc => {
                posteo.push({
                    id:doc.id,
                    data:doc.data()
                })
            });
            this.setState({
                posteos:posteo
            })
        
        })
        
    }

    render() {
        return(
            <ScrollView style={styles.contenido}>
                <HeaderLogo />
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={(data)=>(<Posteos data={data.item.data} navigation={this.props.navigation} id={data.item.id} />)} 
                    
                ></FlatList>


            </ScrollView>
        )
    }

}

export default Home;