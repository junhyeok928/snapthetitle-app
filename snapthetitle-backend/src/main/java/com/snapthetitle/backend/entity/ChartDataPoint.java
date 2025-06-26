package com.snapthetitle.backend.entity;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChartDataPoint {
    private String label; // 날짜 or 유입경로
    private long count;
}