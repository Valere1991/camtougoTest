package com.camtougo.backendCamtougo.registration;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {

    private String firstName;

    private String lastName;

    private LocalDate birthDate;

    private String email;

    private String countryCode;

    private Long phoneNumber;

    private String username;

    private String password;

}
