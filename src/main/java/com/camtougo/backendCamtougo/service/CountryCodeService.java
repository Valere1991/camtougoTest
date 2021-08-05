package com.camtougo.backendCamtougo.service;

import com.camtougo.backendCamtougo.model.Baggage;
import com.camtougo.backendCamtougo.model.CountryCode;
import com.camtougo.backendCamtougo.repository.BaggageRepository;
import com.camtougo.backendCamtougo.repository.CountryCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryCodeService {

    @Autowired
    private CountryCodeRepository countryCodeRepository;

    // new CountryCode of Camtougo
    public CountryCode saveCountryCode(CountryCode countryCode) {
        return countryCodeRepository.save(countryCode);
    }

    public List<CountryCode> saveCountryCodes(List<CountryCode> countryCodes) {
        return countryCodeRepository.saveAll(countryCodes);
    }

    // List of camtougo CountryCode
    public List<CountryCode> getCountryCodeCamtougo() {
        return countryCodeRepository.findAll();
    }
}
