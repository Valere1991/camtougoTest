package com.camtougo.backendCamtougo.registration;

import com.camtougo.backendCamtougo.exception.ResourceNotFoundException;
import com.camtougo.backendCamtougo.model.User;
import com.camtougo.backendCamtougo.registration.token.ConfirmationToken;
import com.camtougo.backendCamtougo.registration.token.ConfirmationTokenService;
import com.camtougo.backendCamtougo.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
public class EmailRegistrationService {

    @Autowired
    private ConfirmationTokenService confirmationTokenService;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailValidator emailValidator;

    @Autowired
    private  EmailSender emailSender;

    @Transactional
    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());
        if(!isValidEmail){
            throw new IllegalStateException("email not valid");
        }

        String token = userService.savedUser(
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

       // String link = "https://backendcam.gvc-solution-app.com/register/confirm?token=" + token;
        String link = "http://192.168.178.34:5000/register/confirm?token=" + token;
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
        userService.enabledUser(
                confirmationToken.getUser().setEnabled(true));


                return "Votre compte camtougo est désormais actif!";
    }

    private String buildEmail(String name, String link, String policy) {
        return "<h1> Camtougo confirmation </h1> " +
                "<p>Salut  " + name + ", </p>" +
                "<p>Nous vous remercions pour votre confiance et vous invitons à lire les conditions d’utilisation de notre plateforme.</p>" +
                "<p> Veuillez y accéder en cliquant lien suivant. </p>" +
                "<div><a href=" + policy + ">" + "données de confidentialités</a></div>" +
                "</br>" +
                "<p> Après lecture et acceptation de nos conditions d’utilisation, veuillez valider votre compte en cliquant le lien suivant.</p>" +
                "<div><a href=" + link + ">" + "<h2>Je valide mon compte CAMTOUGO</h2></a></div>" +
                "</br>" +
                "<p> merci," + " </p>" +
                "<p>Le Service Client CAMTOUGO</p>";
    }

}
