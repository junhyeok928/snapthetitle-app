// PartnerRepository.java
package com.snapthetitle.backend.repository;

import com.snapthetitle.backend.entity.Partner;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PartnerRepository extends JpaRepository<Partner, Long> {
    List<Partner> findByDeletedYnOrderByDisplayOrderAsc(String deletedYn);
    long countByDeletedYn(String deletedYn);
}
