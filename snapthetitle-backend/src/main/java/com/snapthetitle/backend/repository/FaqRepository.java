// FaqRepository.java
package com.snapthetitle.backend.repository;

import com.snapthetitle.backend.entity.Faq;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FaqRepository extends JpaRepository<Faq, Long> {
    List<Faq> findByDeletedYnOrderByIdAsc(String deletedYn);

    long countByDeletedYn(String deletedYn);
}
