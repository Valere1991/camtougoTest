package com.camtougo.backendCamtougo.service;

import com.camtougo.backendCamtougo.model.Baggage;
import com.camtougo.backendCamtougo.model.WorktimeC;
import com.camtougo.backendCamtougo.repository.BaggageRepository;
import com.camtougo.backendCamtougo.repository.WorktimeCRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BaggageService {

    @Autowired
    private BaggageRepository baggageRepository;

    // new Baggage of Camtougo
    public Baggage saveBaggage(Baggage baggage) {
        return baggageRepository.save(baggage);
    }

    public List<Baggage> saveBaggages(List<Baggage> baggages) {
        return baggageRepository.saveAll(baggages);
    }

    // List of camtougo baggages
    public List<Baggage> getBaggageCamtougo() {
        return baggageRepository.findAll();
    }
}
