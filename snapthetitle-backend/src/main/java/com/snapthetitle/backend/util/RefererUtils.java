package com.snapthetitle.backend.util;

public class RefererUtils {

    public static String resolveSource(String referer) {
        if (referer == null || referer.isBlank()) return "직접 접속";

        referer = referer.toLowerCase();

        if (referer.contains("kakao")) return "카카오톡";
        if (referer.contains("instagram")) return "인스타그램";
        if (referer.contains("blog.naver") || referer.contains("naver.com")) return "네이버블로그";
        if (referer.contains("google")) return "구글";
        if (referer.contains("facebook")) return "페이스북";
        if (referer.contains("tistory")) return "티스토리";
        if (referer.contains("youtube")) return "유튜브";

        return "직접 접속";
    }
}