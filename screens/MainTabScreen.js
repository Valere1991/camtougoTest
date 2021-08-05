import React, {useState, useEffect} from 'react';
import {StyleSheet, Text,Pressable, TextInput, Button, ScrollView, Alert, SafeAreaView, Modal, Platform, FlatList} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import axios from 'axios';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import MapTestScreen from './MapTestScreen';
import EditProfileScreen from './EditProfileScreen';
import PaymentScreen from './PaymentScreen';

import { useTranslation } from "react-i18next";

import AsyncStorage from '@react-native-community/async-storage';

import {useTheme, Avatar} from 'react-native-paper';
import {View} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CardListScreen from './CardListScreen';
import CardItemDetails from './CardItemDetails';
import {SEARCH_ALL_VOYAGE} from '../service/constants';

const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const PaymentStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (

  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#82B123',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotificationStackScreen}
      options={{
        tabBarLabel: 'Chat',
        tabBarColor: '#82B123',
        tabBarIcon: ({color}) => (
          <Icon name="ios-chatbubbles" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#82B123',
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Payments"
      component={PaymentStackScreen}
      options={{
        tabBarLabel: 'Payment infos',
        tabBarColor: '#82B123',
        tabBarIcon: ({color}) => (
          <Icon name="ios-card" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => {

    const [data, setdata] = useState({
        startCity: '',
        travelDate: '',
        travelTime: '',
        'travel': {},
        'user': {},
    });


    const travelPicker = (val) => {
        if( val) {
            setdata({
                ...data,
                startCity: val,
            });
        } else {
            setdata({
                ...data,
                startCity: val,
            });
        }
    }

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

    const [filterdData, setFilterdData] = useState([]);
    const [masterData, setMasterData] = useState([]);
    const [search, setSearch] = useState('');
    const [val, setVal] = useState({search})

    const [txt, setTxt] = useState("");
    const [selected, setSelected] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchTravels();
        return () => {

        }
    }, [])

    const fetchTravels = () => {
        fetch(SEARCH_ALL_VOYAGE)
        .then( (response) => response.json())
        .then( (responseJson) => {
            setFilterdData(responseJson);
            setMasterData(responseJson);
        }).catch( (error) => {
            console.error(error);
        })
    }

    const searchTravel = () => {

      axios.get(SEARCH_ALL_VOYAGE)
          .then(res => {
            const val = res.data.content;
              setModalVisible(true);
            //  console.log('test', val);
              setdata({
                  ...data,
                  'travel': res.val,
              });
          })
          .catch(err => {
              console.log(err);
          });
    };

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.startCity ? item.startCity.toUpperCase()
                                : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilterdData(newData);
            setSearch(text);
            setTxt(text);
        } else {
            setFilterdData(masterData);
            setSearch(text);
        }
    }

  const ItemView = ({item}) => {
        return(
            <>
                <TouchableOpacity
                    onPress={() => {
                        travelPicker(item.startCity);
                        setSelected(item.startCity);
                        setVal(item.startCity);
                        setModalVisible(false);
                    }}
                    style={[styles.optionContainer, {backgroundColor: item.startCity == selected ? '#eee' : '#fff'},
                    ]}

                >
                    <Text style={[styles.optionTxt, {fontWeight: item.startCity == selected ? 'bold' : 'normal'},
                      ]}>
                        Ville de départ: {item.startCity.toUpperCase()}
                    </Text>
                    {item.startCity == selected && (
                        <Icon name={'check'} size={22} color={'#82B123'} />
                    )}
                </TouchableOpacity>
            </>
        )
    }

   const ItemSeparatorView = () => {
        return(
            <View
                style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}
            />

        )
    }

  const {colors} = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'CAMTOUGO',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon.Button
                name="ios-search"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => {searchTravel()}}
              />
              <Modal
                animationType='slide'
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView>
                    <View style={styles.headerModal}>
                        {/* <TouchableOpacity onPress={()=> setModalVisible(false)}>
                            <Icon name='chevron-left' size={26} color={'#82B123'} />
                        </TouchableOpacity> */}
                        <Text style={styles.headerTitle}>Trouver un voyage</Text>
                        <TouchableOpacity onPress={()=> setModalVisible(false)}>
                            <Text style={styles.headerCancel}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                <TextInput
                    style={styles.textInputStyle}
                    value={search}
                    value={txt}
                    placeholder='Entrez le nom de la ville de départ'
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={(text) => searchFilter(text)}
                />

                    <TouchableOpacity
                        onPress={() => {
                                setTxt('');
                                setSelected('');
                                setVal('');
                            }}
                            style={styles.cancel}
                    >
                        <Text style={styles.unselect}>Désélectionner</Text>

                    </TouchableOpacity>
                    <Text style={styles.textInputStyle}>{`${data.startCity}`}</Text>
                    <FlatList
                        data={filterdData}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ItemView}
                    />

                </View>
              </SafeAreaView>
            </Modal>
              <TouchableOpacity
                style={{paddingHorizontal: 10, marginTop: 5}}
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <Avatar.Image
                //  source={{uri : `${data.user.photo}` }}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="CardListScreen"
        component={CardListScreen}
        options={({route}) => ({
          title: route.params.title,
          headerBackTitleVisible: false
        })}
      />
      <HomeStack.Screen
        name="CardItemDetails"
        component={CardItemDetails}
        options={({route}) => ({
          // title: route.params.title,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff'
        })}
      />
    </HomeStack.Navigator>
  );
};

const NotificationStackScreen = ({navigation}) => (
  <NotificationStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <NotificationStack.Screen
      name="Notifications"
      component={NotificationScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#FFFFFF"
            color = "#000"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </NotificationStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: 'Edit Profile',
        }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};

const PaymentStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <PaymentStack.Screen
        name="Profile"
        component={PaymentScreen}
        options={{
          title: 'INFOS',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
    </ProfileStack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 30,
  },
  text_footer: {
        color: '#82B123',
        fontSize: 12,
        marginTop: 20,
        fontWeight: 'bold',
    },
    text_header: {
        color: '#333',
        fontSize: 14,
        marginTop: 10,
        fontWeight: 'bold',
        marginBottom: 20,
        alignItems: 'center',
    },
    text_footer2: {
        color: '#82B123',
        fontSize: 12,
        marginTop: 70,
        fontWeight: 'bold',
    },
  itemStyle: {
    padding: 15,
  },
  textInputStyle: {
    paddingLeft: 10,
    color: '#05375a',
    height: 50,
    borderBottomWidth: 1,
    margin: 5,
    borderColor: '#82B123',
    borderRadius: 10,

  },
  optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        padding: 10,
    },
    cancel: {
        width: '40%',
        padding: 12,
    },
    unselect: {
        alignItems: 'flex-end',
        color:'#82B123',
    },
    modal: {
        padding: 30,
    },
    action: {
        flexDirection: 'row',
        marginTop: 5,
        borderColor: '#f2f2f2',
        paddingBottom: 5,
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        justifyContent: 'space-between',
    },
    action1: {
        flexDirection: 'row',
        marginTop: 5,
        borderColor: '#f2f2f2',
        paddingBottom: 5,
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        justifyContent: 'space-between',
    },
    action4: {
        flexDirection: 'row',
        marginTop: 5,
        borderColor: '#f2f2f2',
        paddingBottom: 5,
        borderWidth: 1,
        borderRadius: 10,
        height: 80,
        justifyContent: 'space-between',
    },
    actionP: {
        marginTop: 5,
        height: 50,
        justifyContent: 'space-between',
        width: 180,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -15,
        paddingLeft: 10,
        color: '#05375a',
        borderWidth: 1,
        margin: 5,
        borderRadius: 10,
        },
    textInput1: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -15,
        paddingLeft: 10,
        color: '#05375a',
        borderBottomWidth: 1,
        margin: 5,
        borderColor: '#333',
        borderRadius: 10,
    },
    headerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        borderBottomColor: '#82B123',
        borderBottomWidth: 1,
        paddingBottom: 12,
        paddingTop: 12,
    },
    headerTitle: {
        color: '#82B123',
        fontSize: 16,
    },
    headerCancel: {
        color: '#82B123',
        fontSize: 18,
        fontWeight: 'bold',
    },
    txt: {
        padding: 10,
        color: '#333',
        fontSize: 18,
    },
    rowP: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 50,
        marginTop: 50,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Benne-Regular'
    },
    warning_modal: {
        width: 300,
        height: 300,
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
        fontFamily: 'Benne-Regular'
    },
    view_text: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    centered_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    titel_text2: {
        color: '#000',
       textAlign: 'center',
       fontSize: 20,
       fontWeight: 'bold',
       fontFamily: 'Benne-Regular'
    },
});
