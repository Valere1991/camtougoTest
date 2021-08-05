package com.camtougo.backendCamtougo.jePropose.voyage;

import com.camtougo.backendCamtougo.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Table(name = "je_propose_voyage")
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class VoyageRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long travelId;

    @NotBlank(message = "startCity is required")
    private String startCity;

    @NotBlank(message = "endCity is required")
    private String endCity;

    @NotNull
    private LocalDate travelDate;

    @NotNull
    private LocalTime travelTime;

    @NotNull
    private long numberOfPlace;

    @NotNull
    private double travelPrice;

    @NotBlank(message = "startPoint is required")
    private String startPoint;

    @NotBlank(message = "carDetails is required")
    private String carDetails;

    @NotBlank(message = "baggageDetails is required")
    private String baggageDetails;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;

}
