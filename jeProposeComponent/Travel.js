import React, {useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';
import {StyleSheet, Text,Pressable, View, TextInput, Button, ScrollView, Alert, SafeAreaView, Modal, TouchableOpacity, Platform, FlatList} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import AuthService from '../service/AuthService';

import { useTranslation } from "react-i18next";

import {CAMCITY, CAMWORKTIME, CAMBAGGAGE,} from '../service/constants';
import AsyncStorage from "@react-native-community/async-storage";

const Travel = ({navigation}) => {

    const {t, i18n}=useTranslation();

    const theme = useTheme();

    const [showWarning, setShowWarning] = useState(false);

    const [data, setdata] = useState({
        user : {},
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

  const [startCity, setStartCity] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelTime, setTravelTime] = useState('');
  const [endCity, setEndCity] = useState('');
  const [numberOfPlace, setNumberOfPlace] = useState();
  const [travelPrice, setTravelPrice] = useState();
  const [startPoint, setStartPoint] = useState('');
  const [carDetails, setCarDetails] = useState('');
  const [baggageDetails, setBaggageDetails] = useState('');

    const paperTheme = useTheme();

    const handleSubmit = () => {
         if ( startCity === '' | travelDate === '' | travelTime === '' |
           endCity === '' | numberOfPlace === '' | travelPrice === '' |
           startPoint === '' | carDetails === '' || baggageDetails === '' ) {
            Alert.alert(t('fullFieldTitle'), t('fullFieldText'), [
                {text: 'Okay'}
            ]);
            return;
        }

        if( startCity !== '' | travelDate !== '' | travelTime !== '' |
          endCity !== '' | numberOfPlace !== '' | travelPrice !== '' |
          startPoint !== '' | carDetails !== '' || baggageDetails !== '')
            {
            AuthService.travel(data.user.id, startCity, travelDate, travelTime,
              endCity, numberOfPlace, travelPrice, startPoint,
              carDetails, baggageDetails)
            .then(res => {
                setShowWarning(true);
            })
            .catch(err => {
                Alert.alert(t('travelError'), t('travelErrorDetails'), [
                {text: 'Okay'}
            ]);
            })
        }
    };

  const [date, setDate] = useState(new Date());

    const [filterdData, setFilterdData] = useState([]);
    const [masterData, setMasterData] = useState([]);
    const [search, setSearch] = useState('');
    const [val, setVal] = useState({search})

    const [txt, setTxt] = useState("");
    const [selected, setSelected] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [filterdData1, setFilterdData1] = useState([]);
    const [masterData1, setMasterData1] = useState([]);
    const [search1, setSearch1] = useState('');
    const [val1, setVal1] = useState({search1})

    const [txt1, setTxt1] = useState("");
    const [selected1, setSelected1] = useState('');
    const [modalVisible1, setModalVisible1] = useState(false);

    const [filterdData2, setFilterdData2] = useState([]);
    const [masterData2, setMasterData2] = useState([]);
    const [search2, setSearch2] = useState('');
    const [val2, setVal2] = useState({search2})

    const [txt2, setTxt2] = useState("");
    const [selected2, setSelected2] = useState('');
    const [modalVisible2, setModalVisible2] = useState(false);

    const [filterdData3, setFilterdData3] = useState([]);
    const [masterData3, setMasterData3] = useState([]);
    const [search3, setSearch3] = useState('');
    const [val3, setVal3] = useState({search3})

    const [txt3, setTxt3] = useState("");
    const [selected3, setSelected3] = useState('');
    const [modalVisible3, setModalVisible3] = useState(false);

    const [showDateTime, setShowDateTime] = useState(false);


    useEffect(() => {
        fetchCities();
        return () => {

        }
    }, [])

    useEffect(() => {
        fetchTimes();
        return () => {

        }
    }, [])

    useEffect(() => {
        fetchBaggages();
        return () => {

        }
    }, [])

    const fetchCities = () => {
        fetch(CAMCITY)
        .then( (response) => response.json())
        .then( (responseJson) => {
            setFilterdData(responseJson);
            setMasterData(responseJson);
            setFilterdData1(responseJson);
            setMasterData1(responseJson);
        }).catch( (error) => {
            console.error(error);
        })
    }

    const fetchTimes = () => {
        fetch(CAMWORKTIME)
        .then( (response) => response.json())
        .then( (responseJson) => {
            setFilterdData2(responseJson);
            setMasterData2(responseJson);
        }).catch( (error) => {
            console.error(error);
        })
    }

    const fetchBaggages = () => {
        fetch(CAMBAGGAGE)
        .then( (response) => response.json())
        .then( (responseJson) => {
            setFilterdData3(responseJson);
            setMasterData3(responseJson);
        }).catch( (error) => {
            console.error(error);
        })
    }

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.cityName ? item.cityName.toUpperCase()
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
    const searchFilter1 = (text1) => {
        if (text1) {
            const newData1 = masterData1.filter((item) => {
                const itemData1 = item.cityName ? item.cityName.toUpperCase()
                                : ''.toUpperCase();
                const textData1 = text1.toUpperCase();
                return itemData1.indexOf(textData1) > -1;
            });
            setFilterdData1(newData1);
            setSearch1(text1);
            setTxt1(text1);
        } else {
            setFilterdData1(masterData1);
            setSearch1(text1);
        }
    }

    const searchFilter2 = (text2) => {
        if (text2) {
            const newData2 = masterData2.filter((item) => {
                const itemData2 = item.time;
            });
            setFilterdData2(newData2);
            setSearch2(text2);
            setTxt2(text2);
        } else {
            setFilterdData2(masterData2);
            setSearch2(text2);
        }
    }

    const searchFilter3 = (text3) => {
        if (text3) {
            const newData3 = masterData3.filter((item) => {
                const itemData3 = item.baggageDetails;
            });
            setFilterdData3(newData3);
            setSearch3(text3);
            setTxt3(text3);
        } else {
            setFilterdData3(masterData3);
            setSearch3(text3);
        }
    }

    const ItemView = ({item}) => {
        return(
            <>
                <TouchableOpacity
                    onPress={() => {
                        setStartCity(item.cityName);
                        setSelected(item.cityName);
                        setVal(item.cityName);
                        setModalVisible(false);
                    }}
                    style={[styles.optionContainer, {backgroundColor: item.cityName == selected ? '#eee' : '#fff'},
                    ]}

                >
                <Text style={[styles.optionTxt, {fontWeight: item.cityName == selected ? 'bold' : 'normal'},
                    ]}>
                        {item.cityName.toUpperCase()}
                    </Text>
                    {item.cityName == selected && (
                        <Icon name={'check'} size={22} color={'#82B123'} />
                    )}
                </TouchableOpacity>
            </>
        )
    }
    const ItemView1 = ({item}) => {
        return(
            <>
                <TouchableOpacity
                    onPress={() => {
                        setEndCity(item.cityName);
                        setSelected1(item.cityName);
                        setVal1(item.cityName);
                        setModalVisible1(false);
                    }}
                    style={[styles.optionContainer, {backgroundColor: item.cityName == selected1 ? '#eee' : '#fff'},
                    ]}

                >
                <Text style={[styles.optionTxt, {fontWeight: item.cityName == selected1 ? 'bold' : 'normal'},
                    ]}>
                        {item.cityName.toUpperCase()}
                    </Text>
                    {item.cityName == selected1 && (
                        <Icon name={'check'} size={22} color={'#82B123'} />
                    )}
                </TouchableOpacity>
            </>
        )
    }

    const ItemView2 = ({item}) => {
        return(
            <>
                <TouchableOpacity
                    onPress={() => {
                        setTravelTime(item.time);
                        setSelected2(item.time);
                        setVal2(item.time);
                        setModalVisible2(false);
                    }}
                    style={[styles.optionContainer, {backgroundColor: item.time == selected2 ? '#eee' : '#fff'},
                    ]}

                >
                <Text style={[styles.optionTxt, {fontWeight: item.time == selected2 ? 'bold' : 'normal'},
                    ]}>
                        {item.time}
                    </Text>
                    {item.time == selected2 && (
                        <Icon name={'check'} size={22} color={'#82B123'} />
                    )}
                </TouchableOpacity>
            </>
        )
    }

    const ItemView3 = ({item}) => {
        return(
            <>
                <TouchableOpacity
                    onPress={() => {
                        setBaggageDetails(item.baggageDetails);
                        setSelected3(item.baggageDetails);
                        setVal3(item.baggageDetails);
                        setModalVisible3(false);
                    }}
                    style={[styles.optionContainer, {backgroundColor: item.baggageDetails == selected3 ? '#eee' : '#fff'},
                    ]}

                >
                <Text style={[styles.optionTxt, {fontWeight: item.baggageDetails == selected3 ? 'bold' : 'normal'},
                    ]}>
                        {item.baggageDetails}
                    </Text>
                    {item.baggageDetails == selected3 && (
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
    const ItemSeparatorView1 = () => {
        return(
            <View
                style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}
            />

        )
    }

    const ItemSeparatorView2 = () => {
        return(
            <View
                style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}
            />

        )
    }

    const ItemSeparatorView3 = () => {
        return(
            <View
                style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}
            />

        )
    }

    return (
        <SafeAreaView style={styles.container}>
        <Modal
            visible={showWarning}
            transparent
            onRequestClose={() => setShowWarning(false)}
        >
            <View style = {styles.centered_view}>
                <View style = {styles.warning_modal}>
                    <View style={styles.titel_confirmation}>
                        <Text>{t('travelSuccess')}</Text>
                    </View>
                    <View style={styles.view_text}>
                        <Text style={styles.titel_text}>
                            {t('travelSuccessDetails')}
                        </Text>
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
        <Text style={styles.text_header}>{t('travelTitle')}</Text>
        <ScrollView>
            <Text style={styles.text_footer}>VILLE DE DÉPART</Text>
            <TouchableOpacity style={styles.action} onPress={()=> setModalVisible(true)}>
                <Icon name={'map-marker'} size={22} color={'#82B123'} style={{padding:10,}} />
                <Text
                    style={styles.txt}
                    numberOfLines={1}
                    value={startCity}
                    onChangeText= {(startCity) => setStartCity(startCity)}
                >
                    {startCity}
                </Text>
            </TouchableOpacity>
            <Modal
                animationType='slide'
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView>
                    <View style={styles.headerModal}>
                        <TouchableOpacity onPress={()=> setModalVisible(false)}>
                            <Icon name='chevron-left' size={26} color={'#82B123'} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Entrez votre ville de départ</Text>
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

                    <FlatList
                        data={filterdData}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ItemView}
                    />

                </View>
              </SafeAreaView>
            </Modal>

            <Text style={styles.text_footer}>JOUR DE DÉPART</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="calendar"
                        color="#82B123"
                        size={22}
                        style={{padding: 10,}}
                    />
                    <DatePicker
                        showIcon={false}
                        date={travelDate}
                        value={travelDate}
                        placeholder="Choisir le jour"
                        format="YYYY-MM-DD"
                        minDate="1970-01-01"
                        maxDate="2030-12-31"
                        confirmBtnText="Ok"
                        cancelBtnText="Annuler"
                        datePickerMode="spinner"
                        calendarViewShown={false}
                        style={{padding: 5,}}
                        onDateChange={(date) => {
                            setTravelDate(date);
                        }}
                        customStyles={{
                                dateInput: {
                                        borderColor: 'transparent',
                                        backgroundColor: 'transparent',
                                        height: 20,
                                        width: '100%',
                                        alignItems: 'flex-start',
                                        paddingLeft: 7
                                    },
                                    dateText: styles.inputBox,
                                    placeholderText: styles.inputBox
                            }}

                    />
                </View>

                <Text style={styles.text_footer}>HEURE DE DÉPART</Text>
                    <TouchableOpacity style={styles.action} onPress={()=> setModalVisible2(true)}>
                        <Icon name={'clock'} size={22} color={'#82B123'} style={{padding:10,}} />
                        <Text
                            style={styles.txt}
                            numberOfLines={1}
                            value={travelTime}
                            onChangeText= {(travelTime) => setTravelTime(travelTime)}
                        >
                            {travelTime}
                        </Text>
                    </TouchableOpacity>
                    <Modal
                        animationType='slide'
                        visible={modalVisible2}
                        onRequestClose={() => setModalVisible2(false)}
                    >
                        <SafeAreaView>
                            <View style={styles.headerModal}>
                                <TouchableOpacity onPress={()=> setModalVisible2(false)}>
                                    <Icon name='chevron-left' size={26} color={'#82B123'} />
                                </TouchableOpacity>
                                <Text style={styles.headerTitle}>Choisissez l'heure de départ</Text>
                                <TouchableOpacity onPress={()=> setModalVisible2(false)}>
                                    <Text style={styles.headerCancel}>Annuler</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.container}>
                        <TextInput
                            style={styles.textInputStyle}
                            value={search2}
                            value={txt2}
                            placeholder="Entrez votre heure de départ"
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            onChangeText={(text2) => searchFilter2(text2)}
                        />

                            <TouchableOpacity
                                onPress={() => {
                                        setTxt2('');
                                        setSelected2('');
                                        setVal2('');
                                    }}
                                    style={styles.cancel}
                            >
                                <Text style={styles.unselect}>Désélectionner</Text>

                            </TouchableOpacity>

                            <FlatList
                                data={filterdData2}
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={ItemSeparatorView2}
                                renderItem={ItemView2}
                            />

                            </View>
                        </SafeAreaView>
                    </Modal>

            <Text style={styles.text_footer}>DESTINATION</Text>
            <TouchableOpacity style={styles.action} onPress={()=> setModalVisible1(true)}>
                <Icon name={'map-marker'} size={22} color={'#82B123'} style={{padding:10,}} />
                <Text
                    style={styles.txt}
                    numberOfLines={1}
                    value={endCity}
                    onChangeText={(endCity) => setEndCity(endCity)}
                >
                    {endCity}
                </Text>
            </TouchableOpacity>

            <Modal
                animationType='slide'
                visible={modalVisible1}
                onRequestClose={() => setModalVisible1(false)}
            >
                <SafeAreaView>
                    <View style={styles.headerModal}>
                        <TouchableOpacity onPress={()=> setModalVisible1(false)}>
                            <Icon name='chevron-left' size={26} color={'#82B123'} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Entrez votre ville de départ</Text>
                        <TouchableOpacity onPress={()=> setModalVisible1(false)}>
                            <Text style={styles.headerCancel}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                <TextInput
                    style={styles.textInputStyle}
                    value={search1}
                    value={txt1}
                    placeholder="Entrez le nom de la ville d'arrivée"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={(text1) => searchFilter1(text1)}
                />

                    <TouchableOpacity
                        onPress={() => {
                                setTxt1('');
                                setSelected1('');
                                setVal1('');
                            }}
                            style={styles.cancel}
                    >
                        <Text style={styles.unselect}>Désélectionner</Text>

                    </TouchableOpacity>

                    <FlatList
                        data={filterdData1}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView1}
                        renderItem={ItemView1}
                    />

                    </View>
                </SafeAreaView>
            </Modal>

            <View style={styles.rowP}>

                <View style={styles.actionP}>
                    <Text style={styles.text_footer}>NOMBRE DE PLACES</Text>
                    <View style={styles.action1}>
                        <TextInput
                            placeholder="Nombre de places"
                            value={numberOfPlace}
                            keyboardType="numeric"
                            autoCapitalize="none"
                            onChangeText={(numberOfPlace)=> setNumberOfPlace(numberOfPlace)}
                        />

                    </View>
                </View>

                <View style={styles.actionP}>
                    <Text style={styles.text_footer}>MONTANT (FCFA)</Text>
                    <View style={styles.action1}>
                        <TextInput
                            placeholder="Montant"
                            value={travelPrice}
                            keyboardType="numeric"
                            autoCapitalize="none"
                            onChangeText={(travelPrice)=> setTravelPrice(travelPrice)}
                        />

                    </View>
                </View>

            </View>
            <Text style={styles.text_footer2}>PRÉCISION SUR LE LIEU DE DÉPART</Text>
            <View style={styles.action4}>
                <TextInput
                    placeholder="Exemple: Devant la poste centrale, près de la CNPS"
                     value={startPoint}
                    style={{width: '100%',}}
                    multiline
                    numberOfLines={4}
                    autoCapitalize="none"
                    onChangeText={(startPoint)=> setStartPoint(startPoint)}
                />
            </View>
            <Text style={styles.text_footer}>PRÉCISION SUR LA VOITURE</Text>
            <View style={styles.action4}>
                <TextInput
                    placeholder="Exemple: Toyota yaris de couleur noir. Plaque numéro CE1253"
                    value={carDetails}
                    style={{width: '100%',}}
                    multiline
                    numberOfLines={4}
                    autoCapitalize="none"
                    onChangeText={(carDetails)=> setCarDetails(carDetails)}
                />
            </View>

            <Text style={styles.text_footer}>PRÉCISION SUR LES BAGGAGES</Text>
            <TouchableOpacity style={styles.action} onPress={()=> setModalVisible3(true)}>
                <Icon name={'package'} size={22} color={'#82B123'} style={{padding:10,}} />
                <Text
                    style={styles.txt}
                    numberOfLines={1}
                    value={baggageDetails}
                    onChangeText={(baggageDetails) => setBaggaDetails(baggageDetails)}
                >
                    	{baggageDetails}
                </Text>
            </TouchableOpacity>
            <Modal
                animationType='slide'
                visible={modalVisible3}
                onRequestClose={() => setModalVisible3(false)}
            >
                <SafeAreaView>
                    <View style={styles.headerModal}>
                        <TouchableOpacity onPress={()=> setModalVisible3(false)}>
                            <Icon name='chevron-left' size={26} color={'#82B123'} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Quels baggages acceptez-vous?</Text>
                        <TouchableOpacity onPress={()=> setModalVisible3(false)}>
                            <Text style={styles.headerCancel}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                <TextInput
                    style={styles.textInputStyle}
                    value={search3}
                    value={txt3}
                    placeholder="Quel baggages acceptez-vous?"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={(text3) => searchFilter3(text3)}
                />

                    <TouchableOpacity
                        onPress={() => {
                                setTxt3('');
                                setSelected3('');
                                setVal3('');
                            }}
                            style={styles.cancel}
                    >
                        <Text style={styles.unselect}>Désélectionner</Text>

                    </TouchableOpacity>

                    <FlatList
                        data={filterdData3}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView3}
                        renderItem={ItemView3}
                    />

                    </View>
                </SafeAreaView>
            </Modal>
             <TouchableOpacity
                        onPress={() => {handleSubmit()}}
                        android_ripple={{color: '#F7F700'}}
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
                        <Text style = {[styles.textSign]}>JE PROPOSE UN VOYAGE</Text>
                    </LinearGradient>
                </TouchableOpacity>

        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
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
export default Travel;
