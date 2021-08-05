package com.camtougo.backendCamtougo.superAdmin.service;

import com.camtougo.backendCamtougo.exception.ResourceNotFoundException;
import com.camtougo.backendCamtougo.model.User;
import com.camtougo.backendCamtougo.registration.EmailSender;
import com.camtougo.backendCamtougo.registration.EmailValidator;
import com.camtougo.backendCamtougo.registration.RegistrationRequest;
import com.camtougo.backendCamtougo.registration.token.ConfirmationToken;
import com.camtougo.backendCamtougo.registration.token.ConfirmationTokenService;
import com.camtougo.backendCamtougo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
public class EmailRegistrationManagerService {

    @Autowired
    private ConfirmationTokenService confirmationTokenService;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailValidator emailValidator;

    @Autowired
    private EmailSender emailSender;

    @Transactional
    public String registerManager(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());
        if(!isValidEmail){
            throw new IllegalStateException("email not valid");
        }

        String token = userService.savedManager(
                new User(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getBirthDate(),
                        request.getEmail(),
                        request.getCountryCode(),
                        request.getPhoneNumber(),
                        request.getUsername(),
                        request.getPassword()
                )
        );

        String link = "http://localhost:8082/manager/register/confirm?token=" + token;
        String policy = "www.policy-of-camtougo.com";
        emailSender.send(
                request.getEmail(),
                buildEmail(request.getFirstName(), link, policy));
        return token;
    }

    @Transactional
    public String confirmToken(String token){
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token).orElseThrow(()->
                        new ResourceNotFoundException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAd = confirmationToken.getExpireAt();

        if (expiredAd.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        userService.enabledManager(
                confirmationToken.getUser().setEnabled(true));


        return "Vous êtes désormais Manager de Camtougo!";
    }

    private String buildEmail(String name, String link, String policy) {
        return "<h1> Camtougo confirmation </h1> " +
                "<p>Bonjour  " + name + ", </p>" +
                "<p>Lisez les confidentialités de Camtougo en cliquant sur le lien suivant. Ensuite vérifiez votre compte manager si vous être d'accord en cliquant sur le dernier lien.</p>" +
                "<div><a href=" + policy + ">" + "données de confidentialités</a></div>" +
                "</br>" +
                "<div><a href=" + link + ">" + "<h2>Cliquez ici pour vérifier votre compte manager</h2></a></div>";
    }
}
