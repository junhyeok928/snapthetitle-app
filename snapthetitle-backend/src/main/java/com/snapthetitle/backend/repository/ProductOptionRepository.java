// ProductOptionRepository.java
package com.snapthetitle.backend.repository;

import com.snapthetitle.backend.entity.ProductOption;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductOptionRepository extends JpaRepository<ProductOption, Long> {
    List<ProductOption> findByProductIdAndDeletedYnOrderByDisplayOrderAsc(Long productId, String deletedYn);
}
