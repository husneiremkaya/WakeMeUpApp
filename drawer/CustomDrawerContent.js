import React, {Component} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import {IMAGE} from '../images/Image';


export class CustomDrawerContent extends Component {
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
            
            <View style={{height: 150, alignItems: 'center', justifyContent: 'center', marginTop:20}}>
               <Image source={IMAGE.ICON_WORLD}
                style={{height: 120, width: 120, borderRadius:60}}
                />
            </View>
            <ScrollView style={{marginLeft: 5}}>
                <TouchableOpacity
                style={{marginTop: 20,}}
                onPress={() => this.props.navigation.navigate('HomeApp')}
                >
                <Text>Konum Bul</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{marginTop: 20}}
                onPress={() => this.props.navigation.navigate('Profil')}
                >
                <Text>Profil</Text>
                </TouchableOpacity>
            </ScrollView>

            </SafeAreaView>
        )
    }
}