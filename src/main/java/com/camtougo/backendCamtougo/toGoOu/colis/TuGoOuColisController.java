package com.camtougo.backendCamtougo.toGoOu.colis;

import com.camtougo.backendCamtougo.jePropose.colis.ColisRequest;
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
public class TuGoOuColisController {

    @Autowired
    TuGoOuColisRepository tuGoOuColisRepository;

    @GetMapping("/colis")
    public ResponseEntity<List<ColisRequest>> getTravel(@RequestParam("startCity") String startCity,
                                                        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate travelDate,
                                                        @RequestParam("endCity") String endCity) {
        return new ResponseEntity<>(tuGoOuColisRepository.findByStartCityAndTravelDateAndEndCity(startCity, travelDate, endCity),
                HttpStatus.OK);
    }
}
