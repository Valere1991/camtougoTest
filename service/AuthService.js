import axios from 'axios';
import * as HTTPStatus from 'http-status';

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




    async postImage(url: string, photo: string) {
      let body = new FormData();

      body.append('photo', {
        uri: photo,
        name: 'photo',
        type: 'photo/jpeg',
      });
      let request;

      try {
        request = await fetch(c.POST_IMAGE, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body
        });
      } catch (error) {
        throw new Error('Could not send image');
      }

      try {
        let { status, body } = await request.json();

        switch (status) {
          case HTTPStatus.BAD_REQUEST:
          case HTTPStatus.INTERNAL_SERVER_ERROR:
            throw new Error('Something went wrong...');

          case HTTPStatus.FORBIDDEN:
            return { status };

          default:
            return { body, status };
        }
      } catch (error) {
        throw new Error('Could not wait for the result');
      }

      // return axios.put(c.POST_IMAGE, photo, {
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   body: {
      //     'photo': photo
      //   }
      // })
    };

    updateProfile(userId, username, email, countryCode, phoneNumber, cniNumber, drivingLicenceNr, country, city){

      const data = {username, email, countryCode, phoneNumber, cniNumber, drivingLicenceNr, country, city}
        return axios.put(c.UPDATE_PROFILE + '/' + userId, data ,{
          headers: {
            'Content-Type': 'application/json',
          },
        })
    }

    travel(userId, startCity, travelDate, travelTime, endCity, numberOfPlace, travelPrice, startPoint, carDetails, baggageDetails){

      const data = {startCity, travelDate, travelTime, endCity, numberOfPlace, travelPrice, startPoint, carDetails, baggageDetails}
        return axios.post(c.JE_PROPOSE_VOYAGE + '/' + userId + '/je_propose_voyage', data, {

            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })

    }

    colis(userId, startCity, travelDate, travelTime, endCity, shipping, shippingPrice, startPoint, carDetails, colisDetails){

      const data = {userId, startCity, travelDate, travelTime, endCity, shipping, shippingPrice, startPoint, carDetails, colisDetails}
     return axios.post(c.JE_PROPOSE_COLIS + '/' + userId + '/je_propose_colis', data, {

            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })

    }

}
export default new AuthService();

