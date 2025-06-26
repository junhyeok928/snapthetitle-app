package com.snapthetitle.backend.controller.user;

import com.snapthetitle.backend.dto.MainPhotoDto;
import com.snapthetitle.backend.dto.AttachmentDto;
import com.snapthetitle.backend.dto.SimpleMainPhotoDto;
import com.snapthetitle.backend.service.MainPhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/main-photos")
@RequiredArgsConstructor
public class MainPhotoUserController {

    private final MainPhotoService mainPhotoService;

    @GetMapping
    public List<SimpleMainPhotoDto> getMainPhotos() {
        return mainPhotoService.getAll().stream()
                .map(dto -> {
                    String imageUrl = dto.getAttachments().stream()
                            .filter(att -> Boolean.FALSE.equals(att.getIsThumbnail()))
                            .map(AttachmentDto::getFileUrl)
                            .findFirst()
                            .orElse(null);

                    return new SimpleMainPhotoDto(dto.getId(), imageUrl);
                })
                .filter(dto -> dto.getImageUrl() != null)
                .collect(Collectors.toList());
    }
}
