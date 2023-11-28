package com.healthmanagement.SecurityConfig.repository;

import com.healthmanagement.SecurityConfig.entity.Doctor;
import com.healthmanagement.SecurityConfig.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepo extends JpaRepository<Patient,Long> {
    Patient findByUserId(long id);
}
