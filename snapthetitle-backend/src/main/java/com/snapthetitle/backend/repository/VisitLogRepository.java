package com.snapthetitle.backend.repository;

import com.snapthetitle.backend.entity.VisitLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface VisitLogRepository extends JpaRepository<VisitLog, Long> {

    long countByVisitedAtBetween(LocalDateTime start, LocalDateTime end);

    long countByVisitedAtAfter(LocalDateTime start);

    boolean existsByIpAddressAndVisitedAtAfter(String ipAddress, LocalDateTime visitedAt);

    @Query("""
    SELECT DATE(v.visitedAt) AS date, COUNT(DISTINCT v.ipAddress)
    FROM VisitLog v
    WHERE v.visitedAt >= :from
    GROUP BY DATE(v.visitedAt)
    ORDER BY DATE(v.visitedAt)
    """)
    List<Object[]> countDailyUniqueVisits(LocalDateTime from);

    @Query("""
    SELECT v.referer, COUNT(*) 
    FROM VisitLog v
    WHERE v.visitedAt >= :from
    GROUP BY v.referer
    ORDER BY COUNT(*) DESC
    """)
    List<Object[]> countVisitsByReferer(LocalDateTime from);
    // 예: 최근 일주일치 통계
}
