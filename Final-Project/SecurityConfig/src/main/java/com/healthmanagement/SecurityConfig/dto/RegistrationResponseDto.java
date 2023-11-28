package com.healthmanagement.SecurityConfig.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationResponseDto {
    private long userId;
    private String email;
    private String role;
    private String token;
}
