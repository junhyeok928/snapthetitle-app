// src/main/java/com/snapthetitle/backend/service/AuthService.java
package com.snapthetitle.backend.service;

import com.snapthetitle.backend.dto.AuthRequest;
import com.snapthetitle.backend.dto.AuthResponse;
import com.snapthetitle.backend.entity.AdminUser;
import com.snapthetitle.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired private AdminUserService userService;
    @Autowired private JwtUtil jwtUtil;

    public AuthResponse login(AuthRequest req) {
        AdminUser user = userService.authenticate(req.getUsername(), req.getPassword());
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

        AuthResponse resp = new AuthResponse();
        resp.setUsername(user.getUsername());
        resp.setRole(user.getRole());
        resp.setToken(token);
        return resp;
    }
}