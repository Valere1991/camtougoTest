package com.camtougo.backendCamtougo.service;

import com.camtougo.backendCamtougo.model.CamCity;
import com.camtougo.backendCamtougo.repository.CamCityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CamCityService {

    @Autowired
    private CamCityRepository camCityRepository;

    // new city of Cameroon
    public CamCity saveCity(CamCity camCity) {
        return camCityRepository.save(camCity);
    }

    public List<CamCity> saveCities(List<CamCity> cities) {
        return camCityRepository.saveAll(cities);
    }

    // List og cameroon cities
    public List<CamCity> getCamCity() {
        return camCityRepository.findAll();
    }
}
