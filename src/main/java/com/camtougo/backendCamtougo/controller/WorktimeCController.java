package com.camtougo.backendCamtougo.controller;

import com.camtougo.backendCamtougo.model.CamCity;
import com.camtougo.backendCamtougo.model.WorktimeC;
import com.camtougo.backendCamtougo.service.CamCityService;
import com.camtougo.backendCamtougo.service.WorktimeCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/camtougo_worktime")
public class WorktimeCController {

    @Autowired
    private WorktimeCService worktimeCService;

    @GetMapping
    public List<WorktimeC> findAllWorktimeC() {
        return worktimeCService.getWorktimeCamtougo();
    }

    @PostMapping
    public WorktimeC addWorktimeC(@RequestBody WorktimeC worktimeC) {
        return worktimeCService.saveTime(worktimeC);
    }

    @PostMapping("/list")
    public List<WorktimeC> addWorktimesC(@RequestBody List<WorktimeC> worktimesC){
        return worktimeCService.saveTimes(worktimesC);
    }
}
