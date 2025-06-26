// src/main/java/com/snapthetitle/backend/service/AdminUserService.java
package com.snapthetitle.backend.service;

import com.snapthetitle.backend.entity.AdminUser;
import com.snapthetitle.backend.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminUserService {
    @Autowired private AdminUserRepository repo;
    @Autowired private BCryptPasswordEncoder passwordEncoder;

    public AdminUser authenticate(String username, String rawPassword) {
        return repo.findByUsername(username)
                .filter(u -> passwordEncoder.matches(rawPassword, u.getPassword()))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
}
