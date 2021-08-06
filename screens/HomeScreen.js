import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTranslation } from "react-i18next";

import JeProposeScreen from './JeProposeScreen';
import TuGoOuScreen from './TuGoOuScreen';
import ColisScreen from './ColisScreen';
import VosAvisScreen from './VosAvisScreen';
import NotificationScreen from './NotificationScreen';

const HomeScreen = ({navigation}) => {
  const theme = useTheme();

  const {t, i18n}=useTranslation();

  const Drawer = createDrawerNavigator();

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor='#82B123' barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          horizontal={false}
          height={200}
          activeDotColor="#82B123">
          <View style={styles.slide}>
            <Image
              source={require('../assets/banners/image1.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/banners/image2.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/banners/image3.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper>
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('JeProposeScreen', {title: 'Je propose'})
          }>
          <View style={styles.categoryIcon}>
            <Ionicons name="ios-car" size={35} color="#FFFFFF" />
          </View>
          <Text style={styles.categoryBtnTxt}>{t('travel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('TuGoOuScreen', {title: 'Tu go où?'})
          }>
          <View style={styles.categoryIcon}>
            <Ionicons
              name="ios-search"
              size={35}
              color="#FFFFFF"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>{t('travelSearch')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('ColisScreen', {title: 'Mon colis'})
          }>
          <View style={styles.categoryIcon}>
            <Ionicons
              name="ios-cube"
              size={35}
              color="#FFFFFF"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>{t('colisSearchTitle')}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.categoryContainer, {marginTop: 10}]}>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => navigation.navigate('Notifications', {title: 'Message'})}>
          <View style={styles.categoryIcon}>
            <Ionicons name="ios-mail-open" size={35} color="#FFFFFF" />
          </View>
          <Text style={styles.categoryBtnTxt}>{t('message')}</Text>

        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => navigation.navigate('VosAvisScreen', {title: 'Les avis des utilisateurs'})}>
          <View style={styles.categoryIcon}>
            <Ionicons name="ios-heart" size={35} color="#FFFFFF" />
          </View>
          <Text style={styles.categoryBtnTxt}>{t('avis')}</Text>

        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() =>
            navigation.openDrawer()}>
          <View style={styles.categoryIcon}>
            <MaterialIcons name="expand-more" size={35} color="#FFFFFF" />
          </View>
          <Text style={styles.categoryBtnTxt}>{t('more')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
          }}>
          {t('traject')}
        </Text>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={require('../assets/banners/yaounde.png')}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cities}>Yaoundé - Douala</Text>
            <Text style={styles.citiesDetails}>
              {t('traject1')}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={require('../assets/banners/bafoussam.png')}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cities}>Douala - Bafoussam</Text>
            <Text style={styles.citiesDetails}>
              {t('traject2')}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={require('../assets/banners/buéa.jpg')}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cities}>Buéa - Yaoundé</Text>
            <Text style={styles.citiesDetails}>
              {t('traject3')}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  <NavigationContainer initialRouteName='Bienvenue'>
  <Drawer.Navigator>
    <Drawer.Screen name='Bienvenue' component={HomeScreen} />
    <Drawer.Screen name='Je propose' component={JeProposeScreen} />
    <Drawer.Screen name='Tu go où ?' component={TuGoOuScreen} />
    <Drawer.Screen name='Envoyer un colis' component={ColisScreen} />
    <Drawer.Screen name='Les avis des clients' component={VosAvisScreen} />
    <Drawer.Screen name='Messages' component={NotificationScreen} />
  </Drawer.Navigator>
</NavigationContainer>

};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#82B123',
    opacity: 0.8,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#82B123',
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 140,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    paddingTop: 10,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cities: {
    fontWeight: 'bold',
  },
  cardTitle1: {
    fontWeight: 'bold',
  },
  citiesDetails: {
    paddingTop: 5,
    fontSize: 9,
    color: '#444',
  },
});
