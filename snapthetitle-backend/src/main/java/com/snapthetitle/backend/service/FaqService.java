// src/main/java/com/snapthetitle/backend/service/FaqService.java
package com.snapthetitle.backend.service;

import com.snapthetitle.backend.dto.FaqDto;
import com.snapthetitle.backend.entity.Faq;
import com.snapthetitle.backend.repository.FaqRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FaqService {
    private final FaqRepository repo;

    public List<FaqDto> getAll() {
        return repo.findByDeletedYnOrderByIdAsc("N")
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public FaqDto create(FaqDto dto) {
        Faq e = new Faq();
        e.setCategory(dto.getCategory());
        e.setQuestion(dto.getQuestion());
        e.setAnswer(dto.getAnswer());
        e.setDeletedYn("N");
        e.setCreatedAt(LocalDateTime.now());
        e.setUpdatedAt(LocalDateTime.now());
        Faq saved = repo.save(e);
        return toDto(saved);
    }

    public FaqDto update(Long id, FaqDto dto) {
        Faq e = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Faq not found: " + id));
        e.setCategory(dto.getCategory());
        e.setQuestion(dto.getQuestion());
        e.setAnswer(dto.getAnswer());
        e.setUpdatedAt(LocalDateTime.now());
        Faq updated = repo.save(e);
        return toDto(updated);
    }

    public void delete(Long id) {
        Faq e = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Faq not found: " + id));
        e.setDeletedYn("Y");
        e.setUpdatedAt(LocalDateTime.now());
        repo.save(e);
    }

    private FaqDto toDto(Faq e) {
        FaqDto dto = new FaqDto();
        dto.setId(e.getId());
        dto.setCategory(e.getCategory());
        dto.setQuestion(e.getQuestion());
        dto.setAnswer(e.getAnswer());
        dto.setCreatedAt(e.getCreatedAt());
        dto.setUpdatedAt(e.getUpdatedAt());
        dto.setDeletedYn(e.getDeletedYn());
        return dto;
    }
}
