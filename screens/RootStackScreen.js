import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import SignUpSuccess from '../screens/SignUpSuccess';
import JeProposeSuccess from '../screens/JeProposeSuccess';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'initialRouteName="SplashScreen" >
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="SignUpSuccess" component={SignUpSuccess}/>
        <RootStack.Screen name="JeProposeSuccess" component={JeProposeSuccess}/>
    </RootStack.Navigator>
);

export default RootStackScreen;