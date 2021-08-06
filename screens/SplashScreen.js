import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    Modal,
    ScrollView,
    Pressable,
    ImageBackground,
} from 'react-native';
import * as RNLocalize from "react-native-localize";
import memoize from "lodash.memoize";
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import SwitchSelector from 'react-native-switch-selector';
import { useTranslation } from "react-i18next";

const options = [
        {label: 'Francais', value: 'fr'},
        {label: 'English', value: 'en'},
    ];

const SplashScreen = ({navigation}) => {

    const {t, i18n}=useTranslation();

    const { colors } = useTheme();

    const [showWarning, setShowWarning] = React.useState(false)
    const about = () =>{
        setShowWarning(true);
    }

    function selectLanguage() {
        if(i18n.language=='fr') {
            return 0;
        }
        else if(i18n.language=='en') {
            return 1;
        } else {
            return 0;
        }
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#82B123' barStyle="light-content"/>
          <View style={styles.switch}>
            <SwitchSelector 
                options={options} 
                hasPadding initial={selectLanguage()} 
                onPress={(language)=> {
                    i18n.changeLanguage(language);
                }}
            />
          </View>

          <Modal
            visible={showWarning}
            transparent
            onRequestClose={() => setShowWarning(false)}
            >
        
            <View style = {styles.centered_view}>
                <View style = {styles.warning_modal}>
                    <View style={styles.titel_confirmation}>
                        <Text>{t('aboutTitle')}</Text>
                    </View>
                    <View style={styles.view_text}>
                    <ScrollView>
                        <Text style={styles.titel_text}>
                            {t('about')}                       
                        </Text>
                    </ScrollView>
                    </View>
                    
                    <Pressable
                        onPress = {() => setShowWarning(false)}
                        style={styles.warning_button}
                    >       
                        <Text style={styles.titel_text2}>OK</Text>
                    </Pressable>
                </View>
                
            </View>
            
        </Modal>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
            <Text style={styles.slogan}>Safe - Fast - Confortable</Text>
        </View>
        <Animatable.View 
            style={styles.footer}
            animation="fadeInUpBig"
          >
            <Text style={styles.text}>
                {t('welcomeText')}
            </Text>

            <View style={styles.button}>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignInScreen')}
                        style={[styles.signIn, {
                            borderColor: '#82B123',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <LinearGradient
                            colors={['#82B123', '#527311']}
                            style={styles.signIn}    
                        >
                            <Text style = {[styles.textSign]}>{t('vas-y')} </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {about()}}
                        style={[styles.signIn, {
                            borderColor: '#82B123',
                            borderWidth: 1,
                            marginTop: 20
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#82B123'
                        }]}>{t('aboutButton')}</Text>
                    </TouchableOpacity>

                </View>
          </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.2;

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#82B123',
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 18,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
        marginTop: 20,
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
        backgroundColor: '#00000099'
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
    switch: {
        padding: 15,
    },
});

