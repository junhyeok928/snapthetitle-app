// PartnerAdminController.java
package com.snapthetitle.backend.controller.admin;

import com.snapthetitle.backend.dto.PartnerDto;
import com.snapthetitle.backend.service.PartnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/partners")
@RequiredArgsConstructor
public class PartnerAdminController {
    private final PartnerService service;

    @GetMapping
    public List<PartnerDto> list() {
        return service.getAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PartnerDto create(@RequestBody PartnerDto dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public PartnerDto update(@PathVariable Long id, @RequestBody PartnerDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
