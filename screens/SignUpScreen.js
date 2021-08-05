import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    AsyncStorage,
    ToastAndroid,
    Modal,
    Pressable,
    ActivityIndicator,
    SafeAreaView,
    FlatList,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { CAMCOUNTRY } from "../service/constants";
import { useTranslation } from "react-i18next";

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../components/context';

import DatePicker from 'react-native-datepicker';

import AuthService from '../service/AuthService';

const SignUpScreen = ({navigation}) => {

    const {t, i18n}=useTranslation();

    const { colors } = useTheme();

    const [data, setdata] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        email: '',
        date: '',
        countryCode: '',
        selectedCode: [],
        phoneNumber: '',
        username: '',
        password: '',
        c_password: '',
        countryCodePicker: false,
        check_textInput1: false,
        check_textInput2: false,
        check_textInput3: false,
        check_textInput4: false,
        check_textInput5: false,
        check_textInput6: false,
        check_textInput7: false,
        check_datePicker: false,
        secureTextEntry: true,
        secureTextEntry2: true,
        isValidUser: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    });

    const changeCountryCode = (val) => {
        setdata({
            ...data,
            countryCode: val,
            countryCodePicker: true,
            selectedCode: [0],
        })
    }

    const textInputChangeFirstName = (val) => {
        if( val.trim().length >= 2 ) {
            setdata({
                ...data,
                firstName: val,
                check_textInputChange1: true,
                isValidUser: true
            });
        } else {
            setdata({
                ...data,
                firstName: val,
                check_textInputChange1: false,
                isValidUser: false
            });
        }
    }

    const textInputChangeLastName = (val) => {
        if( val.trim().length >= 2 ) {
            setdata({
                ...data,
                lastName: val,
                check_textInputChange2: true,
                isValidUser: true
            });
        } else {
            setdata({
                ...data,
                lastName: val,
                check_textInputChange2: false,
                isValidUser: false
            });
        }
    }

    const birthDatePicker = (val) => {
        if( val) {
            setdata({
                ...data,
                birthDate: val,
                check_datePicker: true,
                isValidUser: true
            });
        } else {
            setdata({
                ...data,
                birthDate: val,
                check_datePicker: false,
                isValidUser: false
            });
        }
    }

    const textInputChangeBirthDate = (date) => {
        if( date.trim().length >= 8 ) {
            setdata({
                ...data,
                birthDate: date,
                check_textInputChange3: true,
                isValidUser: true
            });
        } else {
            setdata({
                ...data,
                birthDate: date,
                check_textInputChange3: false,
                isValidUser: false
            });
        }
    }

    const textInputChangeEmail = (val) => {
        if( val.trim().length >=5 ) {
            setdata({
                ...data,
                email: val,
                check_textInputChange4: true,
                isValidUser: true
            });
        } else {
            setdata({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const textInputChangeCountryCode = (txt) => {
        if( txt.trim().length >=1 ) {
            setdata({
                ...data,
                countryCode: txt,
                check_textInputChange4: true,
                isValidUser: true
            });
        } else {
            setdata({
                ...data,
                countryCode: txt,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
    const textInputChangePhoneNumber = (val) => {
        if( val.trim().length >= 9 ) {
            setdata({
                ...data,
                phoneNumber: val,
                check_textInputChange5: true,
                isValidUser: true
            });
        } else {
            setdata({
                ...data,
                phoneNumber: val,
                check_textInputChange5: false,
                isValidUser: false
            });
        }
    }

    const textInputChangeUsername = (val) => {
        if( val.trim().length >= 4 ) {
            setdata({
                ...data,
                username: val,
                check_textInputChange6: true,
                isValidUser: true
            });
        } else {
            setdata({
                ...data,
                username: val,
                check_textInputChange6: false,
                isValidUser: false
            });
        }
    }

    const textInputChangePassword = (val) => {
        if( val.trim().length >= 8 ) {
            setdata({
                ...data,
                password: val,
                check_textInputChange7: true,
                isValidUser: true
            });
        } else {
            setdata({
                ...data,
                password: val,
                check_textInputChange7: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setdata({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setdata({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const handleConfirmPasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setdata({
                ...data,
                c_password: val,
                isValidConfirmPassword: true
            });
        } else {
            setdata({
                ...data,
                c_password: val,
                isValidConfirmPassword: false
            });
        }
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 2 ) {
            setdata({
                ...data,
                isValidUser: true
            });
        } else {
            setdata({
                ...data,
                isValidUser: false
            });
        }
    }


    const updateSecureTextEntry = () => {
        setdata({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const [sessionMsg0, setSessionMsg0] = useState({error0: ""});
    const [sessionMsg1, setSessionMsg1] = useState({error1: ""});
    const [sessionMsg2, setSessionMsg2] = useState({error2: ""});
    const [sessionMsg3, setSessionMsg3] = useState({error3: ""});

    const [showWarning, setShowWarning] = useState(false);

    const [loading, setLoading] = useState({isLoading: false});

    const [date, setDate] = useState('');

    const [showSelectedCode, setShowSelectedCode] = useState([0])

    const [filterdData3, setFilterdData3] = useState([]);
    const [masterData3, setMasterData3] = useState([]);
    const [search3, setSearch3] = useState('');
    const [val3, setVal3] = useState({search3})

    const [txt3, setTxt3] = useState("+0");
    const [selected3, setSelected3] = useState('');
    const [modalVisible3, setModalVisible3] = useState(false);

    useEffect(() => {
        fetchCountryCode();
        return () => {
            
        }
    }, [])

    const fetchCountryCode = () => {
        fetch(CAMCOUNTRY)
        .then( (response) => response.json())
        .then( (responseJson) => {
            setFilterdData3(responseJson);
            setMasterData3(responseJson);
        }).catch( (error) => {
            console.error(error);
        })
    }

    const searchFilter3 = (text3) => {
        if (text3) {
            const newData3 = masterData3.filter((item) => {
                const itemData3 = item.name;
            });
            setFilterdData3(newData3);
            setSearch3(text3);
            setTxt3(text3);
        } else {
            setFilterdData3(masterData3);
            setSearch3(text3);
        }
    }

    const ItemView3 = ({item}) => {
        return(
            <>
                <TouchableOpacity 
                    onPress={() => {
                        textInputChangeCountryCode(item.phone_code);
                        setSelected3(item.name);
                        setVal3(item.name);
                        setModalVisible3(false);
                    }}
                    style={[styles.optionContainer, {backgroundColor: item.phone_code == selected3 ? '#eee' : '#fff'},
                    ]}
                    
                >
                <Text style={[styles.optionTxt, {fontWeight: item.phone_code == selected3 ? 'bold' : 'normal'},
                    ]}>
                        {item.name} : {item.code} ({item.phone_code})
                    </Text>
                    {item.phone_code == selected3 && (
                        <Icon name={'check'} size={22} color={'#82B123'} />
                    )}
                </TouchableOpacity>           
            </>
        )
    }

    const ItemSeparatorView3 = () => {
        return(
            <View 
                style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}} 
            />
                
        )
    }


    const handleSubmit = () => {
        if ( data.firstName.length == 0 | data.lastName.length ==0 | data.birthDate.length ==0 |
            data.email.length ==0 | data.countryCode.length ==0 | data.phoneNumber.length ==0 | data.username.length ==0) {
            setSessionMsg0({error0: t('fullFieldText')})
            ToastAndroid.showWithGravity(t('fullFieldText'), ToastAndroid.LONG, ToastAndroid.CENTER,)
            return;
        } else if ( data.password.length == 0 | data.password.length < 8) {
            setSessionMsg1({error1: t('passwordValidation')}) 
            return setSessionMsg0({error0: ""});
        } else if ( data.password != data.c_password) {
            setSessionMsg2({error2: t('c_passwordValidationBoth')})
            return setSessionMsg1({error1: ""});

        }

        if(data.firstName!="" & data.lastName!="" & data.birthDate!="" & data.email!="" & data.countryCode!="" & data.phoneNumber!="" & data.username!="" & data.password!=""){
            setLoading({ isLoading: true });
            
            AuthService.register(data)
            .then(res => {
                navigation.navigate('SignUpSuccess')
            })
            .catch(err => {
                setSessionMsg3({error3:t('registerSuccess')})
                setSessionMsg1({error1: ""})
                setSessionMsg0({error0: ""})
                setSessionMsg2({error2: ""})
            })
        }
    };

    return(
        <View style={styles.container}>
            <ScrollView>
            <StatusBar backgroundColor='#82B123' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>S'enrégistrer!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}>
                <Text style={styles.text_footer}>{t('firstNameLabel')} </Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user"
                        color="#82B123"
                        size={20}
                    />
                    <TextInput
                        placeholder={t('firstNamePlaceholder')}
                        value={data.firstName}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val)=> textInputChangeFirstName(val)}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange1 ? 
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather 
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                    </Animatable.View>
                    : null }
                </View>
                <Text style={styles.text_footer_2}>{t('lastNameLabel')}</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user"
                        color="#82B123"
                        size={20}
                    />
                    <TextInput
                        placeholder={t('lastNamePlaceholder')}
                        value={data.lastName}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val)=> textInputChangeLastName(val)}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange2 ? 
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather 
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                    </Animatable.View>
                    : null }
                </View>

                <Text style={styles.text_footer_2}>{t('birthDateLabel')}</Text>
                
                <View style={styles.action}>
            
                    <FontAwesome
                        name="calendar"
                        color="#82B123"
                        size={20}
                    />
                        <DatePicker
                            showIcon={false}
                            style={styles.textInput}
                            date={data.birthDate}
                            value={data.birthDate}
                            placeholder={t('birthDatePlaceholder')}
                            format="YYYY-MM-DD"
                            minDate="1970-01-01"
                            maxDate="2003-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => {
                                birthDatePicker(date);
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
                    {data.check_datePicker ? 
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather 
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                    </Animatable.View>
                    : null }                                
                        
                </View>
                    
                <Text style={styles.text_footer_2}>{t('emailLabel')}</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="send"
                        color="#82B123"
                        size={20}
                    />
                    
                        <TextInput
                            placeholder={t('emailPlaceholder')}
                            value={data.email}
                            style={styles.textInput}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={(val)=> textInputChangeEmail(val)}
                            onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                        />
                    {data.check_textInputChange4 ? 
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather 
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                    </Animatable.View>
                    : null }
                </View>

                <Text style={styles.text_footer_2}>{t('phoneNumberLabel')}</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="phone"
                        color="#82B123"
                        size={20}
                    />
                    <TouchableOpacity style={styles.actionC} onPress={()=> setModalVisible3(true)}>
                        <Text 
                            style={styles.txt} 
                            numberOfLines={1} 
                            value={data.countryCode}
                            onChangeText={(val) => alert(val)}
                        >
                            {t('coutryLabel')}: {data.countryCode}
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
                                <Text style={styles.headerTitle}>{t('coutryPlaceholder')}</Text>
                                <TouchableOpacity onPress={()=> setModalVisible3(false)}>
                                    <Text style={styles.headerCancel}>{t('cancelButton')}</Text>
                                </TouchableOpacity>                       
                            </View>
                            <View style={styles.container2}>
                        <TextInput
                            style={styles.textInputStyle}
                            value={search3}
                            value={txt3}
                            placeholder={t('coutryLabel')}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            onChangeText={(text3) => searchFilter3(text3)}
                        />
                        
                            <TouchableOpacity
                                onPress={() => {
                                        textInputChangeCountryCode('');
                                        setSelected3('');
                                        setVal3('');
                                    }}
                                    style={styles.cancel}
                            >
                                <Text style={styles.unselect}>{t('unselectButton')}</Text>

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
                    <TextInput
                        placeholder={t('phoneNumberPlaceholder')}
                        value={data.phoneNumber}
                        style={styles.textInput}
                        keyboardType="numeric"
                        autoCapitalize="none"
                        onChangeText={(val)=> textInputChangePhoneNumber(val)}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange5 ? 
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather 
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                    </Animatable.View>
                    : null }
                </View>

                <Text style={styles.text_footer_2}>{t('usernameLabel')}</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#82B123"
                        size={20}
                    />
                    <TextInput
                        placeholder={t('usernamePlaceholder')}
                        value={data.username}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val)=> textInputChangeUsername(val)}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange6 ? 
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather 
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                    </Animatable.View>
                    : null }
                </View>
                <Text style ={styles.usernamefailed}>{sessionMsg1.error1}</Text>
                <Text style= {styles.text_footer_2}
                                >{t('passwordLabel')}</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#82B123"
                        size={20}
                    />
                    <TextInput
                        placeholder={t('passwordPlaceholder')}
                        value={data.password}
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val)=> handlePasswordChange(val)}
                        onChangeText={(val)=> textInputChangePassword(val)}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange7 ? 
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather 
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                    </Animatable.View>
                    : null }
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
    
                    </TouchableOpacity>
                </View>
                <Text style ={styles.usernamefailed}>{sessionMsg2.error2}</Text>
                <Text style= {styles.text_footer_2}
                                >{t('c_passwordPlaceholder')}</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#82B123"
                        size={20}
                    />
                    <TextInput
                        placeholder={t('c_passwordValidation')}
                        name = "c_password"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val)=> handleConfirmPasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        <Feather 
                            name="eye-off"
                            color="grey"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.button}>
                <Text style ={styles.usernamefailed}>{sessionMsg0.error0}</Text>
                <Text style ={styles.usernamefailed}>{sessionMsg3.error3}</Text>

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
                        <Text style = {[styles.textSign]}>{t('RegisterButton')}</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <Spinner visible={loading.isLoading} />

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    android_ripple={{color: '#F7F700'}}
                    style={[styles.signIn, {
                        borderColor: '#82B123',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#82B123'
                    }]}>{t('LoginButton')}</Text>
                </TouchableOpacity>

                </View>
            </Animatable.View>
            
            </ScrollView>
        </View>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#82B123'
    },
    container2: {
        padding: 30,

    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontSize: 30,
        fontFamily: 'Benne-Regular',
        marginTop: 30,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        fontFamily: 'Benne-Regular'
    },
    text_footer_2: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 35
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionC: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#82B123',
        borderRadius: 12,
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
        fontFamily: 'Benne-Regular',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
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
    containerDate: {
    padding: 20,
    },
    input: {
        width: '30%',
        borderRadius: 8,
        backgroundColor: '#f4f4f4',
        marginBottom: 20,
    },
    inputBorder: {
        width: '30%',
        borderRadius: 8,
        borderColor: '#82B123',
        borderWidth: 1,
        marginBottom: 10,
    },
    inputBackground: {
        borderRadius: 15,
        backgroundColor: '#f4f4f4',
        paddingHorizontal: 25,
        marginBottom: 20,
    },
    picker: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: '#82B123',
        borderWidth: 1,
    },
    usernamefailed: {
        color: 'red',
        alignItems: "center",
        marginLeft: 30,
        fontFamily: 'Benne-Regular'
    },
    centered_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
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
    titel_text: {
        color: '#fff',
       textAlign: 'center',
       fontSize: 15,
       fontFamily: 'Benne-Regular',
    },
    warning_button: {
        backgroundColor: '#F7F700',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titel_text2: {
        color: '#000',
       textAlign: 'center',
       fontSize: 20,
       fontWeight: 'bold',
       fontFamily: 'Benne-Regular'
    },
    datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  unselect: {
        alignItems: 'flex-end',
        color:'#82B123',
        paddingLeft: 10,
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
        paddingLeft: 10,
        color: '#333',
        fontSize: 12,
        padding: 5,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        padding: 10,
    },
    textInputStyle: {
    paddingLeft: 10,
    color: '#05375a',
    height: 50,
    borderWidth: 1,
    margin: 5,
    borderColor: '#82B123',
    borderRadius: 10,
  },

});