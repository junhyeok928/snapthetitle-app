package com.snapthetitle.backend.controller.user;

import com.snapthetitle.backend.entity.VisitLog;
import com.snapthetitle.backend.repository.VisitLogRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import static com.snapthetitle.backend.util.IpUtils.getClientIp;
import static com.snapthetitle.backend.util.RefererUtils.resolveSource;

@RestController
@RequestMapping("/api/track")
@RequiredArgsConstructor
public class VisitTrackingController {

    private final VisitLogRepository visitLogRepository;

    @PostMapping("/visit")
    public void trackVisit(HttpServletRequest request) {
        String ip = getClientIp(request);
        String userAgent = request.getHeader("User-Agent");
        String referer = request.getHeader("Referer");

        // 중복 방문 방지 (하루 1회)
        LocalDateTime todayStart = LocalDate.now().atStartOfDay();
        boolean alreadyVisited = visitLogRepository.existsByIpAddressAndVisitedAtAfter(ip, todayStart);
        if (alreadyVisited) return;

        String refererLabel;
        if (userAgent != null && userAgent.contains("KAKAOTALK")) {
            refererLabel = "카카오톡";
        } else if (userAgent.contains("Instagram")) {
            refererLabel = "인스타그램";
        } else if (userAgent.contains("NAVER")) {
            refererLabel = "네이버앱";
        } else {
            refererLabel = resolveSource(request.getHeader("Referer")); // 기존 방식 fallback
        }

        VisitLog log = new VisitLog();
        log.setIpAddress(ip);
        log.setUserAgent(userAgent);
        log.setReferer(refererLabel);
        log.setUrl(request.getRequestURI());
        log.setMethod("PING");
        log.setStatusCode(200);
        log.setVisitedAt(LocalDateTime.now());

        visitLogRepository.save(log);
    }
}
