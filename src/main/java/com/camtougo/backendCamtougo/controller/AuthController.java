package com.camtougo.backendCamtougo.controller;

import com.camtougo.backendCamtougo.config.jwt.JwtProvider;
import com.camtougo.backendCamtougo.login.AuthRequest;
import com.camtougo.backendCamtougo.login.AuthResponse;
import com.camtougo.backendCamtougo.model.User;
import com.camtougo.backendCamtougo.registration.EmailRegistrationService;
import com.camtougo.backendCamtougo.registration.RegistrationRequest;
import com.camtougo.backendCamtougo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
public class AuthController {

    @Autowired
    EmailRegistrationService registrationService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtProvider jwtProvider;

    @PostMapping("/register")
    public String registerUser(@RequestBody @Valid RegistrationRequest registrationRequest){

        User user = new User();
        user.setFirstName(registrationRequest.getFirstName());
        user.setLastName(registrationRequest.getLastName());
        user.setBirthDate(registrationRequest.getBirthDate());
        user.setEmail(registrationRequest.getEmail());
        user.setPhoneNumber(registrationRequest.getPhoneNumber());
        user.setUsername(registrationRequest.getUsername());
        user.setPassword(registrationRequest.getPassword());

        System.out.println("Envoyé");

        registrationService.register(registrationRequest);

        return "OK";
    }

    @GetMapping(path = "/register/confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }

    @PostMapping("/auth")
    public AuthResponse authResponse(@RequestBody AuthRequest request){

       User user = userService.findByusernameAndPassword(request.getUsername(), request.getPassword());
       String token = jwtProvider.generateToken(user.getUsername());

       return new AuthResponse(token, user);

    }
}
