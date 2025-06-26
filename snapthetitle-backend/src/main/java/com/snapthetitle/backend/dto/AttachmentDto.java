// AttachmentDto.java
package com.snapthetitle.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AttachmentDto {
    private Long id;
    private String entityType;
    private Long entityId;
    private String fileUrl;
    private String originalName;
    private String mimeType;
    private Boolean isThumbnail;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String deletedYn;
}
