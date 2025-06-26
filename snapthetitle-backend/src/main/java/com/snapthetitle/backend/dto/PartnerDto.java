// PartnerDto.java
package com.snapthetitle.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PartnerDto {
    private Long id;
    private String category;
    private String name;
    private String instagram;   // ex. "@ittageum"
    private String linkUrl;
    private Integer displayOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String deletedYn;
}
