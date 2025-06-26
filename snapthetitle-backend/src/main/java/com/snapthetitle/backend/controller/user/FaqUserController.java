// FaqUserController.java
package com.snapthetitle.backend.controller.user;

import com.snapthetitle.backend.dto.FaqDto;
import com.snapthetitle.backend.service.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faqs")
@RequiredArgsConstructor
public class FaqUserController {
    private final FaqService service;

    @GetMapping
    public List<FaqDto> getAll() {
        return service.getAll();
    }
}
