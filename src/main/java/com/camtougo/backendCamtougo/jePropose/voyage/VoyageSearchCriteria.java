package com.camtougo.backendCamtougo.jePropose.voyage;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class VoyageSearchCriteria {

    private String startCity;
    private LocalDate travelDate;
    private String endCity;
}
