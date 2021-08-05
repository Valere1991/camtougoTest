package com.camtougo.backendCamtougo.controller;


import com.camtougo.backendCamtougo.exception.UserNotFoundException;
import com.camtougo.backendCamtougo.model.User;
import com.camtougo.backendCamtougo.service.UserService;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

@Controller
@RequestMapping("/user")
public class ForgotPasswordController {

    @Autowired
    private UserService userService;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/forgot_password")
    public String showForgotPasswordForm(Model model){
        model.addAttribute("pageTitle", "Forgot password");
        return "forgot_password_form";
    }

    @PostMapping("/forgot_password")
    public String processForgotPasswordForm(HttpServletRequest request, Model model){
        String email = request.getParameter("email");
        String token = RandomString.make(45);

        try {
            userService.updateResetPasswordToken(token, email);

            //generate reset Password Link
            String resetPasswordLink = Utility.getSiteURL(request) + "/reset_password?token=" + token;

            // send email
            sendMail(email, resetPasswordLink);

        }catch (UserNotFoundException ex){
            model.addAttribute("error", ex.getMessage());
        } catch (MessagingException | UnsupportedEncodingException e) {
            model.addAttribute("error", "Error while sending mail");
        }

        return "forgot_password_form";
    }

    private void sendMail(String email, String resetPasswordLink) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("service@camtougo.com", "CAMTOUGO SUPPORT");
        helper.setTo(email);

        String subject = "modifier votre mot de passe";

        String content = "<p> Bonjour, </p>" +
                "<p>Vous avez demandé à changer votre mot de passe.</p>" +
                "<p>cliquez sur le lien suivant pour finaliser le processuce:</p>" +
                "<p><b><a href=\"" + resetPasswordLink + "\"> Modifier mon mot de passe </a><b></p>";

        helper.setSubject(subject);
        helper.setText(content, true);

        mailSender.send(message);
    }

    @GetMapping("/reset_password")
    public String showResetPasswordForm(@Param(value = "token") String token, Model model){
        User user = userService.get(token);

        if (user == null){
            model.addAttribute("title", "reset your password");
            model.addAttribute("message", "Invalid token");

            return "message";
        }

        model.addAttribute("token", token);
        model.addAttribute("pageTitle", "Modifiez votre mot de passe");
        return "reset_password_form";
    }

    @PostMapping("/reset_password")
    public String processResetPassword(HttpServletRequest request, Model model) {
        String token = request.getParameter("token");
        String password = request.getParameter("password");

        User user = userService.getByResetPasswordToken(token);
        model.addAttribute("title", "Reset your password");

        if (user == null) {
            model.addAttribute("message", "Invalid Token");
            return "message";
        } else {
            userService.updatePassword(user, password);

            model.addAttribute("message", "You have successfully changed your password.");
        }

        return "message";
    }

}
