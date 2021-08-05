import React, {useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';
import {StyleSheet, Text,Pressable, View, TextInput, Button, ScrollView, Alert, SafeAreaView, Modal, TouchableOpacity, Platform, FlatList, Image} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import AuthService from '../service/AuthService';

import { useTranslation } from "react-i18next";

import {CAMCITY, CAMWORKTIME, CAMBAGGAGE,SEARCH_COLIS, SEARCH_VOYAGE} from '../service/constants';

const ColisScreen = ({navigation}) => {

    const {t, i18n}=useTranslation();

    const theme = useTheme();

    const [showWarning, setShowWarning] = useState(false);

    const [data, setdata] = useState({
        startCity: '',
        travelDate: '',
        endCity: '',
    });

    const startCityPicker = (val) => {
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
    const travelDatePicker = (val) => {
        if( val ) {
            setdata({
                ...data,
                travelDate: val,
            });
        } else {
            setdata({
                ...data,
                travelDate: val,
            });
        }
    }

    const endCityPicker = (val) => {
        if( val) {
            setdata({
                ...data,
                endCity: val,
            });
        } else {
            setdata({
                ...data,
                endCity: val,
            });
        }
    }


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
    const [modalVisible2, setModalVisible2] = useState(false)

    const [showDateTime, setShowDateTime] = useState(false);

   // const travelLink = SEARCH_VOYAGE?startCity=data.startCity&travelDate=data.travelDate&endCity=data.endCity;

    useEffect(() => {
        fetchCities();
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
    const params = {
        startCity: data.startCity,
        travelDate: data.travelDate,
        endCity: data.endCity,
    }
    const fetchColis = () => {
       axios.get(SEARCH_COLIS, {params})
            .then(res => {
              const val = res.data;
             // console.log('test', val);
              setFilterdData2(res.data);
              setMasterData2(res.data);
              setModalVisible2(true)
            })
            .catch(err => {
                Alert.alert(t('travelError'), t('travelErrorDetails'), [
                {text: 'Okay'}
            ]);
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
                const itemData2 = item.startCity;
            });
            setFilterdData2(newData2);
            setSearch2(text2);
            setTxt2(text2);
        } else {
            setFilterdData2(masterData2);
            setSearch2(text2);
        }
    }

    const ItemView = ({item}) => {
        return(
            <>
                <TouchableOpacity
                    onPress={() => {
                        startCityPicker(item.cityName);
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
                        endCityPicker(item.cityName);
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

                    }}
                >
                <View style={{ flexDirection: 'row', padding: 12 }}>
                  <View>
                    <Image
                      style={{width: 90, height: 90, borderRadius: 100, backgroundColor: "#AA00FF", justifyContent: 'center'}}
                      source={{uri : item.user.photo }}
                    />
                  </View>
                  <View style={{ justifyContent: 'center', marginLeft: 10, padding: 12}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', paddingLeft: 12}}>{item.startCity} - {item.endCity}</Text>
                    <Text style={{fontSize: 12, fontWeight: 'bold', paddingLeft: 12, color: '#82B123'}}>{item.travelDate} à {item.travelTime}</Text>
                    <Text style={{fontSize: 12, paddingTop: 12, paddingLeft: 8}}> Prix: {item.shippingPrice} FCFA</Text>
                  </View>
                </View>
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
                        onPress = {() => navigation.goBack()}
                        style={styles.warning_button}
                    >
                        <Text style={styles.titel_text2}>OK</Text>
                    </Pressable>
                </View>

            </View>

        </Modal>
        <Text style={styles.text_header}>{t('searchColisTitle')}</Text>
        <ScrollView>
            <Text style={styles.text_footer}>VILLE DE DÉPART</Text>
            <TouchableOpacity style={styles.action} onPress={()=> setModalVisible(true)}>
                <Icon name={'map-marker'} size={22} color={'#82B123'} style={{padding:10,}} />
                <Text
                    style={styles.txt}
                    numberOfLines={1}
                    value={data.startCity}
                    onChangeText= {(val) => startCityPicker(val)}
                >
                    {data.startCity}
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
                        date={data.travelDate}
                        value={data.travelDate}
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
                            travelDatePicker(date);
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

            <Text style={styles.text_footer}>DESTINATION</Text>
            <TouchableOpacity style={styles.action} onPress={()=> setModalVisible1(true)}>
                <Icon name={'map-marker'} size={22} color={'#82B123'} style={{padding:10,}} />
                <Text
                    style={styles.txt}
                    numberOfLines={1}
                    value={data.endCity}
                    onChangeText={(val) => endCityPicker(val)}
                >
                    {data.endCity}
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

            <TouchableOpacity
                      onPress={()=> {fetchColis()}}
                      android_ripple={{color: '#F7F700'}}
                      style={[styles.signIn, {
                          borderColor: '#82B123',
                          borderWidth: 1,
                          marginTop: 50
                      }]}
                  >
                  <LinearGradient
                      colors={['#82B123', '#527311']}
                      style={styles.signIn}
                  >
                      <Text style = {[styles.textSign]}>{t('searchTravelTitle')}</Text>
                  </LinearGradient>
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
                        <Text style={styles.headerTitle}>Sélectionnez un service</Text>
                        <TouchableOpacity onPress={()=> setModalVisible2(false)}>
                            <Text style={styles.headerCancel}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>

                    <TouchableOpacity
                        onPress={() => {
                                setTxt2('');
                                setSelected2('');
                                setVal2('');
                            }}
                            style={styles.cancel}
                    >

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

        </ScrollView>
        </SafeAreaView>
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
        marginTop: 50,
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
export default ColisScreen;
