import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {CustomDrawerContent} from './drawer/CustomDrawerContent';
import {Register, Login , Home, Profil} from './screens';

const navOptionHandler = () => ({
    headerShown: false
  })

const Drawer = createDrawerNavigator();

function DrawerNavigator({navigation}) {
  return (
    <Drawer.Navigator initialRouteName="HomeApp" 
      drawerContent={() => <CustomDrawerContent navigation={navigation}/>}>
        <Drawer.Screen name="HomeApp" component={Home} />
        <Drawer.Screen name="Profil" component={Profil} />
    </Drawer.Navigator>
  )
}

const StackApp = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <StackApp.Navigator initialRouteName="Login">
          <StackApp.Screen name="Home" component={DrawerNavigator} options={navOptionHandler}/>
          <StackApp.Screen name="Login" component={Login} options={navOptionHandler}/>
          <StackApp.Screen name="Register" component={Register} options={navOptionHandler}/>
        </StackApp.Navigator>
    </NavigationContainer>
  );
}