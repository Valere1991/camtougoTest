package com.camtougo.backendCamtougo.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "cam_city")
@Data
public class CamCity {

    @Id
    @Column(name = "cam_city_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cam_city_name")
    private String cityName;

}
