import React, { useEffect, useState } from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Share from 'react-native-share';

import files from '../assets/filesBase64';

import { useTranslation } from "react-i18next";

import AsyncStorage from '@react-native-community/async-storage';

const ProfileScreen = () => {

  const {t, i18n}=useTranslation();

    const [data, setdata] = useState({
        'user': {},
    });

    const userData = () => {

        AsyncStorage.getItem('token')
            .then(res => {
               const val = JSON.parse(res).user;
               // console.log('test', val);
                setdata({
                    ...data,
                    'user': val,
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    userData();

  const myCustomShare = async() => {
    const shareOptions = {
      message: "Télécharge l'application CAMTOUGO. Je l'utilise pour voyager partout dans le cameroun en toute sécurité.",
      url: "data:image/png;base64,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",
      // urls: [files.image1, files.image2]
    }

    try {
      const ShareResponse = await Share.open(shareOptions);
      //console.log(JSON.stringify(ShareResponse));
    } catch(error) {
      console.log('Error => ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            source={{uri : `${data.user.photo}` }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{`${data.user.firstName}`} {`${data.user.lastName}`}</Title>
            <Caption style={styles.caption}>@{`${data.user.username}`}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{`${data.user.country}`}, {`${data.user.city}`}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{`${data.user.countryCode}`} {`${data.user.phoneNumber}`}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{`${data.user.email}`}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>0</Title>
            <Caption>fois voyageur</Caption>
          </View>
          <View style={styles.infoBox}>
            {/* <Title>{`${data.user.voyageRequests.length}`}</Title> */}
            <Title>0</Title>
            <Caption>fois chauffeur</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#82B123" size={25}/>
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={myCustomShare}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#82B123" size={25}/>
            <Text style={styles.menuItemText}>Invitez vos amis</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#82B123" size={25}/>
            <Text style={styles.menuItemText}>Ce que les utilisateurs pensent de vous</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
