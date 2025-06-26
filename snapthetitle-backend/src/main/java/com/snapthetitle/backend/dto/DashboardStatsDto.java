package com.snapthetitle.backend.dto;

import lombok.Data;

@Data
public class DashboardStatsDto {
    private long galleryCount;
    private long productCount;
    private long faqCount;
    private long partnerCount;
    private long guideCount;
    private long todayVisitCount;
    private long weeklyVisitCount;
}


