// FaqAdminController.java
package com.snapthetitle.backend.controller.admin;

import com.snapthetitle.backend.dto.FaqDto;
import com.snapthetitle.backend.service.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/faqs")
@RequiredArgsConstructor
public class FaqAdminController {
    private final FaqService service;

    @GetMapping
    public List<FaqDto> list() {
        return service.getAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FaqDto create(@RequestBody FaqDto dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public FaqDto update(@PathVariable Long id, @RequestBody FaqDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
