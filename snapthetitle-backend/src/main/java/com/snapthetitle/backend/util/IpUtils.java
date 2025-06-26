package com.snapthetitle.backend.util;

import jakarta.servlet.http.HttpServletRequest;

public class IpUtils {

    public static String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");

        if (xfHeader != null && !xfHeader.isEmpty()) {
            // 여러 프록시를 거쳤을 경우: "client, proxy1, proxy2"
            return xfHeader.split(",")[0].trim();
        }

        return request.getRemoteAddr();
    }
}
