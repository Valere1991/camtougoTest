import React, {useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import AsyncStorage from '@react-native-community/async-storage';

import ImagePicker from 'react-native-image-crop-picker';

import ImgToBase64 from 'react-native-image-base64';

import AuthService from '../service/AuthService';

import {POST_IMAGE} from '../service/constants';

const EditProfilScreen = () => {

  const [data, setdata] = useState({
        user: {},
  });

  const userData = () => {

        AsyncStorage.getItem('token')
            .then(res => {
               const val = JSON.parse(res).user;
            //   console.log('test', val);
                setdata({
                    ...data,
                    'user': val,
                });
            })
            .catch(err => {
              //  console.log(err);
            });
    };

    userData();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(data.user.username);
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const [cniNumber, setCniNumber] = useState('');
  const [drivingLicenceNr, setDrivingLicenceNr] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [photo, setPhoto] = useState('https://image.flaticon.com/icons/png/512/1946/1946429.png');

  const {colors} = useTheme();

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(photo => {
     // console.log(photo);
      setPhoto(photo.path);
      bs.current.snapTo(1);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(photo => {
    //  console.log(photo);
      setPhoto(photo.path);
      bs.current.snapTo(1);
    });
  }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Photo de profile</Text>
        <Text style={styles.panelSubtitle}>modifier</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Prendre une photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Utiliser une photo existante</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Annuler</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  let bs = React.createRef();
  let fall = new Animated.Value(1);

  const photoConfirm = () => {
    AuthService.postImage(photo)
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const handleSubmit = () => {
     AuthService.updateProfile( username, email,
                               countryCode, phoneNumber,
                               cniNumber, drivingLicenceNr,
                               country, city)
      .then(res => {
       // alert(email);
         alert("Modifications réussites");
      })
      .catch(err => {
          console.log(err);
      })
  };

  return (
    <View style={styles.container}>
    <ScrollView>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
    }}>
        <Animated.View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                 // uri : `${data.user.photo}`,
                  uri: photo,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}} >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                <Text style={{marginTop: 10, fontSize: 10, fontWeight: 'bold'}}> changer photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commandButton} onPress={() => {photoConfirm()}}>
            <Text style={styles.panelButtonTitle}>confirmer cette photo</Text>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 14}}> </Text>
        </Animated.View>
        <Text style={{fontWeight:'bold', paddingTop: 10,}}>Nom d'utilisateur</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Nom d'utilisateur"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={username}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(username) => {setUsername(username)}}
          />
        </View>
        <Text style={{fontWeight:'bold', paddingTop: 10,}}>Adresse email</Text>
          <View style={styles.action}>
            <FontAwesome name="envelope-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Adresse email"
              placeholderTextColor="#666666"
              keyboardType="email-address"
              autoCorrect={false}
              value={email}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              onChangeText={(email) => {setEmail(email)}}
            />
        </View>
        <Text style={{fontWeight:'bold', paddingTop: 10,}}>Code et Numéro de téléphone</Text>
        <View style={styles.action}>
          <Feather name="phone" color={colors.text} size={20} />
          <TextInput
            placeholder="Code du pays"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            value={countryCode}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(countryCode) => {setCountryCode(countryCode)}}
          />
          <TextInput
            placeholder="Numéro de téléphone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            value={phoneNumber}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(phoneNumber) => {setPhoneNumber(phoneNumber)}}
          />

        </View>
        <Text style={{fontWeight:'bold', paddingTop: 10,}}>Numéro de CNI, Récipicé ou Passport</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Numéro de CNI, Récipicé ou Passport"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={cniNumber}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(cniNumber) => {setCniNumber(cniNumber)}}
          />
        </View>
        <Text style={{fontWeight:'bold', paddingTop: 10,}}>Numéro du permis de conduire</Text>
        <View style={styles.action}>
          <FontAwesome name="globe" color={colors.text} size={20} />
          <TextInput
            placeholder="Numéro du permis de conduire"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={drivingLicenceNr}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(drivingLicenceNr) => {setDrivingLicenceNr(drivingLicenceNr)}}
          />
        </View>
        <Text style={{fontWeight:'bold', paddingTop: 10,}}>Pays de résidence</Text>
        <View style={styles.action}>
          <Icon name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            placeholder="Pays"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={country}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(country) => {setCountry(country)}}
          />
        </View>
        <Text style={{fontWeight:'bold', paddingTop: 10,}}>Ville de résidence</Text>
        <View style={styles.action}>
          <Icon name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            placeholder="Ville"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={city}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(city) => {setCity(city)}}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={() => {handleSubmit()}}>
          <Text style={styles.panelButtonTitle}>Modifier</Text>
        </TouchableOpacity>
      </Animated.View>
      </ScrollView>
    </View>
  );
};

export default EditProfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#82B123',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 20,
    height: 35,
    fontFamily: 'Benne-Regular',
  },
  panelSubtitle: {
    fontSize: 117,
    color: 'gray',
    height: 30,
    marginBottom: 10,
    fontFamily: 'Benne-Regular',
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#82B123',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Benne-Regular',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#82B123',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    fontFamily: 'Benne-Regular',
  },
});
