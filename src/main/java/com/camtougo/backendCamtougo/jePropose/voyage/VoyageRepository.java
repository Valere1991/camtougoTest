package com.camtougo.backendCamtougo.jePropose.voyage;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoyageRepository extends JpaRepository<VoyageRequest, Long> {

    List<VoyageRequest> findByUserId(Long userId);
    Optional<VoyageRequest> findByTravelIdAndUserId(Long travelId, Long userId);

}
