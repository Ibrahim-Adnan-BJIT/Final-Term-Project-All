package com.healthmanagement.SecurityConfig;

import com.healthmanagement.SecurityConfig.dto.ProfileDto;
import com.healthmanagement.SecurityConfig.dto.SearchDoctorDto;
import com.healthmanagement.SecurityConfig.entity.*;
import com.healthmanagement.SecurityConfig.exception.AuthenticationExceptions;
import com.healthmanagement.SecurityConfig.exception.ResourceNotFoundException;
import com.healthmanagement.SecurityConfig.repository.DoctorRepo;
import com.healthmanagement.SecurityConfig.repository.PatientRepo;
import com.healthmanagement.SecurityConfig.repository.UserRepository;
import com.healthmanagement.SecurityConfig.service.impl.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private DoctorRepo doctorRepo;
    @Mock
    private PatientRepo patientRepository;

    @InjectMocks
    private UserService yourServiceClass;

    @BeforeEach
    public void setUp() {
        // You can set up any initial configurations or mocks here
    }

    @Test
    public void testGetProfile() {
        // Arrange
        long userId = 1L;

        User user = new User();
        user.setUserId(userId);
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john.doe@example.com");
        user.setDob(LocalDate.parse("1990-01-01"));
        user.setNumber("1234567890");
        user.setGender(Gender.Male);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // Act
        ProfileDto result = yourServiceClass.getProfileForTest(userId);

        // Assert
        assertEquals("John", result.getFirstName());
        assertEquals("Doe", result.getLastName());
        assertEquals("john.doe@example.com", result.getEmail());
        assertEquals(LocalDate.parse("1990-01-01"), result.getDob());
        assertEquals("1234567890", result.getNumber());
        assertEquals(Gender.Male, result.getGender());

        // Verify that the findById method of userRepository was called with the correct userId
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    public void testGetDoctorId() {
        // Arrange
        long userId = 1L;
        long doctorId = 1L;

        Doctor doctor = new Doctor();
        doctor.setDoctorId(doctorId);
        // Set other properties as needed

        when(doctorRepo.findByUserId(userId)).thenReturn(doctor);

        // Act
        Long result = yourServiceClass.getDoctorId(userId);

        // Assert
        assertEquals(doctorId, result);

        // Verify that the findByUserId method of doctorRepository was called with the correct userId
        verify(doctorRepo, times(1)).findByUserId(userId);
    }

    @Test
    public void testGetAllDoctors() {
        // Arrange
        long userId1 = 1L;
        long userId2 = 2L;
        long doctorId1 = 100L;
        long doctorId2 = 200L;

        User user1 = new User();
        user1.setUserId(userId1);
        user1.setFirstName("John");
        user1.setLastName("Doe");

        User user2 = new User();
        user2.setUserId(userId2);
        user2.setFirstName("Jane");
        user2.setLastName("Doe");

        Doctor doctor1 = new Doctor();
        doctor1.setDoctorId(doctorId1);
        doctor1.setUserId(userId1);
        doctor1.setSpeciality(Speciality.ALLERGY_AND_IMMUNOLOGY_SPECIALTIES);

        Doctor doctor2 = new Doctor();
        doctor2.setDoctorId(doctorId2);
        doctor2.setUserId(userId2);
        doctor2.setSpeciality(Speciality.ALLERGY_AND_IMMUNOLOGY_SPECIALTIES);

        List<Doctor> doctors = List.of(doctor1, doctor2);
        when(doctorRepo.findAll()).thenReturn(doctors);

        when(userRepository.findById(userId1)).thenReturn(Optional.of(user1));
        when(userRepository.findById(userId2)).thenReturn(Optional.of(user2));

        // Act
        List<SearchDoctorDto> result = yourServiceClass.getAllDoctors();

        // Assert
        assertEquals(2, result.size());

        SearchDoctorDto resultDoctor1 = result.get(0);
        assertEquals(doctorId1, resultDoctor1.getDoctorId());
        assertEquals("John", resultDoctor1.getFirstName());
        assertEquals("Doe", resultDoctor1.getLastName());
        assertEquals(Speciality.ALLERGY_AND_IMMUNOLOGY_SPECIALTIES, resultDoctor1.getSpeciality());

        SearchDoctorDto resultDoctor2 = result.get(1);
        assertEquals(doctorId2, resultDoctor2.getDoctorId());
        assertEquals("Jane", resultDoctor2.getFirstName());
        assertEquals("Doe", resultDoctor2.getLastName());
        assertEquals(Speciality.ALLERGY_AND_IMMUNOLOGY_SPECIALTIES, resultDoctor2.getSpeciality());

        // Verify that the findAll method of doctorRepository was called
        verify(doctorRepo, times(1)).findAll();
        // Verify that the findById method of userRepository was called for each doctor's userId
        verify(userRepository, times(1)).findById(userId1);
        verify(userRepository, times(1)).findById(userId2);
    }


    @Test
    public void testGetDoctorName() {
        // Arrange
        long doctorId = 1L;

        Doctor doctor = new Doctor();
        doctor.setDoctorId(doctorId);
        doctor.setUserId(101L); // Assuming a user with userId 101 exists for the doctor

        User user = new User();
        user.setUserId(doctor.getUserId());
        user.setFirstName("John");
        user.setLastName("Doe");

        when(doctorRepo.findById(doctorId)).thenReturn(Optional.of(doctor));
        when(userRepository.findById(doctor.getUserId())).thenReturn(Optional.of(user));

        // Act
        String result = yourServiceClass.getDoctorName(doctorId);

        // Assert
        assertEquals("John Doe", result);

        // Verify that the findById methods of doctorRepository and userRepository were called
        verify(doctorRepo, times(1)).findById(doctorId);
        verify(userRepository, times(1)).findById(doctor.getUserId());
    }

    @Test
    public void testGetDoctorNameDoctorNotFound() {
        // Arrange
        long doctorId = 1L;

        when(doctorRepo.findById(doctorId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(AuthenticationExceptions.class, () -> yourServiceClass.getDoctorName(doctorId));

        // Verify that the findById method of doctorRepository was called with the correct doctorId
        verify(doctorRepo, times(1)).findById(doctorId);
    }
    @Test
    public void testGetEmailForPatient() {
        // Arrange
        long patientId = 1L;

        Patient patient = new Patient();
        patient.setPatientId(patientId);
        patient.setUserId(201L); // Assuming a user with userId 201 exists for the patient

        User user = new User();
        user.setUserId(patient.getUserId());
        user.setEmail("patient@example.com");

        when(patientRepository.findById(patientId)).thenReturn(Optional.of(patient));
        when(userRepository.findById(patient.getUserId())).thenReturn(Optional.of(user));

        // Act
        String result = yourServiceClass.getEmailForPatient(patientId);

        // Assert
        assertEquals("patient@example.com", result);

        // Verify that the findById methods of patientRepository and userRepository were called
        verify(patientRepository, times(1)).findById(patientId);
        verify(userRepository, times(1)).findById(patient.getUserId());
    }

    @Test
    public void testGetEmailForPatientPatientNotFound() {
        // Arrange
        long patientId = 1L;

        when(patientRepository.findById(patientId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(AuthenticationExceptions.class, () -> yourServiceClass.getEmailForPatient(patientId));

        // Verify that the findById method of patientRepository was called with the correct patientId
        verify(patientRepository, times(1)).findById(patientId);
    }

    @Test
    public void testGetDoctorsByFirstName() {
        // Arrange
        String name = "John";

        Doctor doctor1 = new Doctor();
        doctor1.setDoctorId(101L);
        doctor1.setUserId(201L); // Assuming a user with userId 201 exists for doctor1

        User user1 = new User();
        user1.setUserId(doctor1.getUserId());
        user1.setFirstName("John");
        user1.setLastName("Doe");

        Doctor doctor2 = new Doctor();
        doctor2.setDoctorId(102L);
        doctor2.setUserId(202L); // Assuming a user with userId 202 exists for doctor2

        User user2 = new User();
        user2.setUserId(doctor2.getUserId());
        user2.setFirstName("Jane");
        user2.setLastName("Doe");

        List<Doctor> doctors = new ArrayList<>();
        doctors.add(doctor1);
        doctors.add(doctor2);

        when(doctorRepo.findAll()).thenReturn(doctors);
        when(userRepository.findById(doctor1.getUserId())).thenReturn(Optional.of(user1));
        when(userRepository.findById(doctor2.getUserId())).thenReturn(Optional.of(user2));

        // Act
        List<SearchDoctorDto> result = yourServiceClass.getDoctorsByFirstName(name);

        // Assert
        assertEquals(1, result.size());
        SearchDoctorDto searchDoctorDto = result.get(0);
        assertEquals(101L, searchDoctorDto.getDoctorId());
        assertEquals("John", searchDoctorDto.getFirstName());
        assertEquals("Doe", searchDoctorDto.getLastName());
        // Verify that the findById methods of userRepository were called
        verify(userRepository, times(2)).findById(anyLong());
    }

    @Test
    public void testGetSpeciality() {
        // Arrange
        long doctorId = 1L;
        Speciality speciality = Speciality.ALLERGY_AND_IMMUNOLOGY_SPECIALTIES;

        Doctor doctor = new Doctor();
        doctor.setDoctorId(doctorId);
        doctor.setSpeciality(speciality);

        when(doctorRepo.findById(doctorId)).thenReturn(Optional.of(doctor));

        // Act
        String result = yourServiceClass.getSpeciality(doctorId);

        // Assert
        assertEquals(speciality.toString(), result);

        // Verify that the findById method of doctorRepository was called with the correct doctorId
        verify(doctorRepo, times(1)).findById(doctorId);
    }

    @Test
    public void testGetSpecialityDoctorNotFound() {
        // Arrange
        long doctorId = 1L;

        when(doctorRepo.findById(doctorId)).thenReturn(Optional.empty());

        // Act and Assert
        // Ensure that the AuthenticationExceptions is thrown when the doctor is not found
        assertThrows(AuthenticationExceptions.class, () -> yourServiceClass.getSpeciality(doctorId));

        // Verify that the findById method of doctorRepository was called with the correct doctorId
        verify(doctorRepo, times(1)).findById(doctorId);
    }
}