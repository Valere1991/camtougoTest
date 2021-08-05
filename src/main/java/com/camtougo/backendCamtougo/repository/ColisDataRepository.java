package com.camtougo.backendCamtougo.repository;

import com.camtougo.backendCamtougo.model.Baggage;
import com.camtougo.backendCamtougo.model.ColisData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColisDataRepository extends JpaRepository<ColisData, Long> {

    ColisData findAllById(Long id);

    ColisData findByColisDataDetails(String colisDataDetails);


}
