package com.camtougo.backendCamtougo.superAdmin.controller;

import com.camtougo.backendCamtougo.config.jwt.JwtProvider;
import com.camtougo.backendCamtougo.model.User;
import com.camtougo.backendCamtougo.registration.RegistrationRequest;
import com.camtougo.backendCamtougo.service.UserService;
import com.camtougo.backendCamtougo.superAdmin.service.EmailRegistrationAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class RegisterAdminController {

    @Autowired
    EmailRegistrationAdminService emailRegistrationAdminService;

    @PostMapping("/super-admin/admin/register")
    public String registerAdmin(@RequestBody @Valid RegistrationRequest registrationRequest){
        User user = new User();
        user.setFirstName(registrationRequest.getFirstName());
        user.setLastName(registrationRequest.getLastName());
        user.setBirthDate(registrationRequest.getBirthDate());
        user.setEmail(registrationRequest.getEmail());
        user.setPhoneNumber(registrationRequest.getPhoneNumber());
        user.setUsername(registrationRequest.getUsername());
        user.setPassword(registrationRequest.getPassword());

        System.out.println("Envoyé");

        emailRegistrationAdminService.registerAdmin(registrationRequest);

        return "OK";
    }

    @GetMapping(path = "/admin/register/confirm")
    public String confirm(@RequestParam("token") String token) {
        return emailRegistrationAdminService.confirmToken(token);
    }
}
