package com.camtougo.backendCamtougo.controller;

import com.camtougo.backendCamtougo.model.CountryCode;
import com.camtougo.backendCamtougo.service.CountryCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/camtougo_country_code")
public class CountryCodeController {

    @Autowired
    private CountryCodeService countryCodeService;

    @GetMapping
    public List<CountryCode> findAllCountryCode() {
        return countryCodeService.getCountryCodeCamtougo();
    }

    @PostMapping
    public CountryCode addCountryCode(@RequestBody CountryCode countryCode) {
        return countryCodeService.saveCountryCode(countryCode);
    }

    @PostMapping("/list")
    public List<CountryCode> addCountryCodes(@RequestBody List<CountryCode> countryCodes){
        return countryCodeService.saveCountryCodes(countryCodes);
    }
}
