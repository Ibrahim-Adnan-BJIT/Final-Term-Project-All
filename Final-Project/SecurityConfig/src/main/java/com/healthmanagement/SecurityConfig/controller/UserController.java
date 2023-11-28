package com.healthmanagement.SecurityConfig.controller;


import com.healthmanagement.SecurityConfig.dto.*;
import com.healthmanagement.SecurityConfig.entity.Speciality;
import com.healthmanagement.SecurityConfig.service.IUserInformation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2/user")
@AllArgsConstructor
public class UserController {

    private  IUserInformation userService;
    @GetMapping("/user-information/{userId}")
    public UserInformationsDto getUserInformation(@PathVariable long userId) {
        return userService.getUserInformation(userId);
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileDto> getProfile()
    {
        ProfileDto profileDto=userService.getProfile();
        return new ResponseEntity<>(profileDto, HttpStatus.OK);
    }

    @PutMapping("/update/profile")
    public ResponseEntity<String> updateProfile(@RequestBody ProfileDto profileDto)
    {
        userService.updateProfile(profileDto);
        return new ResponseEntity<>("Updated Successfully",HttpStatus.ACCEPTED);
    }

    @PutMapping("/skills")
    public  ResponseEntity<?> checkingSkills(@RequestBody DoctorsDto doctorsDto)
    {
        userService.updateSkills(doctorsDto);
        return new ResponseEntity<>("Updated Successfully",HttpStatus.OK);
    }

    @GetMapping("/getDoctor/{id}")
    public Long getDoctor(@PathVariable long id)
    {
        return userService.getDoctorId(id);
    }

    @GetMapping("/getPatient/{id}")
    public Long getPatient(@PathVariable long id)
    {
        return userService.getPatientId(id);
    }

    @GetMapping("/getAllDoctors")
    public ResponseEntity<List<SearchDoctorDto>> getAllDoctors()
    {
        List<SearchDoctorDto>doctorsDtos=userService.getAllDoctors();
        return new ResponseEntity<>(doctorsDtos,HttpStatus.OK);
    }

    @GetMapping("/getPatientName/{id}")
    public ResponseEntity<String> getPatientName(@PathVariable long id)
    {
        String name=userService.getPatientName(id);
        return new ResponseEntity<>(name,HttpStatus.OK);
    }

    @GetMapping("/getDoctorName/{id}")
    public ResponseEntity<String>getDoctorName(@PathVariable long id)
    {
        String name=userService.getDoctorName(id);
        return new ResponseEntity<>(name,HttpStatus.OK);
    }

    @GetMapping("/getEmailForDoctor/{id}")
    public ResponseEntity<String> getEmailForDoctor(@PathVariable long id)
    {
        String email= userService.getEmailForDoctor(id);
        return new ResponseEntity<>(email,HttpStatus.OK);
    }
    @GetMapping("/getEmailForPatient/{id}")
    public ResponseEntity<String> getEmailForPatient(@PathVariable long id)
    {
        String email= userService.getEmailForPatient(id);
        return new ResponseEntity<>(email,HttpStatus.OK);
    }

    @GetMapping("/getDoctorsBySpeciality/{speciality}")
    public ResponseEntity<List<SearchDoctorDto>> getDoctorsBySpeciality(@PathVariable Speciality speciality)
    {
        List<SearchDoctorDto>searchDoctorDtos=userService.getDoctorsBySpeciality(speciality);
        return new ResponseEntity<>(searchDoctorDtos,HttpStatus.OK);
    }

    @GetMapping("/getDoctorsByName/{name}")
    public ResponseEntity<List<SearchDoctorDto>> getDoctorsByName(@PathVariable String name)
    {
        List<SearchDoctorDto>searchDoctorDtos=userService.getDoctorsByFirstName(name);
        return new ResponseEntity<>(searchDoctorDtos,HttpStatus.OK);
    }
    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserInfoDto>> getAllUsers()
    {
        List<UserInfoDto>userInformationsDtos=userService.getAllUser();
        return new ResponseEntity<>(userInformationsDtos,HttpStatus.OK);
    }
    @GetMapping("/getUserName/{id}")
    public ResponseEntity<String> getUserName(@PathVariable long id)
    {
        String name=userService.getUserName(id);
        return new ResponseEntity<>(name,HttpStatus.OK);
    }

    @GetMapping("/getSpeciality/{id}")
    public ResponseEntity<String> getSpeciality(@PathVariable long id)
    {
        String speciality=userService.getSpeciality(id);
        return new ResponseEntity<>(speciality,HttpStatus.OK);
    }
}