package com.camtougo.backendCamtougo.service;

import com.camtougo.backendCamtougo.model.Baggage;
import com.camtougo.backendCamtougo.model.ColisData;
import com.camtougo.backendCamtougo.repository.BaggageRepository;
import com.camtougo.backendCamtougo.repository.ColisDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColisDataService {

    @Autowired
    private ColisDataRepository colisDataRepository;

    // new Colis of Camtougo
    public ColisData saveColisData(ColisData colisData) {
        return colisDataRepository.save(colisData);
    }

    public List<ColisData> saveColis(List<ColisData> colisDatas) {
        return colisDataRepository.saveAll(colisDatas);
    }

    // List of camtougo colisdata
    public List<ColisData> getColisCamtougo() {
        return colisDataRepository.findAll();
    }
}
