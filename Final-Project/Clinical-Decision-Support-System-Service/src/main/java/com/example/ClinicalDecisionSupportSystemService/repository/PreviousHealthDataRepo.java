package com.example.ClinicalDecisionSupportSystemService.repository;

import com.example.ClinicalDecisionSupportSystemService.entity.PreviousHealthData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PreviousHealthDataRepo extends JpaRepository<PreviousHealthData,Long> {
    List<PreviousHealthData> findByPatientId(long patientId);
}
