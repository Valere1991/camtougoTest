package com.camtougo.backendCamtougo.repository;

import com.camtougo.backendCamtougo.model.CamCity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CamCityRepository extends JpaRepository<CamCity, Long> {

    CamCity findAllById(Long id);

}
