package com.camtougo.backendCamtougo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestUserController {

    @GetMapping("/super-admin/get")
    public String getSuperAdmin(){
        return "Bonjour super-admin";
    }

    @GetMapping("/admin/get")
    public String getAdmin(){
        return "Bonjour admin";
    }

    @GetMapping("/manager/get")
    public String getManager(){
        return "Bonjour manager";
    }

    @GetMapping("/user/get")
    public String getUser(){
        return "Bonjour user";
    }


}
