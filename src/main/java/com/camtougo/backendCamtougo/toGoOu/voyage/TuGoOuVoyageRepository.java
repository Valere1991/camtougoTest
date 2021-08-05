package com.camtougo.backendCamtougo.toGoOu.voyage;

import com.camtougo.backendCamtougo.jePropose.voyage.VoyageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TuGoOuVoyageRepository extends JpaRepository<VoyageRequest, Long> {

    List<VoyageRequest> findByStartCityAndTravelDateAndEndCity(String startCity, LocalDate traveldate, String endCity);

}
