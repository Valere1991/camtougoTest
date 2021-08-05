package com.camtougo.backendCamtougo.toGoOu.voyage;

import com.camtougo.backendCamtougo.jePropose.voyage.VoyageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/user")
public class TuGoOuVoyageController {

    @Autowired
    TuGoOuVoyageRepository tuGoOuVoyageRepository;

    @GetMapping("/travels")
    public ResponseEntity<List<VoyageRequest>> getTravel(@RequestParam("startCity") String startCity,
                                                         @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate travelDate,
                                                         @RequestParam("endCity") String endCity) {
        return new ResponseEntity<>(tuGoOuVoyageRepository.findByStartCityAndTravelDateAndEndCity(startCity, travelDate, endCity),
                HttpStatus.OK);
    }
}
