// ProductRepository.java
package com.snapthetitle.backend.repository;

import com.snapthetitle.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByYearAndDeletedYnOrderByDisplayOrderAsc(Integer year, String deletedYn);

    List<Product> findByDeletedYnOrderByDisplayOrderAsc(String deletedYn);

    @Query("SELECT DISTINCT p.year FROM Product p WHERE p.deletedYn = 'N' ORDER BY p.year ASC")
    List<Integer> findDistinctYears();

    long countByDeletedYn(String deletedYn);
}
