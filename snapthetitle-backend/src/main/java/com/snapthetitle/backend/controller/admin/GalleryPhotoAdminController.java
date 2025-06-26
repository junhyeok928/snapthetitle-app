package com.snapthetitle.backend.controller.admin;

import com.snapthetitle.backend.dto.DisplayOrderDto;
import com.snapthetitle.backend.dto.GalleryPhotoDto;
import com.snapthetitle.backend.service.GalleryPhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/gallery-photos")
@RequiredArgsConstructor
public class GalleryPhotoAdminController {
    private final GalleryPhotoService service;

    @GetMapping
    public List<GalleryPhotoDto> list() {
        return service.getAll();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public GalleryPhotoDto create(
            @RequestPart("metadata") GalleryPhotoDto dto,
            @RequestPart("files") MultipartFile[] files
    ) throws IOException {
        // Service에서 메타 및 파일 처리
        return service.createWithFiles(dto, files);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public GalleryPhotoDto update(
            @PathVariable Long id,
            @RequestPart("metadata") GalleryPhotoDto dto,
            @RequestPart(value = "files", required = false) MultipartFile[] files
    ) throws IOException {
        // Service에서 메타 및 파일 처리
        return service.updateWithFiles(id, dto, files);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // 기존 POST /sort-order → PUT /order 로 변경하고 consumes 지정
    @PutMapping(value = "/order", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateDisplayOrder(@RequestBody List<DisplayOrderDto> orderList) {
        service.updateDisplayOrder(orderList);
    }


}
