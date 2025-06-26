// GuideDetailDto.java
package com.snapthetitle.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class GuideDetailDto {
    private Long id;
    private Long guideId;
    private String subtitle;
    private String description;
    private Integer displayOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String deletedYn;
}
