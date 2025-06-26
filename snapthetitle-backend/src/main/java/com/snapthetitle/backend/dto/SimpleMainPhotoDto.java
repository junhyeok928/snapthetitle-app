package com.snapthetitle.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SimpleMainPhotoDto {
    private Long id;
    private String imageUrl;  // 썸네일이 없으므로 하나만
}
