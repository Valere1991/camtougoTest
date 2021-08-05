import axios from 'axios';

import * as c from './constants';
import { POST_IMAGE } from "./constants";

class AuthService {

    register(data){
     return axios.post(c.REGISTER, data, {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'firstName': data.firstName,
                'lastName': data.lastName,
                'birthDate': data.birthDate,
                'email': data.email,
                'phoneNumber': data.phoneNumber,
                'username': data.username,
                'password': data.password
            })
        })
    }

    login(data){
     return axios.post(c.LOGIN, data, {
             headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })

    }

    forgotPassword(data) {
        return axios.post(c.FORGOT_PASSWORD, data, {
             headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: {
                'email': data.email,
            }
        })
    }

    postImage(photo) {
      return axios.put(c.POST_IMAGE, photo, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        body: {
          'photo': photo
        }
      })
    };

    updateProfile(userId, username, email, countryCode, phoneNumber, cniNumber, drivingLicenceNr, country, city){

      const data = {username, email, countryCode, phoneNumber, cniNumber, drivingLicenceNr, country, city}
        return axios.put(c.UPDATE_PROFILE + '/' + userId, data ,{
          headers: {
            'Content-Type': 'application/json',
          },
        })
    }

    travel(userId, startCity, travelDate, travelTime,
           endCity, numberOfPlace, travelPrice, startPoint,
           carDetails, baggageDetails){
     return axios.post(c.JE_PROPOSE_VOYAGE + '/' + userId,
       startCity, travelDate, travelTime, endCity, numberOfPlace,
       travelPrice, startPoint, carDetails, baggageDetails, {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: {
                'startCity': startCity,
                'travelDate': travelDate,
                'travelTime': travelTime,
                'endCity': endCity,
                'numberOfPlace': numberOfPlace,
                'travelPrice': travelPrice,
                'startPoint': startPoint,
                'carDetails': carDetails,
                'baggageDetails': baggageDetails,
            }
        })

    }

    colis(data){
     return axios.post(c.JE_PROPOSE_COLIS, data, {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body:{
                'startCity': data.startCity,
                'travelDate': data.travelDate,
                'travelTime': data.travelTime,
                'endCity': data.endCity,
                'numberOfPlace': data.shipping,
                'travelPrice': data.shippingPrice,
                'startPoint': data.startPoint,
                'carDetails': data.carDetails,
                'baggageDetails': data.colisDetails,
            }
        })

    }

}
export default new AuthService();

