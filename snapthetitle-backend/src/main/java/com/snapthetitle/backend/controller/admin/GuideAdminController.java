// GuideAdminController.java
package com.snapthetitle.backend.controller.admin;

import com.snapthetitle.backend.dto.GuideDto;
import com.snapthetitle.backend.service.GuideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/guides")
@RequiredArgsConstructor
public class GuideAdminController {
    private final GuideService service;

    @GetMapping
    public List<GuideDto> list() {
        return service.getAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GuideDto create(@RequestBody GuideDto dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public GuideDto update(@PathVariable Long id, @RequestBody GuideDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
