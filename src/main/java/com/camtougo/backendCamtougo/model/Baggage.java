package com.camtougo.backendCamtougo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalTime;


@Entity
@Table(name = "baggage")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Baggage {

    @Id
    @Column(name = "baggageC_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "baggage_details")
    private String baggageDetails;

}
