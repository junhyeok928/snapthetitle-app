// FaqDto.java
package com.snapthetitle.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class FaqDto {
    private Long id;
    private String category;
    private String question;
    private String answer;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String deletedYn;
}
