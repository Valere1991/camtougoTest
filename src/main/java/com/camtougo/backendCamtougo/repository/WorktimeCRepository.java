package com.camtougo.backendCamtougo.repository;

import com.camtougo.backendCamtougo.model.WorktimeC;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorktimeCRepository extends JpaRepository<WorktimeC, Long> {

    WorktimeC findAllById(Long id);

    WorktimeC findByTime(String time);


}
