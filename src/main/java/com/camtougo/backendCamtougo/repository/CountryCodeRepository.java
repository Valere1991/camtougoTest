package com.camtougo.backendCamtougo.repository;

import com.camtougo.backendCamtougo.model.Baggage;
import com.camtougo.backendCamtougo.model.CountryCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryCodeRepository extends JpaRepository<CountryCode, Long> {

    CountryCode findAllById(Long id);

}
