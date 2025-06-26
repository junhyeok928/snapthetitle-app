package com.snapthetitle.backend.service;

import com.snapthetitle.backend.dto.MainPhotoDto;
import com.snapthetitle.backend.dto.DisplayOrderDto;
import com.snapthetitle.backend.entity.MainPhoto;
import com.snapthetitle.backend.repository.MainPhotoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MainPhotoService {
    private final MainPhotoRepository repo;
    private final AttachmentService attachmentService;

    public List<MainPhotoDto> getAll() {
        return repo.findByDeletedYnOrderByDisplayOrderAsc("N")
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public MainPhotoDto createWithFile(MultipartFile file) throws IOException {
        // 1. 메타데이터 먼저 저장
        MainPhotoDto created = createMetadata();

        // 2. 엔티티 조회
        MainPhoto entity = repo.findById(created.getId())
                .orElseThrow(() -> new EntityNotFoundException("MainPhoto not found: " + created.getId()));

        // 3. 첨부파일 저장
        attachmentService.storeFileAndCreate("MAIN_PHOTO", entity.getId(), file);

        // 4. 반환
        return toDto(entity);
    }

    private MainPhotoDto createMetadata() {
        MainPhoto e = new MainPhoto();
        LocalDateTime now = LocalDateTime.now();
        e.setCreatedAt(now);
        e.setUpdatedAt(now);
        e.setDeletedYn("N");

        Integer maxOrder = repo.findByDeletedYnOrderByDisplayOrderAsc("N")
                .stream()
                .map(MainPhoto::getDisplayOrder)
                .max(Integer::compareTo)
                .orElse(0);
        e.setDisplayOrder(maxOrder + 1);

        return toDto(repo.save(e));
    }

    public void delete(Long id) {
        MainPhoto e = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("MainPhoto not found: " + id));
        e.setDeletedYn("Y");
        e.setUpdatedAt(LocalDateTime.now());
        repo.save(e);
    }

    public void updateDisplayOrder(List<DisplayOrderDto> orderList) {
        for (DisplayOrderDto dto : orderList) {
            MainPhoto photo = repo.findById(dto.getId())
                    .orElseThrow(() -> new EntityNotFoundException("MainPhoto not found: " + dto.getId()));
            photo.setDisplayOrder(dto.getDisplayOrder());
            photo.setUpdatedAt(LocalDateTime.now());
            repo.save(photo);
        }
    }

    private MainPhotoDto toDto(MainPhoto e) {
        MainPhotoDto dto = new MainPhotoDto();
        dto.setId(e.getId());
        dto.setDisplayOrder(e.getDisplayOrder());
        dto.setCreatedAt(e.getCreatedAt());
        dto.setUpdatedAt(e.getUpdatedAt());
        dto.setDeletedYn(e.getDeletedYn());
        dto.setAttachments(attachmentService.getByEntity("MAIN_PHOTO", e.getId()));
        return dto;
    }
}
