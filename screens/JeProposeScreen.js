import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView, Modal, TouchableOpacity, Platform} from 'react-native';
import { useForm, Controller } from "react-hook-form";

import Travel from '../jeProposeComponent/Travel';
import Colis from '../jeProposeComponent/Colis';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

const JeProposeScreen = ({navigation}) => {
  return (
      <Tab.Navigator>
        <Tab.Screen name='Un voyage' component={Travel}/>
        <Tab.Screen name='Livrer un colis' component={Colis}/>
      </Tab.Navigator>
  );
}
export default JeProposeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  }
})
