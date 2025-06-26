package com.snapthetitle.backend.service;

import com.snapthetitle.backend.dto.AttachmentDto;
import com.snapthetitle.backend.entity.Attachment;
import com.snapthetitle.backend.repository.AttachmentRepository;
import com.snapthetitle.backend.util.ImageUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttachmentService {
    private final AttachmentRepository repo;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public List<AttachmentDto> getByEntity(String type, Long id) {
        return repo.findByEntityTypeAndEntityIdAndDeletedYn(type, id, "N")
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public AttachmentDto create(String entityType, Long entityId, String fileUrl, String originalName, String mimeType, boolean isThumbnail) {
        Attachment e = new Attachment();
        e.setEntityType(entityType);
        e.setEntityId(entityId);
        e.setFileUrl(fileUrl);
        e.setOriginalName(originalName);
        e.setMimeType(mimeType);
        e.setIsThumbnail(isThumbnail);
        e.setDeletedYn("N");
        LocalDateTime now = LocalDateTime.now();
        e.setCreatedAt(now);
        e.setUpdatedAt(now);
        return toDto(repo.save(e));
    }

    public void delete(Long id) {
        Attachment e = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Attachment not found: " + id));
        e.setDeletedYn("Y");
        e.setUpdatedAt(LocalDateTime.now());
        repo.save(e);
    }

    public String storeWebPFile(MultipartFile file) throws IOException {
        // MultipartFile → 임시 파일로 저장
        File tempInput = File.createTempFile("upload_", "_" + file.getOriginalFilename());
        file.transferTo(tempInput);

        // 고유한 파일명 생성
        String fileName = System.currentTimeMillis() + ".webp";
        File webpFile = new File(uploadDir, fileName);

        // WebP로 변환 후 저장
        ImageUtils.convertToWebP(tempInput, webpFile);

        return "/uploads/" + fileName;
    }

    @Transactional
    public List<AttachmentDto> storeFileAndCreate(String entityType, Long entityId, MultipartFile file) throws IOException {
        List<AttachmentDto> result = new ArrayList<>();

        // 1. 원본 WebP 저장
        String originalUrl = storeWebPFile(file);
        AttachmentDto origin = create(entityType, entityId, originalUrl, file.getOriginalFilename(), "image/webp", false);
        result.add(origin);

        // 2. 썸네일 WebP 생성
        String originalFilename = originalUrl.replace("/uploads/", "");
        File originalFile = new File(uploadDir, originalFilename);

        String thumbName = "thumb_" + System.currentTimeMillis() + ".webp";
        File thumbFile = new File(uploadDir, thumbName);
        ImageUtils.createWebPThumbnail(originalFile, 400, thumbFile);
        String thumbUrl = "/uploads/" + thumbName;

        AttachmentDto thumb = create(entityType, entityId, thumbUrl, "thumb_" + file.getOriginalFilename(), "image/webp", true);
        result.add(thumb);

        return result;
    }

    private AttachmentDto toDto(Attachment e) {
        AttachmentDto dto = new AttachmentDto();
        dto.setId(e.getId());
        dto.setEntityType(e.getEntityType());
        dto.setEntityId(e.getEntityId());
        dto.setFileUrl(e.getFileUrl());
        dto.setOriginalName(e.getOriginalName());
        dto.setMimeType(e.getMimeType());
        dto.setIsThumbnail(e.getIsThumbnail());
        dto.setCreatedAt(e.getCreatedAt());
        dto.setUpdatedAt(e.getUpdatedAt());
        dto.setDeletedYn(e.getDeletedYn());
        return dto;
    }

    @Transactional
    public void deleteByEntity(String entityType, Long entityId) {
        List<Attachment> attachments = repo.findByEntityTypeAndEntityIdAndDeletedYn(entityType, entityId, "N");
        LocalDateTime now = LocalDateTime.now();

        for (Attachment att : attachments) {
            att.setDeletedYn("Y");
            att.setUpdatedAt(now);
        }
        repo.saveAll(attachments);
    }
}
