// GuideDto.java
package com.snapthetitle.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class GuideDto {
    private Long id;
    private String category;
    private String content;
    private String linkText;
    private String linkUrl;
    private Integer displayOrder;
    private List<GuideDetailDto> details;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String deletedYn;
}
