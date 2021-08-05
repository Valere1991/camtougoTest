import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Modal, FlatList, Text, Dimensions, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const CamCityPicker2 = ({options, onChangeSelect, text, label,}) => {

   // const width = Dimensions.get('window');

    const [txt, setTxt] = useState(text);
    const [selected, setSelected] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    function renderOption(item){
        return(
            <TouchableOpacity 
                onPress={() => {
                    onChangeSelect(item.id);
                    setTxt(item.cityName);
                    setModalVisible(false);
                    setSelected(item.id);
                }}
                style={[styles.optionContainer, {backgroundColor: item.id == selected ? '#eee' : '#fff'},
                ]}
                
            >
                <Text style={[styles.optionTxt, {fontWeight: item.id == selected ? 'bold' : 'normal'},
                ]}>
                    {item.cityName} (Region: {item.region})
                </Text>
                {item.id == selected && (
                    <Icon name={'check'} size={22} color={'#82B123'} />
                )}
            </TouchableOpacity>
        );
    }

    return (
        <>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity 
            onPress={()=> setModalVisible(true)}
                style={styles.container}
            >
            <Text style={styles.txt} numberOfLines={1} >{txt}</Text>
            <Icon name={"chevron-down"} size ={26} color={'#82B123'} />
            </TouchableOpacity>
            <Modal  
                animationType="slide" 
                visible={modalVisible} 
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView>
                    <View style={styles.headerModal}>
                        <TouchableOpacity 
                            onPress={()=> setModalVisible(false)}
                        >
                            <Icon name="chevron-left" size={26} color={'#82B123'} />
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>{text}</Text>

                        <TouchableOpacity 
                            onPress={()=> setModalVisible(false)}
                        >
                            <Text style={styles.modalCancel}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={options}
                        kexExtractor={(item) => String(item.id)}
                        renderItem={({item}) => renderOption(item)}
                    />
                </SafeAreaView>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderRadius: 8,
        paddingLeft: 40,
        paddingHorizontal: 12,
        marginHorizontal: 20,
        borderColor: '#82B123',
        borderWidth: 1,
        fontSize: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txt: {
        color: '#555',
        fontSize: 16,
      //  width: width - 90,
    },
    headerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        borderBottomColor: '#82B123',
        borderBottomWidth: 1,
        paddingBottom: 12,
        paddingTop: 15,
    },
    modalTitle: {
        fontSize: 18,
        color: '#82B123',
    },
    modalCancel: {
        fontSize: 14,
        color: '#000',
        fontWeight: '600',
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        padding: 10,
    },
    optionTxt: {
        fontSize: 16,
        color: '#000',
    },
    label: {
       color: "#555",
       fontSize: 13,
       paddingLeft: 20,
       paddingVertical: 10, 
       marginTop: 40,
    },

})

export default CamCityPicker2;
