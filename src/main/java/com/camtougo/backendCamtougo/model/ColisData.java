package com.camtougo.backendCamtougo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table(name = "colisData")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ColisData {

    @Id
    @Column(name = "colisData_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "colisData_details")
    private String colisDataDetails;

}
