package com.camtougo.backendCamtougo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table(name = "CountryCode")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CountryCode {

    @Id
    @Column(name = "countryCode_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String code;
    private String phone_code;

}
