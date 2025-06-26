// ProductOptionDto.java
package com.snapthetitle.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ProductOptionDto {
    private Long id;
    private Long productId;
    private String label;
    private String value;
    private Integer displayOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String deletedYn;
}
