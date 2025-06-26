// GuideUserController.java
package com.snapthetitle.backend.controller.user;

import com.snapthetitle.backend.dto.GuideDto;
import com.snapthetitle.backend.service.GuideService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guides")
@RequiredArgsConstructor
public class GuideUserController {
    private final GuideService service;

    @GetMapping
    public List<GuideDto> getAll() {
        return service.getAll();
    }
}
