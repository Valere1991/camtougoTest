package com.camtougo.backendCamtougo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalTime;


@Entity
@Table(name = "worktimeCs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorktimeC {


    @Id
    @Column(name = "worktimeC_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "worktimeCamtougo")
    private LocalTime time;

}
