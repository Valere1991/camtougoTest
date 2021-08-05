package com.camtougo.backendCamtougo.service;

import com.camtougo.backendCamtougo.exception.UserNotFoundException;
import com.camtougo.backendCamtougo.model.Role;
import com.camtougo.backendCamtougo.model.User;
import com.camtougo.backendCamtougo.registration.token.ConfirmationToken;
import com.camtougo.backendCamtougo.registration.token.ConfirmationTokenService;
import com.camtougo.backendCamtougo.repository.RoleRepository;
import com.camtougo.backendCamtougo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private ConfirmationTokenService confirmationTokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String savedUser(User user){
        Role userRole = roleRepository.findByRoleName("ROLE_USER");
        user.setRole(userRole);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusHours(12),
                user);

        confirmationTokenService.saveConfirmationToken(
                confirmationToken);

        // SEND EMAIL

        return token;
    }

    public void enabledUser(boolean enabled) {

        User user = new User();
        user.setEnabled(true);
    }

    // Save new Admin - superAdmin function
    public String savedAdmin(User user){
        Role userRole = roleRepository.findByRoleName("ROLE_ADMIN");
        user.setRole(userRole);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusHours(12),
                user);

        confirmationTokenService.saveConfirmationToken(
                confirmationToken);

        // SEND EMAIL

        return token;

    }

    public void enabledAdmin(boolean enabled) {

        User user = new User();
        user.setEnabled(true);
    }

    // Save new Manager - superAdmin function
    public String savedManager(User user){
        Role userRole = roleRepository.findByRoleName("ROLE_MANAGER");
        user.setRole(userRole);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusHours(12),
                user);

        confirmationTokenService.saveConfirmationToken(
                confirmationToken);

        // SEND EMAIL

        return token;
    }

    public void enabledManager(boolean enabled) {

        User user = new User();
        user.setEnabled(true);
    }

    // Save new Business-Partner - superAdmin function
    public String savedBPartner(User user){
        Role userRole = roleRepository.findByRoleName("ROLE_BUSINESS_PARTNER");
        user.setRole(userRole);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusHours(12),
                user);

        confirmationTokenService.saveConfirmationToken(
                confirmationToken);

        // SEND EMAIL

        return token;
    }

    public void enabledBPartner(boolean enabled) {

        User user = new User();
        user.setEnabled(true);
    }

    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public User findByusernameAndPassword(String username, String password){
        User user = findByUsername(username);

        if (user.getEnabled().equals(false)){
            throw new DisabledException("Vérifiez votre compte");
        }

        if(passwordEncoder.matches(password, user.getPassword())){
            return user;
        }

        System.out.println("User disabled");
        return null;
    }


    // Reset Password - Update Password
    public void updateResetPasswordToken(String token, String email) throws UserNotFoundException {
        User user = userRepository.findByEmail(email);

        if (user != null){
            user.setResetPasswordToken(token);
            userRepository.save(user);
        } else {
            throw new UserNotFoundException("No user with the email :" + email);
        }
    }

    public User get(String resetPasswordToken){
        return userRepository.findByResetPasswordToken(resetPasswordToken);
    }

    public void updatePassword(User user, String newPassword){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(newPassword);

        user.setPassword(encodedPassword);
        user.setResetPasswordToken(null);

        userRepository.save(user);
    }

    public User getByResetPasswordToken(String token) {
        return userRepository.findByResetPasswordToken(token);
    }

    // update profil
    public User updateUser(User user, Long id) throws IOException {
        User existedUser = userRepository.findAllById(id);

        existedUser.setEmail(user.getEmail());
        existedUser.setCountryCode(user.getCountryCode());
        existedUser.setPhoneNumber(user.getPhoneNumber());
        existedUser.setCniNumber(user.getCniNumber());
        existedUser.setDrivingLicenceNr(user.getDrivingLicenceNr());
        existedUser.setCountry(user.getCountry());
        existedUser.setCity(user.getCity());

        return userRepository.save(existedUser);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

}
