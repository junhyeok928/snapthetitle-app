// src/main/java/com/snapthetitle/backend/repository/AdminUserRepository.java
package com.snapthetitle.backend.repository;

import com.snapthetitle.backend.entity.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminUserRepository extends JpaRepository<AdminUser, Integer> {
    Optional<AdminUser> findByUsername(String username);
}
