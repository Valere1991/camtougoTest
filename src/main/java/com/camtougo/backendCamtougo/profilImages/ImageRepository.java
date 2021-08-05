package com.camtougo.backendCamtougo.profilImages;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<ImageModel, Long> {

    Optional<ImageModel> findByName(String name);
    Optional<ImageModel> findByUserId(Long userId);
    Optional<ImageModel> findByProfileIdAndUserId(Long profileId, Long userId);
}
