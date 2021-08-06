import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView, Modal, TouchableOpacity, Platform, FlatList} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';


const CamCityPicker = () => {

    const [filterdData, setFilterdData] = useState([]);
    const [masterData, setMasterData] = useState([]);
    const [search, setSearch] = useState('');
    const [val, setVal] = useState({search})

    const [txt, setTxt] = useState("");
    const [selected, setSelected] = useState('');

    useEffect(() => {
        fetchCities();
        return () => {
            
        }
    }, [])

    const fetchCities = () => {
        const apiURL = "http://10.0.2.2:8082";      
        fetch(`${apiURL}/cam_city`)
        .then( (response) => response.json())
        .then( (responseJson) => {
            setFilterdData(responseJson);
            setMasterData(responseJson);
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

    const ItemView = ({item}) => {
        return(
            <>
                <TouchableOpacity 
                    onPress={() => {
                        setTxt(item.cityName);
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
    const ItemSeparatorView = () => {
        return(
            <View 
                style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}} 
            />
                
        )
    }

    return (
        <SafeAreaView style={ {flex: 1} }>
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
                <FontAwesome 
                    name="map-marker"
                    color="#82B123"
                    size={20}
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
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 30,
  },
  text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 20,
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
        marginTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        width: "100%"
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -15,
        paddingLeft: 10,
        color: '#05375a',
        borderWidth: 1,
        margin: 5,
        borderColor: '#82B123',
        borderRadius: 10,
        },
    textInput1: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -15,
        paddingLeft: 10,
        color: '#05375a',
        borderBottomWidth: 1,
        margin: 5,
        borderColor: '#82B123',
        borderRadius: 10,
    },
});
export default CamCityPicker;