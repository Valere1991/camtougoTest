package com.camtougo.backendCamtougo.superAdmin.controller;

import com.camtougo.backendCamtougo.model.User;
import com.camtougo.backendCamtougo.registration.RegistrationRequest;
import com.camtougo.backendCamtougo.superAdmin.service.EmailRegistrationAdminService;
import com.camtougo.backendCamtougo.superAdmin.service.EmailRegistrationManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class RegisterManagerController {

    @Autowired
    EmailRegistrationManagerService emailRegistrationManagerService;

    @PostMapping("/super-admin/manager/register")
    public String registerManager(@RequestBody @Valid RegistrationRequest registrationRequest){
        User user = new User();
        user.setFirstName(registrationRequest.getFirstName());
        user.setLastName(registrationRequest.getLastName());
        user.setBirthDate(registrationRequest.getBirthDate());
        user.setEmail(registrationRequest.getEmail());
        user.setPhoneNumber(registrationRequest.getPhoneNumber());
        user.setUsername(registrationRequest.getUsername());
        user.setPassword(registrationRequest.getPassword());

        System.out.println("Envoyé");

        emailRegistrationManagerService.registerManager(registrationRequest);

        return "OK";
    }

    @GetMapping(path = "/manager/register/confirm")
    public String confirm(@RequestParam("token") String token) {
        return emailRegistrationManagerService.confirmToken(token);
    }
}
