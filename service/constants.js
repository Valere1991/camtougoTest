import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

// API URL
//export const BaseURL = "https://backendcam.gvc-solution-app.com";
export const BaseURL = "http://10.0.2.2:5000";

// API End Points

// Authentication
export const REGISTER = `${BaseURL}/register`;
export const LOGIN = `${BaseURL}/auth`;

// Formular List
export const CAMCITY = `${BaseURL}/cam_city`;
export const CAMCOUNTRY = `${BaseURL}/camtougo_country_code`;
export const CAMWORKTIME = `${BaseURL}/camtougo_worktime`;
export const CAMBAGGAGE = `${BaseURL}/camtougo_baggage`;

export const CAMCOLIS = `${BaseURL}/camtougo_colis`;

// User Profil
export const POST_IMAGE = `${BaseURL}/user/profile/upload`
export const UPDATE_PROFILE = `${BaseURL}/user/profil`;
export const FORGOT_PASSWORD = `${BaseURL}/...`;

// Camtougo services
export const JE_PROPOSE_VOYAGE = `${BaseURL}/user/je_propose_voyage`;
export const JE_PROPOSE_COLIS = `${BaseURL}/user/je_propose_colis`;

export const SEARCH_ALL_VOYAGE = `${BaseURL}/user/voyages`;
export const SEARCH_VOYAGE = `${BaseURL}/user/travels`;
export const SEARCH_COLIS = `${BaseURL}/user/colis`;

