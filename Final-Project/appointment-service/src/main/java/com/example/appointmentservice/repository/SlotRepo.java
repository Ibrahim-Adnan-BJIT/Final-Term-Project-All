package com.example.appointmentservice.repository;

import com.example.appointmentservice.entity.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SlotRepo extends JpaRepository<Slot,Long> {
   List<Slot> findByDoctorId(long id);
}
