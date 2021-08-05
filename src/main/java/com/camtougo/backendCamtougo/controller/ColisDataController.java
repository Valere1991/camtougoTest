package com.camtougo.backendCamtougo.controller;

import com.camtougo.backendCamtougo.model.Baggage;
import com.camtougo.backendCamtougo.model.ColisData;
import com.camtougo.backendCamtougo.service.BaggageService;
import com.camtougo.backendCamtougo.service.ColisDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/camtougo_colis")
public class ColisDataController {

    @Autowired
    private ColisDataService colisDataService;

    @GetMapping
    public List<ColisData> findAllColis() {
        return colisDataService.getColisCamtougo();
    }

    @PostMapping
    public ColisData addColisData(@RequestBody ColisData colisData) {
        return colisDataService.saveColisData(colisData);
    }

    @PostMapping("/list")
    public List<ColisData> addColisDatas(@RequestBody List<ColisData> colisDatas){
        return colisDataService.saveColis(colisDatas);
    }
}
