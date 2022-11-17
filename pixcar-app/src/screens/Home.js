import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
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
        db.collection("posteos").onSnapshot((docs)=>{
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
            <ScrollView>
                <Text>Posteos</Text>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={(data)=>data.id}
                    renderItem={(item)=>(<Posteos data={item}/>)}
                ></FlatList>


            </ScrollView>
        )
    }

}

export default Home;