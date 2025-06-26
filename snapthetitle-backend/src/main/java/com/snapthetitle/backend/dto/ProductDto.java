// src/main/java/com/snapthetitle/backend/dto/ProductDto.java
package com.snapthetitle.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ProductDto {
    private Long id;
    private Integer year;
    private String name;
    private String description;
    private String price;
    private String imageUrl;
    private Integer displayOrder;
    private List<ProductOptionDto> options;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String deletedYn;
}
