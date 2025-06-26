package com.snapthetitle.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class MainPhotoDto {
    private Long id;
    private Integer displayOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String deletedYn;
    private List<AttachmentDto> attachments;
}
