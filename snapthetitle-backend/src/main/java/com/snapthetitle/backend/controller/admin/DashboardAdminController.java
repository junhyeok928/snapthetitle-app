package com.snapthetitle.backend.controller.admin;

import com.snapthetitle.backend.dto.DashboardStatsDto;
import com.snapthetitle.backend.dto.DashboardChartDto;
import com.snapthetitle.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class DashboardAdminController {

    private final DashboardService dashboardService;

    // 기본 통계
    @GetMapping
    public DashboardStatsDto getDashboard() {
        return dashboardService.getDashboardStats();
    }

    // 방문자/유입경로 그래프용 통계
    @GetMapping("/charts")
    public DashboardChartDto getVisitorCharts() {
        return dashboardService.getVisitorCharts();
    }
}
