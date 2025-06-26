// MainPhotoRepository.java
package com.snapthetitle.backend.repository;

import com.snapthetitle.backend.entity.MainPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MainPhotoRepository extends JpaRepository<MainPhoto, Long> {
    List<MainPhoto> findByDeletedYnOrderByDisplayOrderAsc(String deletedYn);
}