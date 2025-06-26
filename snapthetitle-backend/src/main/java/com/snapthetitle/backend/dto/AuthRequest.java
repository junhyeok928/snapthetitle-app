// src/main/java/com/snapthetitle/backend/dto/AuthRequest.java
package com.snapthetitle.backend.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
}
