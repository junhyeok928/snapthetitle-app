package com.snapthetitle.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class GalleryPhotoDto {
    private Long id;
    private String category;
    private Integer displayOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String deletedYn;  // 'Y' or 'N'
    private List<AttachmentDto> attachments;  // 첨부파일 목록
}
