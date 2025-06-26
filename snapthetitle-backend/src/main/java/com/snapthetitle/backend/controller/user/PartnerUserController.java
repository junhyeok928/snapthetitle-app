// PartnerUserController.java
package com.snapthetitle.backend.controller.user;

import com.snapthetitle.backend.dto.PartnerDto;
import com.snapthetitle.backend.service.PartnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partners")
@RequiredArgsConstructor
public class PartnerUserController {
    private final PartnerService service;

    @GetMapping
    public List<PartnerDto> getAll() {
        return service.getAll();
    }
}
