// src/main/java/com/snapthetitle/backend/dto/AuthResponse.java
package com.snapthetitle.backend.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String username;
    private String role;
}
