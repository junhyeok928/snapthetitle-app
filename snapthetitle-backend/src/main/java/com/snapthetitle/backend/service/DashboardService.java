package com.snapthetitle.backend.service;

import com.snapthetitle.backend.dto.DashboardChartDto;
import com.snapthetitle.backend.dto.DashboardStatsDto;
import com.snapthetitle.backend.entity.ChartDataPoint;
import com.snapthetitle.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final GalleryPhotoRepository galleryRepo;
    private final ProductRepository productRepo;
    private final FaqRepository faqRepo;
    private final PartnerRepository partnerRepo;
    private final GuideRepository guideRepo;
    private final VisitLogRepository visitLogRepo;

    public DashboardStatsDto getDashboardStats() {
        LocalDate today = LocalDate.now();
        LocalDate weekAgo = today.minusDays(6);

        long todayVisits = visitLogRepo.countByVisitedAtBetween(
                today.atStartOfDay(), today.plusDays(1).atStartOfDay()
        );
        long weeklyVisits = visitLogRepo.countByVisitedAtAfter(weekAgo.atStartOfDay());

        DashboardStatsDto dto = new DashboardStatsDto();
        dto.setGalleryCount(galleryRepo.countByDeletedYn("N"));
        dto.setProductCount(productRepo.countByDeletedYn("N"));
        dto.setFaqCount(faqRepo.countByDeletedYn("N"));
        dto.setPartnerCount(partnerRepo.countByDeletedYn("N"));
        dto.setGuideCount(guideRepo.countByDeletedYn("N"));
        dto.setTodayVisitCount(todayVisits);
        dto.setWeeklyVisitCount(weeklyVisits);

        return dto;
    }

    public DashboardChartDto getVisitorCharts() {
        LocalDateTime from = LocalDate.now().minusDays(6).atStartOfDay();

        List<ChartDataPoint> daily = visitLogRepo.countDailyUniqueVisits(from).stream()
                .map(row -> new ChartDataPoint(row[0].toString(), ((Number) row[1]).longValue()))
                .collect(Collectors.toList());

        List<ChartDataPoint> referers = visitLogRepo.countVisitsByReferer(from).stream()
                .map(row -> new ChartDataPoint((String) row[0], ((Number) row[1]).longValue()))
                .collect(Collectors.toList());

        DashboardChartDto dto = new DashboardChartDto();
        dto.setDailyVisitors(daily);
        dto.setRefererStats(referers);

        return dto;
    }
}

