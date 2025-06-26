package com.snapthetitle.backend.controller.admin;

import com.snapthetitle.backend.dto.DisplayOrderDto;
import com.snapthetitle.backend.dto.MainPhotoDto;
import com.snapthetitle.backend.service.MainPhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/main-photos")
@RequiredArgsConstructor
public class MainPhotoAdminController {

    private final MainPhotoService mainPhotoService;

    /**
     * 전체 슬라이드 이미지 목록 조회 (관리자용)
     */
    @GetMapping
    public List<MainPhotoDto> getAll() {
        return mainPhotoService.getAll();
    }

    /**
     * 슬라이드 이미지 등록
     */
    @PostMapping
    public MainPhotoDto upload(@RequestParam("file") MultipartFile file) throws IOException {
        return mainPhotoService.createWithFile(file);
    }

    /**
     * 순서 변경 저장
     */
    @PostMapping("/order")
    public void updateDisplayOrder(@RequestBody List<DisplayOrderDto> orderList) {
        mainPhotoService.updateDisplayOrder(orderList);
    }

    /**
     * 슬라이드 삭제 (soft delete)
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        mainPhotoService.delete(id);
    }
}
