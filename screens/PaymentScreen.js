import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    StatusBar,

} from 'react-native';

import { useTheme } from '@react-navigation/native';

const PaymentScreen = ({navigation}) => {
    const { colors } = useTheme();

    const [showWarning, setShowWarning] = React.useState(false)
    const about = () =>{
        setShowWarning(true);
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#82B123' barStyle="light-content"/>
                <Text style={styles.centered_view}> La page des infos pour le paiement</Text>
      </View>
    );
};

export default PaymentScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.2;

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo * 1.8,
        height: height_logo,
    },
    slogan: {
        color: '#000',
        fontSize: 20,
    },
    title: {
        color: '#05375a',
        fontSize: 30,
    },
    text: {
        color: 'grey',
        marginTop: 50,
        fontSize: 15,
    },
    signIn: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
    },
    button: {
      alignItems: 'center',
       marginTop: 30
  },
  centered_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       // backgroundColor: '#00000099'
       margin: 50,
    },
    warning_modal: {
        width: '90%',
        height: 600,
        backgroundColor: '#82B123',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 20,
    },
    titel_confirmation: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    view_text: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        height: 450,
    },
    titel_text: {
        color: '#fff',
       fontSize: 18,
    },
    warning_button: {
        backgroundColor: '#F7F700',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    titel_text2: {
        color: '#000',
       textAlign: 'center',
       fontSize: 25,
       fontWeight: 'bold',
    },
});

