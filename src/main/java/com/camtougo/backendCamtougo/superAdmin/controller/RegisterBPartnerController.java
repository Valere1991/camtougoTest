package com.camtougo.backendCamtougo.superAdmin.controller;

import com.camtougo.backendCamtougo.model.User;
import com.camtougo.backendCamtougo.registration.RegistrationRequest;
import com.camtougo.backendCamtougo.superAdmin.service.EmailRegistrationAdminService;
import com.camtougo.backendCamtougo.superAdmin.service.EmailRegistrationBPartnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class RegisterBPartnerController {

    @Autowired
    EmailRegistrationBPartnerService emailRegistrationBPartnerService;

    @PostMapping("/super-admin/business-partner/register")
    public String registerBPartner(@RequestBody @Valid RegistrationRequest registrationRequest){
        User user = new User();
        user.setFirstName(registrationRequest.getFirstName());
        user.setLastName(registrationRequest.getLastName());
        user.setBirthDate(registrationRequest.getBirthDate());
        user.setEmail(registrationRequest.getEmail());
        user.setPhoneNumber(registrationRequest.getPhoneNumber());
        user.setUsername(registrationRequest.getUsername());
        user.setPassword(registrationRequest.getPassword());

        System.out.println("Envoyé");

        emailRegistrationBPartnerService.registerBPartner(registrationRequest);

        return "OK";
    }

    @GetMapping(path = "/business-partner/register/confirm")
    public String confirm(@RequestParam("token") String token) {
        return emailRegistrationBPartnerService.confirmToken(token);
    }
}
