package com.camtougo.backendCamtougo.jePropose.colis;

import com.camtougo.backendCamtougo.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.jetbrains.annotations.NotNull;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "je_propose_colis")
public class ColisRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long colisId;

    @NotBlank(message = "startCity is required")
    private String startCity;

    @NotBlank(message = "endCity is required")
    private String endCity;

    @NotNull
    private LocalDate travelDate;

    @NotNull
    private LocalTime travelTime;

    @NotBlank(message = "shipping Methode is required")
    private String shipping;

    @NotNull
    private double shippingPrice;

    @NotBlank(message = "startPoint is required")
    private String startPoint;

    @NotBlank(message = "carDetails is required")
    private String carDetails;

    @NotBlank(message = "colisDetails is required")
    private String colisDetails;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;

}
