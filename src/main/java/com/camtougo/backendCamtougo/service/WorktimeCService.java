package com.camtougo.backendCamtougo.service;

import com.camtougo.backendCamtougo.model.CamCity;
import com.camtougo.backendCamtougo.model.WorktimeC;
import com.camtougo.backendCamtougo.repository.WorktimeCRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorktimeCService {

    @Autowired
    private WorktimeCRepository worktimeCRepository;

    // new time of Camtougo
    public WorktimeC saveTime(WorktimeC worktimeC) {
        return worktimeCRepository.save(worktimeC);
    }

    public List<WorktimeC> saveTimes(List<WorktimeC> times) {
        return worktimeCRepository.saveAll(times);
    }

    // List of camtougo times
    public List<WorktimeC> getWorktimeCamtougo() {
        return worktimeCRepository.findAll();
    }
}
