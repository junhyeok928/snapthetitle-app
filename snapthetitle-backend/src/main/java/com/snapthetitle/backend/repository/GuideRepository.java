// GuideRepository.java
package com.snapthetitle.backend.repository;

import com.snapthetitle.backend.entity.Guide;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GuideRepository extends JpaRepository<Guide, Long> {
    List<Guide> findByDeletedYnOrderByDisplayOrderAsc(String deletedYn);
    long countByDeletedYn(String deletedYn);
}
