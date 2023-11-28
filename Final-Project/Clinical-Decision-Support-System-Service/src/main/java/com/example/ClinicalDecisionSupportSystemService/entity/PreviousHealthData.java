package com.example.ClinicalDecisionSupportSystemService.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "previous_health_data")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class PreviousHealthData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long recordId;
    private long patientId;
    private double bmi;
    private LocalDate date;
    @Enumerated(EnumType.STRING)
    private State state;

}
