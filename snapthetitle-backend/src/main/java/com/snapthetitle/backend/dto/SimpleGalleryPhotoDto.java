// src/main/java/com/snapthetitle/backend/dto/SimpleGalleryPhotoDto.java
package com.snapthetitle.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SimpleGalleryPhotoDto {
    private Long id;
    private String category;
    private String thumbnailUrl;
    private String originalUrl;
}
