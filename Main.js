import React, { useEffect } from 'react';
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import { View, ActivityIndicator, I18nManager, Alert } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import { DrawerContent } from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import ColisScreen from './screens/ColisScreen';
import TuGoOuScreen from './screens/TuGoOuScreen';
import JeProposeScreen from './screens/JeProposeScreen';
import VosAvisScreen from './screens/VosAvisScreen';

import { AuthContext } from './components/context';

import RNSecureStore from "react-native-secure-store";

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';

import SwitchSelector from 'react-native-switch-selector';



const options = [
  {label: 'Francais', value: 'fr'},
  {label: 'English', value: 'en'},
];

const Drawer = createDrawerNavigator();

const Main = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [token, settoken] = React.useState(null); 

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    username: null,
    token: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#858585',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          //isSignout: false,
          token: action.token,
          user: action.user,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
         // isSignout: true,
          token: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          username: action.username,
          token: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(users) => {
      // const token = users.token;
      // const user = users.user;
        try {
           await AsyncStorage.getItem('token')
           .then(data => {
             dispatch({ type: 'LOGIN', token: data});
            // console.log(users.token);
           }).catch(error => {
               console.log(error);
           })
        } catch(e) {
          console.log(e);
        }    
    },
    signOut: async() => {
       settoken(null);
       setIsLoading(false);
      try {
        await AsyncStorage.removeItem('token');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
     
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {

    setTimeout(async() => {
      // setIsLoading(false);
      let token;
      token = null;
      try {
         token = await AsyncStorage.getItem('token');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: token });
    }, 1000);
    }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  
  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
      { loginState.token !== null ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="ColisScreen" component={ColisScreen} />
          <Drawer.Screen name="TuGoOuScreen" component={TuGoOuScreen} />
          <Drawer.Screen name="JeProposeScreen" component={JeProposeScreen} />
          <Drawer.Screen name="VosAvisScreen" component={VosAvisScreen} />
        </Drawer.Navigator>
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
}

export default Main;
