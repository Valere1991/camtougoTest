package com.camtougo.backendCamtougo.repository;

import com.camtougo.backendCamtougo.model.Baggage;
import com.camtougo.backendCamtougo.model.WorktimeC;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BaggageRepository extends JpaRepository<Baggage, Long> {

    Baggage findAllById(Long id);

    Baggage findByBaggageDetails(String baggageDetails);


}
