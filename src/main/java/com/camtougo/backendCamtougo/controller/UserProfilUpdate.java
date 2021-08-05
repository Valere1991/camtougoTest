package com.camtougo.backendCamtougo.controller;

import com.camtougo.backendCamtougo.model.User;
import com.camtougo.backendCamtougo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@RestController
@RequestMapping("/user/profil")
public class UserProfilUpdate {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;

    @PutMapping("{id}")
    public User updateProfilUser(@RequestBody User user, @PathVariable Long id)
            throws MessagingException, IOException {

        String email = user.getEmail();
        sendMail(email);

        return userService.updateUser(user, id);
    }

    private void sendMail(String email) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("service@camtougo.com", "CAMTOUGO SUPPORT");
        helper.setTo(email);

        String subject = "Votre profil";

        String content = "<p> Bonjour, </p>" +
                "<p>Vous venez juste de faire des modifications sur votre profil.</p>" +
                "<p><em>Merci de faire confiance à Camtougo</em></p>";

        helper.setSubject(subject);
        helper.setText(content, true);

        mailSender.send(message);
    }
}
