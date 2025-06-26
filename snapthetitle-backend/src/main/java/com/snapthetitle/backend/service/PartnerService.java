// src/main/java/com/snapthetitle/backend/service/PartnerService.java
package com.snapthetitle.backend.service;

import com.snapthetitle.backend.dto.PartnerDto;
import com.snapthetitle.backend.entity.Partner;
import com.snapthetitle.backend.repository.PartnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PartnerService {
    private final PartnerRepository repo;

    public List<PartnerDto> getAll() {
        return repo.findByDeletedYnOrderByDisplayOrderAsc("N")
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public PartnerDto create(PartnerDto dto) {
        Partner e = new Partner();
        e.setCategory(dto.getCategory());
        e.setName(dto.getName());
        e.setInstagram(dto.getInstagram());
        e.setLinkUrl(dto.getLinkUrl());
        e.setDisplayOrder(dto.getDisplayOrder());
        e.setDeletedYn("N");
        e.setCreatedAt(LocalDateTime.now());
        e.setUpdatedAt(LocalDateTime.now());
        Partner saved = repo.save(e);
        return toDto(saved);
    }

    public PartnerDto update(Long id, PartnerDto dto) {
        Partner e = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Partner not found: " + id));
        e.setCategory(dto.getCategory());
        e.setName(dto.getName());
        e.setInstagram(dto.getInstagram());
        e.setLinkUrl(dto.getLinkUrl());
        e.setDisplayOrder(dto.getDisplayOrder());
        e.setUpdatedAt(LocalDateTime.now());
        Partner updated = repo.save(e);
        return toDto(updated);
    }

    public void delete(Long id) {
        Partner e = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Partner not found: " + id));
        e.setDeletedYn("Y");
        e.setUpdatedAt(LocalDateTime.now());
        repo.save(e);
    }

    private PartnerDto toDto(Partner e) {
        PartnerDto dto = new PartnerDto();
        dto.setId(e.getId());
        dto.setCategory(e.getCategory());
        dto.setName(e.getName());
        dto.setInstagram(e.getInstagram());
        dto.setLinkUrl(e.getLinkUrl());
        dto.setDisplayOrder(e.getDisplayOrder());
        dto.setCreatedAt(e.getCreatedAt());
        dto.setUpdatedAt(e.getUpdatedAt());
        dto.setDeletedYn(e.getDeletedYn());
        return dto;
    }
}
