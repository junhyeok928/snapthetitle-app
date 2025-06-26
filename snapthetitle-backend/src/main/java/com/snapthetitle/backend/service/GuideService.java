// src/main/java/com/snapthetitle/backend/service/GuideService.java
package com.snapthetitle.backend.service;

import com.snapthetitle.backend.dto.GuideDto;
import com.snapthetitle.backend.dto.GuideDetailDto;
import com.snapthetitle.backend.entity.Guide;
import com.snapthetitle.backend.entity.GuideDetail;
import com.snapthetitle.backend.repository.GuideDetailRepository;
import com.snapthetitle.backend.repository.GuideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GuideService {
    private final GuideRepository guideRepo;
    private final GuideDetailRepository detailRepo;

    public List<GuideDto> getAll() {
        return guideRepo.findByDeletedYnOrderByDisplayOrderAsc("N")
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public GuideDto create(GuideDto dto) {
        Guide g = new Guide();
        g.setCategory(dto.getCategory());
        g.setContent(dto.getContent());
        g.setLinkText(dto.getLinkText());
        g.setLinkUrl(dto.getLinkUrl());
        g.setDisplayOrder(dto.getDisplayOrder());
        g.setDeletedYn("N");
        g.setCreatedAt(LocalDateTime.now());
        g.setUpdatedAt(LocalDateTime.now());
        Guide saved = guideRepo.save(g);

        if (dto.getDetails() != null) {
            dto.getDetails().forEach(detailDto -> {
                GuideDetail d = new GuideDetail();
                d.setGuide(saved);
                d.setSubtitle(detailDto.getSubtitle());
                d.setDescription(detailDto.getDescription());
                d.setDisplayOrder(detailDto.getDisplayOrder());
                d.setDeletedYn("N");
                d.setCreatedAt(LocalDateTime.now());
                d.setUpdatedAt(LocalDateTime.now());
                detailRepo.save(d);
            });
        }
        return toDto(saved);
    }

    public GuideDto update(Long id, GuideDto dto) {
        Guide g = guideRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Guide not found: " + id));
        g.setCategory(dto.getCategory());
        g.setContent(dto.getContent());
        g.setLinkText(dto.getLinkText());
        g.setLinkUrl(dto.getLinkUrl());
        g.setDisplayOrder(dto.getDisplayOrder());
        g.setUpdatedAt(LocalDateTime.now());
        Guide updated = guideRepo.save(g);

        detailRepo.findByGuideIdAndDeletedYnOrderByDisplayOrderAsc(id, "N")
                .forEach(d -> {
                    d.setDeletedYn("Y");
                    d.setUpdatedAt(LocalDateTime.now());
                    detailRepo.save(d);
                });

        if (dto.getDetails() != null) {
            dto.getDetails().forEach(detailDto -> {
                GuideDetail d = new GuideDetail();
                d.setGuide(updated);
                d.setSubtitle(detailDto.getSubtitle());
                d.setDescription(detailDto.getDescription());
                d.setDisplayOrder(detailDto.getDisplayOrder());
                d.setDeletedYn("N");
                d.setCreatedAt(LocalDateTime.now());
                d.setUpdatedAt(LocalDateTime.now());
                detailRepo.save(d);
            });
        }
        return toDto(updated);
    }

    public void delete(Long id) {
        Guide g = guideRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Guide not found: " + id));
        g.setDeletedYn("Y");
        g.setUpdatedAt(LocalDateTime.now());
        guideRepo.save(g);
    }

    private GuideDto toDto(Guide g) {
        GuideDto dto = new GuideDto();
        dto.setId(g.getId());
        dto.setCategory(g.getCategory());
        dto.setContent(g.getContent());
        dto.setLinkText(g.getLinkText());
        dto.setLinkUrl(g.getLinkUrl());
        dto.setDisplayOrder(g.getDisplayOrder());
        dto.setCreatedAt(g.getCreatedAt());
        dto.setUpdatedAt(g.getUpdatedAt());
        dto.setDeletedYn(g.getDeletedYn());
        List<GuideDetailDto> details = detailRepo
                .findByGuideIdAndDeletedYnOrderByDisplayOrderAsc(g.getId(), "N")
                .stream()
                .map(d -> {
                    GuideDetailDto dd = new GuideDetailDto();
                    dd.setId(d.getId());
                    dd.setGuideId(d.getGuide().getId());
                    dd.setSubtitle(d.getSubtitle());
                    dd.setDescription(d.getDescription());
                    dd.setDisplayOrder(d.getDisplayOrder());
                    dd.setCreatedAt(d.getCreatedAt());
                    dd.setUpdatedAt(d.getUpdatedAt());
                    dd.setDeletedYn(d.getDeletedYn());
                    return dd;
                })
                .collect(Collectors.toList());
        dto.setDetails(details);
        return dto;
    }
}
