import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import {db} from '../firebase/config'
import Posteos from '../components/Posteos';
class Home extends Component {
    constructor() {
        super()
        this.state={
            posteos : []
        }
    }
    componentDidMount(){
        db.collection("Posteos").onSnapshot((docs)=>{
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
            <View>
                <Text>Home</Text>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={(data)=>data.id}
                    renderItem={(item)=>(<Posteos data={item}/>)}
                
                ></FlatList>
            </View>
        )
    }

}

export default Home;