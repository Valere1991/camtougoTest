package com.camtougo.backendCamtougo.toGoOu.colis;

import com.camtougo.backendCamtougo.jePropose.colis.ColisRequest;
import com.camtougo.backendCamtougo.jePropose.voyage.VoyageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TuGoOuColisRepository extends JpaRepository<ColisRequest, Long> {

    List<ColisRequest> findByStartCityAndTravelDateAndEndCity(String startCity, LocalDate traveldate, String endCity);

}
