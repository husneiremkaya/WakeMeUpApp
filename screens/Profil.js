import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import firebase from '../database/firebase';
import {CustomHeader} from '../drawer';

export class Profil extends Component {
  constructor() {
    super();
    this.state = { 
      uid: ''
    }
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  render() {
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }    
    return (
      <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title="Profil" isHome={true} navigation={this.props.navigation}/>
      <View style={styles.container}>
      
        <Text style = {styles.textStyle}>
          Merhaba, {this.state.displayName}
        </Text>

        <Button
          color="#fc0fc0"
          title="Çıkış Yap"
          onPress={() => this.signOut()}
        />
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
});