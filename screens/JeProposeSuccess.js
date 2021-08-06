import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet ,

} from 'react-native';
import * as Animatable from 'react-native-animatable';

const JeProposeSuccess = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Animatable.Image
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/done.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
            <Text style={styles.slogan}>
                FÉLICITATION ! votre service est maintenant disponible sur la plateforme. Vous serez notifié après chaque réservation. Restez connecter afin de pouvoir confirmer les réservation dans les temps svp.
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate.goBack()}
                style={[styles.signIn, {
                    borderColor: '#82B123',
                    borderWidth: 1,
                    marginTop: 15
                }]}
            >
                <Text style={[styles.textSign, {
                    color: '#82B123'
                }]}>OK</Text>
            </TouchableOpacity>
        </View>
    )

}

export default JeProposeSuccess;

// const {height} = Dimensions.get("screen");
// const height_logo = height * 0.5;

const styles = StyleSheet.create({
    container: {
      flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 18,
    },
    logo: {
        width: '50%',
        height: '30%',
    },
    slogan: {
        color: '#000',
        fontSize: 20,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Benne-Regular'
    },

  });
