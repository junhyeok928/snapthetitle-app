package com.snapthetitle.backend.controller.user;

import com.snapthetitle.backend.dto.ProductDto;
import com.snapthetitle.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductUserController {
    private final ProductService service;

    @GetMapping
    public List<ProductDto> getByYear(@RequestParam Integer year) {
        return service.getByYear(year);
    }

    @GetMapping("/years")
    public List<Integer> getAvailableYears() {
        return service.getAvailableYears();
    }
}
