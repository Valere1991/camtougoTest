package com.camtougo.backendCamtougo.jePropose.colis;

import com.camtougo.backendCamtougo.jePropose.voyage.VoyageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ColisRepository extends JpaRepository<ColisRequest, Long> {

    List<ColisRequest> findByUserId(Long userId);
    // Optional<ColisRequest> findByColisIdAndUserId(Long colisId, Long userId);
}
