package com.camtougo.backendCamtougo.controller;

import com.camtougo.backendCamtougo.model.Baggage;
import com.camtougo.backendCamtougo.model.WorktimeC;
import com.camtougo.backendCamtougo.service.BaggageService;
import com.camtougo.backendCamtougo.service.WorktimeCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/camtougo_baggage")
public class BaggageController {

    @Autowired
    private BaggageService baggageService;

    @GetMapping
    public List<Baggage> findAllBaggage() {
        return baggageService.getBaggageCamtougo();
    }

    @PostMapping
    public Baggage addBaggage(@RequestBody Baggage baggage) {
        return baggageService.saveBaggage(baggage);
    }

    @PostMapping("/list")
    public List<Baggage> addBaggages(@RequestBody List<Baggage> baggages){
        return baggageService.saveBaggages(baggages);
    }
}
