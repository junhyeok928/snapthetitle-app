// src/main/java/com/snapthetitle/backend/controller/admin/ProductAdminController.java
package com.snapthetitle.backend.controller.admin;

import com.snapthetitle.backend.dto.ProductDto;
import com.snapthetitle.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
public class ProductAdminController {
    private final ProductService service;

    @GetMapping
    public List<ProductDto> list(
            @RequestParam(value = "year", required = false) Integer year
    ) {
        if (year != null) {
            return service.getByYear(year);
        } else {
            return service.getAll();
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductDto create(@RequestBody ProductDto dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public ProductDto update(@PathVariable Long id, @RequestBody ProductDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
