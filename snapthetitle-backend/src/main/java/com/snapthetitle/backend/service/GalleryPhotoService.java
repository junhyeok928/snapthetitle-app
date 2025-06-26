package com.snapthetitle.backend.service;

import com.snapthetitle.backend.dto.DisplayOrderDto;
import com.snapthetitle.backend.dto.GalleryPhotoDto;
import com.snapthetitle.backend.entity.GalleryPhoto;
import com.snapthetitle.backend.repository.GalleryPhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import jakarta.persistence.EntityNotFoundException;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GalleryPhotoService {
    private final GalleryPhotoRepository repo;
    private final AttachmentService attachmentService;

    public List<GalleryPhotoDto> getAll() {
        return repo.findByDeletedYnOrderByDisplayOrderAscCreatedAtDesc("N")
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public GalleryPhotoDto createWithFiles(GalleryPhotoDto dto, MultipartFile[] files) throws IOException {
        // 1. 메타데이터 먼저 저장 (displayOrder 포함)
        GalleryPhotoDto createdDto = createMetadata(dto);

        // 2. 저장된 엔티티 ID를 기준으로 다시 조회
        GalleryPhoto entity = repo.findById(createdDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("GalleryPhoto not found: " + createdDto.getId()));

        // 3. 첨부파일 저장 (썸네일 포함)
        for (MultipartFile file : files) {
            attachmentService.storeFileAndCreate("GALLERY_PHOTOS", entity.getId(), file);
        }

        // 4. 최종 결과 반환
        return toDto(entity);
    }


    @Transactional
    public GalleryPhotoDto updateWithFiles(Long id, GalleryPhotoDto dto, MultipartFile[] files) throws IOException {
        // 1. 기존 엔티티 조회
        GalleryPhoto entity = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("GalleryPhoto not found: " + id));

        // 2. 메타데이터 업데이트
        entity.setCategory(dto.getCategory());
        entity.setUpdatedAt(LocalDateTime.now());
        repo.save(entity);

        // 3. 기존 첨부파일 soft-delete 처리
        attachmentService.deleteByEntity("GALLERY_PHOTOS", entity.getId());

        // 4. 새 파일 저장 (썸네일 포함)
        for (MultipartFile file : files) {
            attachmentService.storeFileAndCreate("GALLERY_PHOTOS", entity.getId(), file);
        }

        // 5. 반환
        return toDto(entity);
    }


    private GalleryPhotoDto createMetadata(GalleryPhotoDto dto) {
        GalleryPhoto e = new GalleryPhoto();
        e.setCategory(dto.getCategory());
        LocalDateTime now = LocalDateTime.now();
        e.setCreatedAt(now);
        e.setUpdatedAt(now);
        e.setDeletedYn("N");

        // displayOrder 설정: 가장 큰 값 + 1
        Integer maxOrder = repo.findMaxDisplayOrder();
        e.setDisplayOrder((maxOrder == null ? 0 : maxOrder + 1));

        return toDto(repo.save(e));
    }

    private GalleryPhotoDto updateMetadata(Long id, GalleryPhotoDto dto) {
        GalleryPhoto e = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("GalleryPhoto not found: " + id));
        e.setCategory(dto.getCategory());
        e.setUpdatedAt(LocalDateTime.now());
        return toDto(repo.save(e));
    }

    public void delete(Long id) {
        GalleryPhoto e = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("GalleryPhoto not found: " + id));
        e.setDeletedYn("Y");
        e.setUpdatedAt(LocalDateTime.now());
        repo.save(e);
    }

    public void updateDisplayOrder(List<DisplayOrderDto> orderList) {
        for (DisplayOrderDto dto : orderList) {
            GalleryPhoto photo = repo.findById(dto.getId())
                    .orElseThrow(() -> new EntityNotFoundException("GalleryPhoto not found: " + dto.getId()));
            photo.setDisplayOrder(dto.getDisplayOrder());
            photo.setUpdatedAt(LocalDateTime.now());
            repo.save(photo);
        }
    }


    private GalleryPhotoDto getById(Long id) {
        GalleryPhoto e = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("GalleryPhoto not found: " + id));
        return toDto(e);
    }

    private GalleryPhotoDto toDto(GalleryPhoto e) {
        GalleryPhotoDto dto = new GalleryPhotoDto();
        dto.setId(e.getId());
        dto.setCategory(e.getCategory());
        dto.setDisplayOrder(e.getDisplayOrder());
        dto.setCreatedAt(e.getCreatedAt());
        dto.setUpdatedAt(e.getUpdatedAt());
        dto.setDeletedYn(e.getDeletedYn());
        dto.setAttachments(attachmentService.getByEntity("GALLERY_PHOTOS", e.getId()));
        return dto;
    }
}
