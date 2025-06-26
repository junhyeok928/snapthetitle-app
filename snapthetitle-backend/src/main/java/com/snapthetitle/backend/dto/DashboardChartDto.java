package com.snapthetitle.backend.dto;

import com.snapthetitle.backend.entity.ChartDataPoint;
import lombok.Data;

import java.util.List;

@Data
public class DashboardChartDto {
    private List<ChartDataPoint> dailyVisitors;
    private List<ChartDataPoint> refererStats;
}