package com.camtougo.backendCamtougo.controller;

import com.camtougo.backendCamtougo.model.CamCity;
import com.camtougo.backendCamtougo.service.CamCityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cam_city")
public class CamCityController {

    @Autowired
    private CamCityService camCityService;

    @GetMapping
    public List<CamCity> findAllCamCity() {
        return camCityService.getCamCity();
    }

    @PostMapping
    public CamCity addCity(@RequestBody CamCity camCity) {
        return camCityService.saveCity(camCity);
    }

    @PostMapping("/list")
    public List<CamCity> addCities(@RequestBody List<CamCity> cities){
       return camCityService.saveCities(cities);
    }

}
