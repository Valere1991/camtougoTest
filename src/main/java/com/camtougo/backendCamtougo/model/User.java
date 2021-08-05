package com.camtougo.backendCamtougo.model;

import com.camtougo.backendCamtougo.jePropose.colis.ColisRequest;
import com.camtougo.backendCamtougo.jePropose.voyage.VoyageRequest;
import com.camtougo.backendCamtougo.profilImages.ImageModel;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "users")
@Data
public class User {

    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 4
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    @Column(name = "user_id")
    private Long id;

    private String firstName;

    private String lastName;

    private LocalDate birthDate;

    @Column(unique = true)
    @NotBlank(message = "email is required")
    private String email;

    @NotBlank(message = "countryCode is required")
    private String countryCode;

    @Column(unique = true)
    private Long phoneNumber;

    private String country;

    private String city;

    @Column(unique = true)
    private String cniNumber;

    @Column(unique = true)
    private Long drivingLicenceNr;

    @NotBlank(message = "username is required")
    @Column(unique = true, name = "username")
    private String username;

    @NotBlank(message = "password is required")
    private String password;

    private Boolean enabled = false;

    @Column(name = "reset_password_token")
    private String resetPasswordToken;

    @ManyToOne(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToOne(fetch = FetchType.LAZY,
            cascade =  CascadeType.ALL,
            mappedBy = "user")
    private ImageModel imageModel;

    public User() {
    }

    public User(String firstName,
                String lastName,
                LocalDate birthDate,
                String email,
                String countryCode,
                Long phoneNumber,
                String username,
                String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
        this.countryCode = countryCode;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.password = password;
    }

    public Boolean setEnabled(Boolean enabled) {
        this.enabled = enabled;
        return false;
    }

}
