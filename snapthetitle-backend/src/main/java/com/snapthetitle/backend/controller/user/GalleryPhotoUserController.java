package com.snapthetitle.backend.controller.user;

import com.snapthetitle.backend.dto.GalleryPhotoDto;
import com.snapthetitle.backend.dto.AttachmentDto;
import com.snapthetitle.backend.dto.SimpleGalleryPhotoDto;
import com.snapthetitle.backend.service.GalleryPhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/gallery-photos")
@RequiredArgsConstructor
public class GalleryPhotoUserController {
    private final GalleryPhotoService service;

    @GetMapping
    public List<SimpleGalleryPhotoDto> getAllForUser() {
        return service.getAll().stream()
                .map(dto -> {
                    List<AttachmentDto> attachments = dto.getAttachments();

                    String thumbUrl = attachments.stream()
                            .filter(att -> Boolean.TRUE.equals(att.getIsThumbnail()))
                            .map(AttachmentDto::getFileUrl)
                            .findFirst()
                            .orElse(null);

                    String originalUrl = attachments.stream()
                            .filter(att -> Boolean.FALSE.equals(att.getIsThumbnail()))
                            .map(AttachmentDto::getFileUrl)
                            .findFirst()
                            .orElse(null);

                    return new SimpleGalleryPhotoDto(
                            dto.getId(),
                            dto.getCategory(),
                            thumbUrl,
                            originalUrl
                    );
                })
                .filter(dto -> dto.getThumbnailUrl() != null && dto.getOriginalUrl() != null)
                .collect(Collectors.toList());
    }
}
